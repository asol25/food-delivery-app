import { SwaggerSetting } from './config/swagger/index';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn', 'log'],
	});
	const PORT = process.env.PORT || 33714;
	app.enableCors();

	SwaggerSetting(app);
	await app.listen(PORT);
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
