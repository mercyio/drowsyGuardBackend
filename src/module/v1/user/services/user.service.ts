import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, GoogleAuthDto } from '../dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BaseHelper } from '../../../../common/utils/helper.util';
import { AgoraService } from 'src/common/utils/third_party_services/agora.service';
import { UserRoleEnum } from 'src/common/enums/user.enum';

@Injectable()
export class UserService {
  constructor(
    private agoraService: AgoraService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createUser(
    payload: CreateUserDto,
    role?: UserRoleEnum,
    createdByAdmin?: boolean,
  ): Promise<UserDocument> {
    const { password, confirmPassword } = payload;

    try {
      // Validate the password
      BaseHelper.validatePassword(password);

      if (password !== confirmPassword) {
        throw new BadRequestException(
          'Password and confirm password do not match',
        );
      }

      const hashedPassword = await BaseHelper.hashData(password);

      const result = await this.userModel.create({
        ...payload,
        password: hashedPassword,
        ...(role ? { role } : { role: UserRoleEnum.USER }),
        ...(createdByAdmin && {
          accountGenerated: true,
          emailVerified: true,
        }),
      });

      delete result['_doc'].password;
      return result;
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException(
          `${Object.keys(e.keyValue)} already exists`,
        );
      } else {
        throw new InternalServerErrorException(
          e.response?.message || 'Something went wrong',
        );
      }
    }
  }

  async getUserByEmailIncludePassword(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).select('+password');
  }

  async getUser(userId: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: userId });
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async findOneById(userId: string) {
    return this.userModel.findById({ _id: userId });
  }

  async updateUserByEmail(email: string, details: any) {
    return this.userModel.updateOne({ email }, details);
  }

  async updateUserById(userId: string, details: any) {
    return this.userModel.updateOne({ userId }, details);
  }

  async checkUserExistByEmail(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('No user exist with provided email');
    }

    return true;
  }

  async createUserFromGoogle(payload: GoogleAuthDto) {
    return await this.userModel.create({
      ...payload,
      emailVerified: true,
      isGoogleAuth: true,
      isLoggedOut: false,
    });
  }

  async liveSession(uid: string) {
    await this.updateUserById(uid, { isCameraOn: true });

    const channelName = `live_session_${uid}_${Date.now()}`;

    const token = await this.agoraService.generateToken(channelName, uid);
    return {
      uid,
      token,
    };
  }
}
