/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/workspace.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserDocument } from '../user/schemas/user.schema';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @UseGuards(JwtAuthGuard)
  @ResponseMessage(RESPONSE_CONSTANT.WORKSPACE.WORKSPACE_CREATED_SUCCESS)
  @Post('/')
  async create(
    @LoggedInUserDecorator() user: UserDocument,
    @Body() payload: CreateWorkspaceDto,
  ) {
    return await this.workspaceService.createWorkspace(user._id, payload);
  }
}
