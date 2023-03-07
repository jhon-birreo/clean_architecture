import { createClient } from 'redis';
import { env } from '../../../config/environment';
export const RedisClientConfig = createClient({
	url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`
});
