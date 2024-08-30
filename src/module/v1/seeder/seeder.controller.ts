import { Controller, Post } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Public()
  @Post('seed-admin')
  async seedAdmin() {
    return await this.seederService.seedAdmins();
  }
}
