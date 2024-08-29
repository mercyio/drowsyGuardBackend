import { Module } from '@nestjs/common';
import { AgoraService } from 'src/common/utils/third_party_services/agora.service';

@Module({
  providers: [AgoraService],
  exports: [AgoraService],
})
export class AgoraModule {}
