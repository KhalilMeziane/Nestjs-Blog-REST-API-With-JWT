import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { BlogService } from './blog.service';
import { GetBlogDto } from './dto';
import { CreateBlogDto } from './dto/create-blog.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('blog')
export class BlogController {

    constructor(private blogService : BlogService){}

    @Post()
    createBlog(@Body() body : CreateBlogDto, @GetUser('id') userId: number){
        return this.blogService.createBlog(body, userId)
    }


    @Get(':id')
    getBlog(@Param('id', ParseIntPipe) blogId: number, @GetUser('id') userId: number){
        return this.blogService.getBlog(blogId)
    }

    @Get(':id/author')
    getBlogByAuthor(@Param('id', ParseIntPipe) blogId: number, @GetUser('id') userId: number){
        return this.blogService.getBlogByAuthor(blogId, userId)
    }

    @Get()
    getBlogs(){
        return this.blogService.getBlogs()
    }

    @Get('/author')
    getBlogsByAuthor(@GetUser('id') userId: number){
        return this.blogService.getBlogsByAuthor(userId)
    }

    @Patch(':id')
    editBlog(@Param('id', ParseIntPipe) blogId: number, @Body() body : CreateBlogDto, @GetUser('id') userId: number){
        return this.blogService.editBlog(blogId, body, userId)   
    }   
    
    @Delete(':id')
    deleteBlog(@Param('id', ParseIntPipe) blogId: number, @GetUser('id') userId: number){
        return this.blogService.deleteBlog(blogId, userId)
    }

    @Get('search')
    searchForBlog(@Body() body){
        return this.blogService.searchForBlog(body.title)
    }
}