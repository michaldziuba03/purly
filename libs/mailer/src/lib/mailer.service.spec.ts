import { MailerService } from './mailer.service';
import { MailerModule } from './mailer.module';
import { Test } from '@nestjs/testing';
import { join } from 'path';
import { MAILER_TRANSPORTER } from './transport.provider';

const TransporterMock = {
  sendMail: jest.fn(),
};

describe('MailerService', () => {
  let mailerService: MailerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MailerModule.forRoot({
          templateDir: join(__dirname, '../assets'),
          transport: {},
          defaults: {
            from: 'Test <test@michaldziuba.dev>',
          },
        }),
      ],
    })
      .overrideProvider(MAILER_TRANSPORTER)
      .useValue(TransporterMock)
      .compile();

    mailerService = moduleRef.get(MailerService);
  });

  describe('readTemplate', () => {
    it('should return compiled HTML content', async () => {
      const result = await mailerService.readTemplate('test', {
        name: 'Michał',
      });

      expect(typeof result).toEqual('string');
      expect(result.includes('Michał')).toBeTruthy();
    });

    it('should fail if file does not exist', async () => {
      const promise = mailerService.readTemplate('doesnt-exist');
      expect(promise).rejects.toBeDefined();
    });
  });

  describe('sendMail', () => {
    it('should call transporter.sendMail and read template without error', async () => {
      await mailerService.sendMail(
        {
          template: 'test',
          from: 'Test2 <test@michaldziuba.dev>',
          subject: 'Test mail',
          to: 'mail@michaldziuba.dev',
        },
        {
          name: 'Michał',
        }
      );

      expect(TransporterMock.sendMail).toBeCalled();
    });
  });
});
