import { Module } from '@nestjs/common';
import { UserModule } from './module/v1/user/user.module';
import { DatabaseModule } from './module/v1/database/database.module';
import { AuthModule } from './module/v1/auth/auth.module';
import { RepositoryModule } from './module/v1/repository/repository.module';
import { SeederModule } from './module/v1/seeder/seeder.module';
import { FaceDetectionModule } from './module/v1/face-detection/face-detection.module';
// import { GoogleMapModule } from './module/v1/map/map.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    AuthModule,
    RepositoryModule,
    SeederModule,
    FaceDetectionModule,
    // GoogleMapModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
