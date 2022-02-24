import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('blog')
export class BlogController {

    constructor(private blogService : BlogService){}

    @Post()
    createBlog(@Body() body : CreateBlogDto, @GetUser('id') userId: number): any{
        return this.blogService.createBlog(body, userId)
    }


    @Get(':id')
    getBlog(@Param('id', ParseIntPipe) blogId: number, @GetUser('id') userId: number) : any{
        return this.blogService.getBlog(blogId, userId)
    }

    @Get()
    getBlogs(@GetUser('id') userId: number) : any{
        return this.blogService.getBlogs(userId)
    }

    @Patch(':id')
    editBlog(@Param('id', ParseIntPipe) blogId: number, @Body() body : CreateBlogDto, @GetUser('id') userId: number) : any{
        return this.blogService.editBlog(blogId, body, userId)   
    }   
    
    @Delete(':id')
    deleteBlog(@Param('id', ParseIntPipe) blogId: number, @GetUser('id') userId: number){
        return this.blogService.deleteBlog(blogId, userId)
    }
}