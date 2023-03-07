export const env = {
	SERVICE_NAME: process.env.SERVICE_NAME || 'Ecommerce',
	MONGO_URL: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api',

	JWT_SECRET: process.env.JWT_SECRET || 'ssl?$23',
	JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',

	SERVER_ROOT: process.env.SERVER_ROOT || '/api/v1',
	SERVER_HOST: process.env.SERVER_HOST || 'http://localhost',
	SERVER_PORT: process.env.SERVER_PORT || 4000,

	POSTGRES_HOST: process.env.POSTGRES_HOST || '127.0.0.1',
	POSTGRES_PORT: Number(process.env.POSTGRES_PORT) || 5432,
	POSTGRES_USER: process.env.POSTGRES_USER || 'jhonas',
	POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'dev@2022',
	POSTGRES_DB: process.env.POSTGRES_DB || 'clean_arch',

	REDIS_PORT: process.env.REDIS_PORT || '6379',
	REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1'
};
