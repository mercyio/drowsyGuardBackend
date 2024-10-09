import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from '../../user/dto/user.dto';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class VerifyEmailDto {
  @IsEmail()
  email: string;
}

export class SuperAdminSignUpDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  secret: string;
}
