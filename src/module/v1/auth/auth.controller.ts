import { Body, Controller, Post, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, GoogleAuthDto } from '../user/dto/user.dto';
import { ResponseMessage } from '../../../common/decorators/response.decorator';
import {
  LoginDto,
  RequestVerifyEmailOtpDto,
  VerifyEmailDto,
} from './dto/auth.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { RESPONSE_CONSTANT } from '../../../common/constants/response.constant';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ResponseMessage(RESPONSE_CONSTANT.AUTH.REGISTER_SUCCESS)
  async register(@Body() payload: CreateUserDto) {
    return await this.authService.register(payload);
  }

  @Public()
  @Post('login')
  @ResponseMessage(RESPONSE_CONSTANT.AUTH.LOGIN_SUCCESS)
  async login(@Body() payload: LoginDto, adminId: string) {
    return await this.authService.login(payload, adminId);
  }

  @Public()
  @Post('verify-email/otp')
  async sendVerificationEmail(@Body() payload: RequestVerifyEmailOtpDto) {
    return await this.authService.sendVerificationMail(payload);
  }

  @Public()
  @Post('verify-email')
  @ResponseMessage(RESPONSE_CONSTANT.AUTH.EMAIL_VERIFICATION_SUCCESS)
  async verifyEmail(@Body() payload: VerifyEmailDto) {
    return await this.authService.verifyEmail(payload);
  }

  @Public()
  @Post('google')
  @ResponseMessage(RESPONSE_CONSTANT.AUTH.LOGIN_SUCCESS)
  async googleAuth(@Body() payload: GoogleAuthDto) {
    return await this.authService.googleAuth(payload);
  }

  @Post('logout')
  @ResponseMessage(RESPONSE_CONSTANT.AUTH.LOGOUT_SUCCESS)
  async logout(@Req() req: Request) {
    return await this.authService.logout(req);
  }
}
