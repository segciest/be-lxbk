import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(express.json());
  app.enableCors({
    origin: "*"
  }) // mo kich hoat quyen cors
  
  app.use(express.static(".")) //dinh vi lai duong dan load file
  // swagger
  const config = new DocumentBuilder().setTitle('bachkhoa').addBearerAuth().build()
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('/swagger',app,document)
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();

// yarn add @nestjs/swagger swagger-ui-express

// nest new .

// nest g resource [resource-name] --no-spec

// yarn add @nestjs/config

// yarn add prisma @prisma/client

// yarn prisma init

// edit .env và prisma.schema

// yarn prisma db pull

// yarn prisma generate