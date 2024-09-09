// /* eslint-disable prettier/prettier */
import { Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';
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
}
