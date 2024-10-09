/* eslint-disable prettier/prettier */
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import {
  ILoggedInUser,
  LoggedInUserDecorator,
} from 'src/common/decorators/logged_in_user.decorator';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ResponseMessage(RESPONSE_CONSTANT.USER.GET_CURRENT_USER_SUCCESS)
  @Get('/')
  async getCurrentUser(@LoggedInUserDecorator() user: any) {
    return await this.userService.getUser(user.id);
  }

  @Post('live-session')
  @ResponseMessage(RESPONSE_CONSTANT.CAMERA.CAMERA_ON)
  async liveStream(@LoggedInUserDecorator() user: ILoggedInUser) {
    return await this.userService.liveSession(user._id);
  }
}
