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

    async getBlog(blogId:number){
        const targetBlog = await this.prisma.blog.findUnique({
            where:{
                id: blogId
            },
        })
        return targetBlog
    }

    async getBlogs(){
        return await this.prisma.blog.findMany()
    }

    async editBlog(id: number, body: CreateBlogDto){
        const updatedBlog = await this.prisma.blog.update({
            where:{
                id
            },
            data:{
                ...body
            }
        })
        return updatedBlog
    }
}
