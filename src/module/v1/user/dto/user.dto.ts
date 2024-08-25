import {
  IsArray,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  confirmPassword: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsDateString()
  birthday: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests: string[];
}

export class GoogleAuthDto {
  @IsEmail()
  email: string;
}
