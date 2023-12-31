import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import { addCourse } from './dto/add-course.dto';
import { changeCourseInfo } from './dto/change-course-info.dto';
import { addAuthorInfo } from './dto/add-author-info.dto';
import { addSection } from './dto/add-section.dto';
import { addModule } from './dto/add-module.dto';
import { addModuleVideoLection } from './dto/add-video-lection.dto';
import { addLectionBlock } from './dto/add-lection-block.dto';
import { addLection } from './dto/add-lection.dto';
import { addTest } from './dto/add-test.dto';
import { addTestQuestion } from './dto/add-test-question.dto';
import { addTestQuestionVariant } from './dto/add-test-question-variant.dto';
import { addExam } from './dto/add-exam.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('course')
@ApiTags('course')
export class CourseController {
    constructor(private readonly courseSerice: CourseService) { }

    @Get('courses')
    @ApiResponse({ status: 200, description: 'Return courses' })
    async getCourses() {
        const res = this.courseSerice.getCourses()
        return res
    }

    @Get('course/:courseId')
    @ApiResponse({ status: 200, description: 'Return course/id' })
    async getCourse(@Param("courseId") courseId: number) {
        const res = this.courseSerice.getCourse(+courseId)
        return res
    }

    @Get('coursesForAdditional/:additionalName')
    @ApiResponse({ status: 200, description: 'Return coursesForAdditional' })
    async coursesForAdditional(@Param("additionalName") additionalName: string) {
        const res = this.courseSerice.getCourseForAdditional(additionalName)
        return res
    }

    @Get('coursesInfo')
    @ApiResponse({ status: 200, description: 'Return courseInfos' })
    async getCoursesInfo() {
        const res = this.courseSerice.getCourseInfos()
        return res
    }

    @Get('courseInfo/:courseId')
    @ApiResponse({ status: 200, description: 'Return course/id' })
    async getCourseInfo(@Param("courseId") courseId: number) {
        const res = this.courseSerice.getCourseInfo(+courseId)
        return res
    }

