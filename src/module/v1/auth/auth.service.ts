import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnprocessableEntityException,
  Req,
} from '@nestjs/common';
import { CreateUserDto, GoogleAuthDto } from '../user/dto/user.dto';
import { UserService } from '../user/services/user.service';
import { LoginDto, SuperAdminSignUpDto, VerifyEmailDto } from './dto/auth.dto';
import { BaseHelper } from '../../../common/utils/helper.util';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ENVIRONMENT } from 'src/common/configs/environment';
import { UserRoleEnum } from 'src/common/enums/user.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(payload: CreateUserDto, role?: UserRoleEnum) {
    const user = await this.userService.createUser(payload, role);

    return user;
  }

  async superAdminSignUp(payload: SuperAdminSignUpDto) {
    const { secret, ...userPayload } = payload;

    // TODO : IMPLEMENT ENCRYPTION AND DECRYPTION FOR SECRET KEY
    if (secret !== ENVIRONMENT.APP.SU_SS_KEY) {
      throw new BadRequestException('Invalid Secret Key');
    }

    return await this.register(
      userPayload as CreateUserDto,
      UserRoleEnum.SUPER_ADMIN,
    );
  }

  async login(payload: LoginDto) {
    const { email, password } = payload;

    const user = await this.userService.getUserByEmailIncludePassword(email);

    if (!user) {
      throw new BadRequestException('Invalid Credential');
    }

    const passwordMatch = await BaseHelper.compareHashedData(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new BadRequestException('Incorrect Password');
    }

    if (!user.emailVerified) {
      throw new BadRequestException('kindly verify your email to login');
    }

    await this.userService.updateUserByEmail(email, {
      isLoggedOut: false,
      // isCameraOn: true,
    });
    const token = this.jwtService.sign({ _id: user._id });
    delete user['_doc'].password;
    return {
      ...user['_doc'],
      accessToken: token,
    };
  }

  async verifyEmail(payload: VerifyEmailDto) {
    const { email } = payload;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid Email');
    }

    if (user.emailVerified) {
      throw new UnprocessableEntityException('Email already verified');
    }

    await this.userService.updateUserByEmail(email, {
      emailVerified: true,
    });
  }

  async googleAuth(payload: GoogleAuthDto) {
    const { email } = payload;

    const user = await this.userService.getUserByEmail(email);

    if (user) {
      if (!user.isGoogleAuth) {
        throw new ConflictException(
          'Looks like you already have an account! Use your existing login details or choose a different email address to sign up with Google',
        );
      }
      await this.userService.updateUserByEmail(email, {
        isLoggedOut: false,
      });

      const token = this.jwtService.sign({ _id: user._id });
      return { ...user['_doc'], accessToken: token };
    }

    const newUser = await this.userService.createUserFromGoogle(payload);

    const token = this.jwtService.sign({ _id: newUser._id });
    return { ...newUser['_doc'], accessToken: token };
  }

  async logout(@Req() req: Request) {
    const user = req.user as { email: string };
    await this.userService.updateUserByEmail(user.email, {
      isLoggedOut: true,
    });
  }
}
