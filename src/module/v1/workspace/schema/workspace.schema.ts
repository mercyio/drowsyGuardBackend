import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type WorkspaceDocument = Workspace & Document;

@Schema({ timestamps: true })
export class Workspace {
  @Prop({ types: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  creator: mongoose.Types.ObjectId;

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
