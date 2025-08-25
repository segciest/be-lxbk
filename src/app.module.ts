import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { PrismaModule } from './prisma/prisma.module';
import { CourseModule } from './course/course.module';
import { UserModule } from './user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [NewsModule,
    PrismaModule,
    CourseModule,
    UserModule,
    ConfigModule.forRoot({isGlobal:true}),
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService ,JwtStrategy],
})
export class AppModule {}
