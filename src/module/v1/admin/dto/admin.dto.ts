/* eslint-disable prettier/prettier */
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

// export class CreateAdminDto {
//   @IsEmail()
//   email: string;

//   @IsString()
//   @MinLength(4)
//   @MaxLength(20)
//   password: string;
// }

// export class UpdateAdminDto {
//   @IsOptional()
//   @IsString()
//   username: string;

//   @IsOptional()
//   @IsArray()
//   @IsString({ each: true })
//   interests: string[];
// }

export class AdminLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
