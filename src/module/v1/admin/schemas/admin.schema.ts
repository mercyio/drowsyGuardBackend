/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoleEnum } from '../../../../common/enums/user.enum';


export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
  @Prop()
  email: string;

  @Prop({ select: false })
  password: string;                                               

  @Prop()
  username: string;

  @Prop({ enum: UserRoleEnum, default: UserRoleEnum.ADMIN })
  role: UserRoleEnum;

}

export const AdminSchema = SchemaFactory.createForClass(Admin);
