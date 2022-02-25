import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBlogDto, GetBlogDto } from './dto';
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

    async getBlog(blogId:number) : Promise<GetBlogDto>{
        const targetBlog = await this.prisma.blog.findFirst({
            where:{
                id: blogId
            },
            select:{
                title:true,
                content: true,
                link: true,
                user:{
                    select: {
                        username: true,
                        id: true
                    }
                }
            }
        })
        // condition need some code to check if its empty when resource is not denied
        if(!targetBlog) throw new ForbiddenException('Access to resources denied')
        return targetBlog
    }

    async getBlogByAuthor(blogId:number, userId) : Promise<GetBlogDto>{
        const targetBlog = await this.prisma.blog.findFirst({
            where:{
                id: blogId,
                userId
            },
            select:{
                title:true,
                content: true,
                link: true,
                user:{
                    select: {
                        username: true,
                        id: true
                    }
                }
            }
        })
        // condition need some code to check if its empty when resource is not denied
        if(!targetBlog) throw new ForbiddenException('Access to resources denied')
        return targetBlog
    }

    async getBlogs() : Promise<GetBlogDto[]>{
        return await this.prisma.blog.findMany({
            select:{
                title:true,
                content: true,
                link: true,
                user:{
                    select: {
                        username: true,
                        id: true
                    }
                }
            }
        })
    }

    async getBlogsByAuthor(userId) : Promise<GetBlogDto[]>{
        return await this.prisma.blog.findMany({
            where:{
                userId
            },
            select:{
                title:true,
                content: true,
                link: true,
                user:{
                    select: {
                        username: true,
                        id: true
                    }
                }
            }
        })
    }

    async editBlog(id: number, body: CreateBlogDto, userId : number) : Promise<GetBlogDto>{
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
            },
            select:{
                title:true,
                content: true,
                link: true,
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
        return {message: "delete done"}
    }

    async searchForBlog(text,skip){
        const listOfBlogs = await this.prisma.blog.findMany({
            take: 5,
            skip,
            where:{
                title:{
                    startsWith:text
                }
            },
            orderBy: {
                id: 'asc',
            }
        })

        if(!listOfBlogs) return []

        return listOfBlogs
    }
}
