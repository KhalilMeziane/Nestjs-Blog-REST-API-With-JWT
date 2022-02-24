import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {

    constructor(private blogService : BlogService){}

    @Post()
    createBlog(@Body() body : CreateBlogDto): any{
        return this.blogService.createBlog(body)
    }


    @Get(':id')
    getBlog(@Param('id', ParseIntPipe) blogId: number) : any{
        return this.blogService.getBlog(blogId)
    }

    @Get()
    getBlogs() : any{
        return this.blogService.getBlogs()
    }

    @Patch(':id')
    editBlog(@Param('id', ParseIntPipe) blogId: number, @Body() body : CreateBlogDto) : any{
        return this.blogService.editBlog(blogId, body)   
    }       
}