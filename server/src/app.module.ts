import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { RolesModule } from './roles/roles.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SortModule } from './sort/sort.module';
import { ChatModule } from './chat/chat.module';
import { CourseModule } from './course/course.module';
import { BlogModule } from './blog/blog.module';
import { VideolectionModule } from './videolection/videolection.module';
import { TestModule } from './test/test.module';
@Module({
  imports: [
    UserModule,
    DatabaseModule,
    RolesModule,
    JwtModule,
    AuthModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    SortModule,
    ChatModule,
    CourseModule,
    BlogModule,
    VideolectionModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
