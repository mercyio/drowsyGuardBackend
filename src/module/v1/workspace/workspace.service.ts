import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { WorkspaceTypeEnum } from '../../../common/enums/workspace.enum';
import { UserRoleEnum } from '../../../common/enums/user.enum';
import { Workspace, WorkspaceDocument } from './schema/workspace.schema';
import { CreateWorkspaceDto } from './dto/workspace.dto';
import { createBrotliDecompress } from 'zlib';
import { ILoggedInUser } from 'src/common/decorators/logged_in_user.decorator';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Workspace.name)
    private workspaceModel: Model<WorkspaceDocument>,
  ) {}

  async createWorkspace(user: ILoggedInUser, payload: CreateWorkspaceDto) {
    const { company } = payload;

    try {
      const workspace = await this.workspaceModel.findOne({ company });

      if (workspace) {
        await this.userModel.findByIdAndUpdate(
          user._id,
          {
            workspace: WorkspaceTypeEnum.ENTERPRISE,
            company: workspace._id,
          },
          { new: true },
        );
      } else {
        // Create a new workspace
        const createdWorkspace = await this.workspaceModel.create({
          creator: user._id,
          company,
          workspaceGeneratedAt: new Date(),
        });

        await this.userModel.findByIdAndUpdate(
          user._id,
          {
            workspace: WorkspaceTypeEnum.ENTERPRISE,
            company: createdWorkspace._id,
            role: UserRoleEnum.ADMIN,
          },
          { new: true },
        );
      }
    } catch (error) {
      // Rethrow the error or handle it as needed
      //   throw new BadRequestException('Failed to create workspace');
      console.error('Error in createWorkspace:', error);
    }
  }
  async getWorkspace(workspaceId: string): Promise<WorkspaceDocument> {
    return this.workspaceModel.findOne({ _id: workspaceId });
  }
}
