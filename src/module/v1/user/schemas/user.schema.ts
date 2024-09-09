import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserRoleEnum } from '../../../../common/enums/user.enum';
import { WorkspaceTypeEnum } from '../../../../common/enums/workspace.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: false, index: true })
  firstname?: string;

  @Prop({ unique: false, index: true })
  lastname?: string;

  @Prop({ unique: true, index: true, required: true })
  email: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ select: false })
  password: string;

  @Prop({ enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @Prop({ enum: WorkspaceTypeEnum, default: WorkspaceTypeEnum.PERSONAL })
  workspace: WorkspaceTypeEnum;

  @Prop({ default: false })
  isGoogleAuth: boolean;

  @Prop({ default: false })
  isLoggedOut: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
