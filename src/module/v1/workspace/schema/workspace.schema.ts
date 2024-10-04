import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserDocument } from '../../user/schemas/user.schema';

export type WorkspaceDocument = Workspace & Document;

@Schema({ timestamps: true })
export class Workspace {
  @Prop({ type: String, ref: 'User', required: true })
  creator: UserDocument;

  @Prop()
  company: string;

  @Prop({ default: false })
  deactivated: boolean;

  @Prop({ type: Date, default: Date.now, select: false })
  workspaceGeneratedAt: Date;

  @Prop({ default: null })
  workspaceDeactivationReason: string;
}
export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
