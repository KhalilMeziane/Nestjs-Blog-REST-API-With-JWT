import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class BlogService {

    constructor(private prisma : PrismaService){}

    async createBlog(body: CreateBlogDto, userId){
        const newBlog = await this.prisma.blog.create({
            data:{
                ...body,
                userId
            }
        })
        return newBlog
    }

    async getBlog(blogId:number, userId){
        const targetBlog = await this.prisma.blog.findFirst({
            where:{
                id: blogId,
                userId
            },
        })
        // condition need some code to check if its empty when resource is not denied
        if(!targetBlog) throw new ForbiddenException('Access to resources denied')
        return targetBlog
    }

    async getBlogs(userId){
        return await this.prisma.blog.findMany({
            where:{
                userId
            }
        })
    }

    async editBlog(id: number, body: CreateBlogDto, userId : number){
        const targetBlog = await this.prisma.blog.findFirst({
            where:{
                id,
                userId
            }
        })

        if(!targetBlog || targetBlog.userId !== userId) throw new ForbiddenException('Access to resources denied')
        
        const updatedBlog = await this.prisma.blog.update({
            where:{
                id,
            },
            data:{
                ...body
            }
        })
        return updatedBlog
    }

    async deleteBlog(id: number, userId : number){
        const targetBlog = await this.prisma.blog.findFirst({
            where:{
                id,
                userId
            }
        })

        if(!targetBlog || targetBlog.userId !== userId) throw new ForbiddenException('Access to resources denied')

        await this.prisma.blog.delete({
            where:{
                id
            }
        })
    }
}
