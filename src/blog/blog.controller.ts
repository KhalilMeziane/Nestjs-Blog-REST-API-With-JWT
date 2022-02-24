import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {

    constructor(private blogService : BlogService){}

    @Post()
    createBlog(@Body() body : CreateBlogDto): any{
        return this.blogService.createBlog(body)
    }


    @Get()
    getBlogs() : any{
        return []
    }
}