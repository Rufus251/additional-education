import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { BlogService } from './blog.service';
import { addBlog } from './dto/add-blog.dto';
import { addBlogBlock } from './dto/add-blog-block.dto';
import { addComment } from './dto/add-comment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('blog')
@ApiTags('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Get('blogs')
    @ApiResponse({ status: 200, description: 'Return blogs' })
    async getBlogs() {
        const res = this.blogService.getBlogs()
        return res
    }

    @Get('blogInfos')
    @ApiResponse({ status: 200, description: 'Return blogInfos' })
    async getBlogInfos() {
        const res = this.blogService.getBlogInfos()
        return res
    }

    @Post('addBlog/:authorId/:facultyId')
    @ApiResponse({ status: 200, description: 'Return blog' })
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('file'))
    async addBlog(@Param('authorId') authorId: number, @Param('facultyId') facultyId: number, @Body() dto: addBlog, @UploadedFile() file: Express.Multer.File) {
        const res = this.blogService.addBlog(+authorId, +facultyId, dto, file)
        return res
    }

    @Delete('deleteBlog/:id')
    @ApiResponse({ status: 200, description: 'Return blog' })
    async deleteBlog(@Param('id') id: number) {
        const res = this.blogService.deleteBlog(+id)
        return res
    }

    @Get('blogBlocks')
    @ApiResponse({ status: 200, description: 'Return blog blocks' })
    async getBlogBlocks() {
        const res = this.blogService.getBlogBlocks()
        return res
    }

    @Post('addBlogText/:blogInfoId')
    @ApiResponse({ status: 200, description: 'Return blog block text' })
    @UsePipes(new ValidationPipe())
    async addBlogText(@Param('blogInfoId') blogInfoId: number, @Body() dto: addBlogBlock) {
        const res = this.blogService.addBlogText(+blogInfoId, dto)
        return res
    }

    @Post('addBlogImage/:blogInfoId')
    @ApiResponse({ status: 200, description: 'Return blog block image' })
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('file'))
    async addBlogImage(@Param('blogInfoId') blogInfoId: number, @UploadedFile() file: Express.Multer.File) {
        const res = this.blogService.addBlogImage(+blogInfoId, file)
        return res
    }

    @Post('addBlogVideo/:blogInfoId')
    @ApiResponse({ status: 200, description: 'Return blog block video' })
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('file'))
    async addBlogVideo(@Param('blogInfoId') blogInfoId: number, @UploadedFile() file: Express.Multer.File) {
        const res = this.blogService.addBlogVideo(+blogInfoId, file)
        return res
    }

    @Post('addBlogAudio/:blogInfoId')
    @ApiResponse({ status: 200, description: 'Return blog block audio' })
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('file'))
    async addBlogAudio(@Param('blogInfoId') blogInfoId: number, @UploadedFile() file: Express.Multer.File) {
        const res = this.blogService.addBlogAudio(+blogInfoId, file)
        return res
    }

    @Delete('deleteBlogBlock/:id')
    @ApiResponse({ status: 200, description: 'Return blog block' })
    async deleteBlogBlock(@Param('id') id: number) {
        const res = this.blogService.deleteBlogBlock(+id)
        return res
    }

    @Get('comments')
    @ApiResponse({ status: 200, description: 'Return comments' })
    async getComment() {
        const res = this.blogService.getComments()
        return res
    }

    @Post('addComment/:blogInfoId/:userId')
    @ApiResponse({ status: 200, description: 'Return comment' })
    @UsePipes(new ValidationPipe())
    async addComment(@Param('blogInfoId') blogInfoId: number, @Param('userId') userId: number, @Body() dto: addComment) {
        const res = this.blogService.addComment(+blogInfoId, +userId, dto)
        return res
    }

    @Delete('deleteComment/:id')
    @ApiResponse({ status: 200, description: 'Return comment' })
    async deleteComment(@Param('id') id: number) {
        const res = this.blogService.deleteComment(+id)
        return res
    }
}
