// /* eslint-disable prettier/prettier */
import { Controller, Body, Get, Query, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginDto } from './dto/admin.dto';
import { PaginationDto } from '../repository/dto/repository.dto';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { SeederService } from '../seeder/seeder.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly seederService: SeederService,
  ) {}

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.REGISTER_SUCCESS)
  @Public()
  @Post('create')
  async create() {
    return await this.seederService.seedAdmins();
  }
  @ResponseMessage(RESPONSE_CONSTANT.AUTH.LOGIN_SUCCESS)
  @Public()
  @Post('login')
  async login(@Body() payload: AdminLoginDto, adminId: string) {
    return await this.adminService.login(payload, adminId);
  }
  @Get('all')
  async getAllAdmins(@Query() query: PaginationDto) {
    return await this.adminService.getAllAdmins(query);
  }

  @ResponseMessage(RESPONSE_CONSTANT.USER.GET_CURRENT_USER_SUCCESS)
  @Get('/')
  async getCurrenAmin(@LoggedInUserDecorator() user: any) {
    return await this.adminService.getAdmin(user.id);
  }
}
