import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { AdminModule } from '../admin/admin.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => AdminModule)],
  controllers: [SeederController],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
