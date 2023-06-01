import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:["*"],
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE', 'OPTIONS'],
    allowedHeaders:"*",
    credentials:true
  })
  const config = new DocumentBuilder()
      .setTitle("InterCT")
      .setDescription("Documentation for REST API")
      .setVersion("1.0.0")
      .addTag("InterCT")
      .build();
  const documentation = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("/api/docs",app,documentation)
  app.use(cookieParser())
  await app.listen(3000);
}
bootstrap();
