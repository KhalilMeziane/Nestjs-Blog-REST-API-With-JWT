import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BlogModule, PrismaModule, ConfigModule.forRoot({isGlobal: true}), AuthModule]
})
export class AppModule {}
