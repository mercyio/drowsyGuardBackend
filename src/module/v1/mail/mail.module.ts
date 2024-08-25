import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ENVIRONMENT } from 'src/common/configs/environment';
import { join } from 'path';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: ENVIRONMENT.MAILER.EMAIL,
          pass: ENVIRONMENT.MAILER.PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <noreply>@drowsyGuard.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
