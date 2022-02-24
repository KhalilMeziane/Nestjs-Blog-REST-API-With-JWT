import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class BlogService {

    constructor(private prisma : PrismaService){}

    async createBlog(body: CreateBlogDto){
        const newBlog = await this.prisma.blog.create({
            data:{
                ...body
            }
        })
        return newBlog
    }
}
