import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @IsNotEmpty({ message: 'Company name is required' })
  @IsString()
  company: string;
}
