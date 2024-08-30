import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
// import { InterestModule } from '../interest/interest.module';
import { AdminModule } from '../admin/admin.module';
import { AdminService } from '../admin/admin.service';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => AdminModule)],
  controllers: [SeederController],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