    @Post('addCourse')
    @ApiResponse({ status: 200, description: 'Return course' })
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('file'))
    async addCourse(@Body() dto: addCourse, @UploadedFile() file: Express.Multer.File) {
        try {
            const res = this.courseSerice.addCourse(dto, file)
            return res
        } catch (error) {
            return error
        }
    }

    @Put('changeCourseInfo/:id')
    @ApiResponse({ status: 200, description: 'Return course' })
    @UsePipes(new ValidationPipe())
    async changeCourseInfo(@Param('id') id: number, @Body() dto: changeCourseInfo) {
        const res = this.courseSerice.changeCourseInfo(+id, dto)
        return res
    }

    @Delete('deleteCourse/:id')
    @ApiResponse({ status: 200, description: 'Return course' })
    async deleteCourse(@Param('id') id: number) {
        const res = this.courseSerice.deleteCourse(+id)
        return res
    }

    // AuthorInfo CRUD
    @Get('authorsInfo')
    @ApiResponse({ status: 200, description: 'Return authorsInfo' })
    async getAuthorsInfo() {
        const res = this.courseSerice.getAuthorInfo()
        return res
    }

    @Get('authorInfos/:courseId')
    @ApiResponse({ status: 200, description: 'Return course/id' })
    async getAuthorInfos(@Param("courseId") courseId: number) {
        const res = this.courseSerice.getAuthorInfos(+courseId)
        return res
    }

    @Post('addAuthorInfo/:courseInfoId')
    @ApiResponse({ status: 200, description: 'Return AuthorInfo' })
    @UsePipes(new ValidationPipe())
    async addAuthorInfo(@Param('courseInfoId') courseInfoId: number, @Body() dto: addAuthorInfo) {
        const res = this.courseSerice.addAuthorInfo(+courseInfoId, dto)
        return res
    }

    @Delete('deleteAuthorInfo/:id')
    @ApiResponse({ status: 200, description: 'Return AuthorInfo' })
    async deleteAuthorInfo(@Param('id') id: number) {
        const res = this.courseSerice.deleteAuthorInfo(+id)
        return res
    }

    // Section CRUD
    @Get('sections')
    @ApiResponse({ status: 200, description: 'Return sections' })
    async getSection() {
        const res = this.courseSerice.getSections()
        return res
    }

    @Get('sections/:courseId')
    @ApiResponse({ status: 200, description: 'Return section/id' })
    async getSectionsById(@Param("courseId") courseId: number) {
        const res = this.courseSerice.getSectionsById(+courseId)
        return res
    }

    @Post('addSection/:courseInfoId')
    @ApiResponse({ status: 200, description: 'Return section' })
    @UsePipes(new ValidationPipe())
    async addSection(@Param('courseInfoId') courseInfoId: number, @Body() dto: addSection) {
        const res = this.courseSerice.addSection(+courseInfoId, dto)
        return res
    }

    @Delete('deleteSection/:id')
    @ApiResponse({ status: 200, description: 'Return section' })
    async deleteSection(@Param('id') id: number) {
        const res = this.courseSerice.deleteSection(+id)
        return res
    }

    // Module CRUD
    @Get('module')
    @ApiResponse({ status: 200, description: 'Return modules' })
    async getModule() {
        const res = this.courseSerice.getModule()
        return res
    }

    @Get('modules/:sectionId')
    @ApiResponse({ status: 200, description: 'Return module/id' })
    async getModulesById(@Param("sectionId") sectionId: number) {
        const res = this.courseSerice.getModulesById(+sectionId)
        return res
    }

    @Post('addModule/:sectionId')
    @ApiResponse({ status: 200, description: 'Return module' })
    @UsePipes(new ValidationPipe())
    async addModule(@Param('sectionId') sectionId: number, @Body() dto: addModule) {
        const res = this.courseSerice.addModule(+sectionId, dto)
        return res
    }

    @Delete('deleteModule/:id')
    @ApiResponse({ status: 200, description: 'Return module' })
    async deleteModule(@Param('id') id: number) {
        const res = this.courseSerice.deleteModule(+id)
        return res
    }


    @Get('tasks/:moduleId')
    @ApiResponse({ status: 200, description: 'Return tasks/id' })
    async getTasksById(@Param("moduleId") moduleId: number) {
        const res = this.courseSerice.getTasksById(+moduleId)
        return res
    }

    // videoLection CRUD
    @Get('videoLection')
    @ApiResponse({ status: 200, description: 'Return videoLections' })
    async getVideoLection() {
        const res = this.courseSerice.getVideoLection()
        return res
    }

    // two files, mp4 first, pdf second
    @Post('addVideoLection/:moduleId')
    @ApiResponse({ status: 200, description: 'Return videoLection' })
    @UsePipes(new ValidationPipe())
    @UseInterceptors(AnyFilesInterceptor())
    async addVideoLection(
        @Param('moduleId') moduleId: number, @Body() dto: addModuleVideoLection, @UploadedFiles() files: Array<Express.Multer.File>) {
        const res = this.courseSerice.addVideoLection(+moduleId, dto, files)
        return res
    }

    @Delete('deleteVideoLection/:id')
    @ApiResponse({ status: 200, description: 'Return videoLection' })
    async deleteVideoLection(@Param('id') id: number) {
        const res = this.courseSerice.deleteVideoLection(+id)
        return res
    }

    // lection CRUD
    @Get('lection')
    @ApiResponse({ status: 200, description: 'Return lections' })
    async getLection() {
        const res = this.courseSerice.getLection()
        return res
    }

    @Post('addLection/:moduleId')
    @ApiResponse({ status: 200, description: 'Return lection' })
    @UsePipes(new ValidationPipe())
    @UseInterceptors(AnyFilesInterceptor())
    async addLection(@Param('moduleId') moduleId: number, @Body() dto: addLection, @UploadedFiles() files: Array<Express.Multer.File>) {
        const res = this.courseSerice.addLection(+moduleId, dto, files[0])
        return res
    }

    @Delete('deleteLection/:id')
    @ApiResponse({ status: 200, description: 'Return lection' })
    async deleteLection(@Param('id') id: number) {
        const res = this.courseSerice.deleteLection(+id)
        return res
    }

    @Get('lectionBlock')
    @ApiResponse({ status: 200, description: 'Return lectionBlocks' })
    async getLectionBlock() {
        const res = this.courseSerice.getLectionBlock()
        return res
    }

    @Post('addLectionBlock/:lectionId')
    @ApiResponse({ status: 200, description: 'Return lectionBlock' })
    @UsePipes(new ValidationPipe())
    @UseInterceptors(AnyFilesInterceptor())
    async addLectionBlock(@Param('lectionId') lectionId: number, @Body() dto: addLectionBlock, @UploadedFiles() files: Array<Express.Multer.File>) {
        const res = this.courseSerice.addLectionBlock(+lectionId, dto, files[0])
        return res
    }

    @Delete('deleteLectionBlock/:id')
    @ApiResponse({ status: 200, description: 'Return lectionBlock' })
    async deleteLectionBlock(@Param('id') id: number) {
        const res = this.courseSerice.deleteLectionBlock(+id)
        return res
    }

    // test CRUD
    @Get('test')
    @ApiResponse({ status: 200, description: 'Return tests' })
    async getTest() {
        const res = this.courseSerice.getTest()
        return res
    }

    @Post('addTest/:moduleId')
    @ApiResponse({ status: 200, description: 'Return test' })
    @UsePipes(new ValidationPipe())
    async addTest(@Param('moduleId') moduleId: number, @Body() dto: addTest) {
        const res = this.courseSerice.addTest(+moduleId, dto)
        return res
    }

    @Delete('deleteTest/:id')
    @ApiResponse({ status: 200, description: 'Return test' })
    async deleteTest(@Param('id') id: number) {
        const res = this.courseSerice.deleteTest(+id)
        return res
    }

    @Get('testQuestion')
    @ApiResponse({ status: 200, description: 'Return testQuestions' })
    async getTestQuestion() {
        const res = this.courseSerice.getTestQuestion()
        return res
    }

    @Post('addTestQuestion/:testId')
    @ApiResponse({ status: 200, description: 'Return testQuestion' })
    @UsePipes(new ValidationPipe())
    @UseInterceptors(AnyFilesInterceptor())
    async addTestQuestion(@Param('testId') testId: number, @Body() dto: addTestQuestion, @UploadedFiles() files: Array<Express.Multer.File>) {
        const res = this.courseSerice.addTestQuestion(+testId, dto, files[0])
        return res
    }

    @Delete('deleteTestQuestion/:id')
    @ApiResponse({ status: 200, description: 'Return testQuestion' })
    async deleteTestQuestion(@Param('id') id: number) {
        const res = this.courseSerice.deleteTestQuestion(+id)
        return res
    }

    @Get('testQuestionVariant')
    @ApiResponse({ status: 200, description: 'Return testQuestionVariants' })
    async getTestQuestionVariant() {
        const res = this.courseSerice.getTestQuestionVariant()
        return res
    }

    @Post('addTestQuestionVariant/:testQuestionId')
    @UsePipes(new ValidationPipe())
    @ApiResponse({ status: 200, description: 'Return testQuestionVariant' })
    async addTestQuestionVariant(@Param('testQuestionId') testQuestionId: number, @Body() dto: addTestQuestionVariant) {
        const res = this.courseSerice.addTestQuestionVariant(+testQuestionId, dto)
        return res
    }

    @Delete('deleteTestQuestionVariant/:id')
    @ApiResponse({ status: 200, description: 'Return testQuestionVariant' })
    async deleteTestQuestionVariant(@Param('id') id: number) {
        const res = this.courseSerice.deleteTestQuestionVariant(+id)
        return res
    }

    // exam CRUD
    @Get('exam')
    @ApiResponse({ status: 200, description: 'Return exams' })
    async getExam() {
        const res = this.courseSerice.getExam()
        return res
    }

    // first file homewordk, then image
    @Post('addExam/:moduleId')
    @ApiResponse({ status: 200, description: 'Return exam' })
    @UsePipes(new ValidationPipe())
    @UseInterceptors(AnyFilesInterceptor())
    async addExam(@Param('moduleId') moduleId: number, @Body() dto: addExam, @UploadedFiles() files: Array<Express.Multer.File>) {
        const res = this.courseSerice.addExam(+moduleId, dto, files)
        return res
    }

    @Delete('deleteExam/:id')
    @ApiResponse({ status: 200, description: 'Return exam' })
    async deleteExam(@Param('id') id: number) {
        const res = this.courseSerice.deleteExam(+id)
        return res
    }
}
