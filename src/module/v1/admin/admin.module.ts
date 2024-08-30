import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RepositoryModule } from '../repository/repository.module';
import { SeederService } from '../seeder/seeder.service';
import { SeederModule } from '../seeder/seeder.module';
import { forwardRef } from '@nestjs/common';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      // { name: Admin.name, schema: AdminSchema },
      { name: User.name, schema: UserSchema },
    ]),
    RepositoryModule,
    forwardRef(() => SeederModule),
  ],
  controllers: [AdminController],
  providers: [AdminService, SeederService],
  exports: [AdminService],
})
export class AdminModule {}
