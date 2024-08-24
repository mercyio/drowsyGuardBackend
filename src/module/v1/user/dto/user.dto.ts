import { IsArray, IsDateString, IsEmail, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(10, 11)
  phone: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
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
