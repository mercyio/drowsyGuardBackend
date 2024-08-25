import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserRoleEnum } from '../../../../common/enums/user.enum';
import { WorkspaceTypeEnum } from '../../../../common/enums/workspace.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: false })
  firstname: string;

  @Prop({ required: true, unique: false })
  lastname: string;

  @Prop({ required: true, unique: false })
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
}

export const UserSchema = SchemaFactory.createForClass(User);
