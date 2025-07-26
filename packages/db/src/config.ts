/* DON'T IMPORT IT IN APPLICATION - config for scripts like migrations, seeds */
import 'dotenv/config';
import { ConfigFactory } from './factories/config.factory';

export default ConfigFactory.create({
  migrations: {
    pathTs: 'src/migrations',
    path: 'dist/migrations',
  },
});
