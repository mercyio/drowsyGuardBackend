import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserRoleEnum } from '../../../../common/enums/user.enum';
import { Roles } from '../../../../common/decorators/role.decorator';
import { AdminUserService } from '../services/admin-user.service';
import { PaginationDto } from '../../repository/dto/repository.dto';
import { RolesGuard } from '../../auth/guards/role.guard';

import { ActivateDeactivateAdminDto } from '../dto/user-admin.dto';
import {
  LoggedInUserDecorator,
  ILoggedInUser,
} from 'src/common/decorators/logged_in_user.decorator';
import {
  AdminGetAllUsersDto,
  AdminGetAllWorkspaceUsers,
  GetUserPublicDto,
} from '../dto/user.dto';
import { NoCache } from 'src/common/decorators/cache.decorator';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';
import { Public } from 'src/common/decorators/public.decorator';
import { ResponseMessage } from 'src/common/decorators/response.decorator';

@NoCache()
@UseGuards(RolesGuard)
@Roles(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN)
@Controller('user/admin')
export class AdminUserController {
  constructor(private adminUserService: AdminUserService) {}

  @Get('user-details')
  async getUserDetails(@Query() query: GetUserPublicDto) {
    return await this.adminUserService.getUserDetails(query);
  }

  @Get('all-admins')
  async getAllAdmins(@Query() query: PaginationDto) {
    return await this.adminUserService.getAllAdmins(query);
  }

  @Patch('activate-deactivate')
  async activateDeactivateAdmin(
    @LoggedInUserDecorator() user: ILoggedInUser,
    @Body() payload: ActivateDeactivateAdminDto,
  ) {
    return await this.adminUserService.activateDeactivateAdmin(user, payload);
  }

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.REGISTER_SUCCESS)
  @Public()
  @Post('create-super-admin')
  async createSuperAdmin() {
    return await this.adminUserService.createSuperAdmin();
  }

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.REGISTER_SUCCESS)
  @Public()
  @Get('all-users')
  async getAllUsers(@Query() query: AdminGetAllUsersDto) {
    return await this.adminUserService.getAllUsers(query);
  }

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.REGISTER_SUCCESS)
  // @Public()
  @Get('workspace-users')
  async getWorkspaceUsers(
    @LoggedInUserDecorator() user: ILoggedInUser,
    @Body() payload: AdminGetAllWorkspaceUsers,
  ) {
    return await this.adminUserService.adminGetAllUsersInWorkspace(
      user,
      payload,
    );
  }
}
