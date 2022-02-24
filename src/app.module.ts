import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BlogModule, PrismaModule, ConfigModule.forRoot({isGlobal: true}), AuthModule, UserModule]
})
export class AppModule {}
