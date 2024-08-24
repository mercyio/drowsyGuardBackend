import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InterestService } from './interest.service';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { CreateInterestDto, UpdateInterestDto } from './dto/create-interest.dto';
import { Public } from '../../../common/decorators/public.decorator';

// TODO: add admin guard
@Controller('interests')
export class InterestController {
  constructor(private interestService: InterestService) {}

  @ResponseMessage(RESPONSE_CONSTANT.INTEREST.CREATED_SUCCESS)
  @Post()
  async create(@Body() payload: CreateInterestDto) {
    return await this.interestService.create(payload);
  }

  @ResponseMessage(RESPONSE_CONSTANT.INTEREST.UPDATED_SUCCESS)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateInterestDto) {
    return await this.interestService.update(id, payload);
  }

  @Public()
  @Get()
  @ResponseMessage(RESPONSE_CONSTANT.INTEREST.GET_ALL_INTEREST__SUCCESS)
  async getAll() {
    return await this.interestService.getAll();
  }
}
