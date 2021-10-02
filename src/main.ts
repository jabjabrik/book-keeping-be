import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async () => {
	const app = await NestFactory.create(AppModule, { cors: true });
	await app.listen(process.env.PORT || 3001);
	Logger.log('server running on localhost:3001');
})();
