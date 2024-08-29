import { Injectable } from '@nestjs/common';
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import { ENVIRONMENT } from 'src/common/configs/environment';

@Injectable()
export class AgoraService {
  async generateToken(channelName: string, uid: any, expiryInSeconds?: number) {
    const appID = ENVIRONMENT.AGORA.APP_ID;
    const appCertificate = ENVIRONMENT.AGORA.APP_CERTIFICATE;
    const role = RtcRole.PUBLISHER;

    const defaultExpirationTimeInSeconds = 31536000; // 365 days

    const expirationTimeInSeconds =
      expiryInSeconds || defaultExpirationTimeInSeconds;
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    return RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs,
    );
  }
}
