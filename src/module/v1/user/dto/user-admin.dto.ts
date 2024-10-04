import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { UserRoleEnum } from '../../../../common/enums/user.enum';

export class AdminAssignRoleDto {
  @IsString()
  @IsNotEmpty()
  assigneeId: string;

  @IsEnum(UserRoleEnum)
  @IsNotEmpty()
  role: UserRoleEnum;
}

export class ActivateDeactivateAdminDto {
  @IsString()
  @IsNotEmpty()
  adminToUpdateId: string;

  @IsNotEmpty()
  isActive: boolean;
}

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsEnum(UserRoleEnum)
  @IsNotEmpty()
  role: UserRoleEnum;
}
