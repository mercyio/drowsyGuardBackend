import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserRoleEnum } from '../../../../common/enums/user.enum';
import { Interest } from '../../interest/schemas/interest.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ select: false })
  password: string;

  @Prop({ enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @Prop()
  birthday: Date;

  @Prop({ unique: true })
  username: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Interest.name })
  interests: mongoose.Types.ObjectId[];

  @Prop({ default: 0 })
  wallet: number;

  @Prop({ default: false })
  isGoogleAuth: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
