import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Bishi Api Documentation')
    .setDescription('Bishi api documentation')
    .setVersion('1.0')
    .addServer('http://localhost:3000')
    .addTag('Authorization', 'Authorization APIs')
    .addTag('User', 'User model APIs')
    .addTag('Bishi', 'Bishi model APIs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('api-json', app, document);

  await app.listen(3000);
}
bootstrap();
