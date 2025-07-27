import { Global, Module, Provider } from '@nestjs/common';
import { SessionManager, MemoryStorage } from '@purly/security';

const SessionManagerProvider: Provider<SessionManager> = {
  provide: SessionManager,
  useFactory: () => {
    const storage = new MemoryStorage();
    return new SessionManager(storage);
  },
};

@Global()
@Module({
  providers: [SessionManagerProvider],
  exports: [SessionManagerProvider],
})
export class CommonModule {}
