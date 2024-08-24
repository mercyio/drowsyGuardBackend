import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';

export class CreateInterestDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    return value.charAt(0).toUpperCase() + value.slice(1).trim();
  })
  name: string;
}

export class UpdateInterestDto extends PartialType(CreateInterestDto) {}
