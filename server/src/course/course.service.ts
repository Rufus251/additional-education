import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { addCourse } from './dto/add-course.dto';
import { changeCourseInfo } from './dto/change-course-info.dto';
import { addSection } from './dto/add-section.dto';
import { addAuthorInfo } from './dto/add-author-info.dto';
import { addModule } from './dto/add-module.dto';
import { addModuleVideoLection } from './dto/add-video-lection.dto';
import { addLection } from './dto/add-lection.dto';
import { addLectionBlock } from './dto/add-lection-block.dto';
import { addTest } from './dto/add-test.dto';
import { addTestQuestion } from './dto/add-test-question.dto';
import { addTestQuestionVariant } from './dto/add-test-question-variant.dto';
import { addExam } from './dto/add-exam.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class CourseService {
    constructor(private readonly databaseService: DatabaseService,
        private readonly fileService: FilesService) { }

    // course CRUD
    async getCourse() {
        const res = await this.databaseService.courses.findMany()
        return res
    }

    async getCourseForAdditional(additionalName: string){
        try {
            const courseAdditional = await this.databaseService.courseAdditional.findFirst({
                where:{
                    name: additionalName
                }
            })
            let courseToAdditional = await this.databaseService.coursesToAdditional.findMany({
                where:{
                    courseAdditionalId: courseAdditional.id
                }
            })
            //delete repeats
            courseToAdditional = courseToAdditional.filter((elem, ind) => courseToAdditional.indexOf(elem) === ind)

            let coursesForAdditional = []
            for await (const elem of courseToAdditional){
                const course = await this.databaseService.courses.findFirst({
                    where:{
                        id: elem.coursesId
                    }
                })
                coursesForAdditional.push(course)
            }

            //delete repeats
            coursesForAdditional = coursesForAdditional.filter((elem, ind) => coursesForAdditional.indexOf(elem) === ind)

            return coursesForAdditional
        } catch (error) {
            return error
        }
    }

    async getCourseInfo() {
        const res = await this.databaseService.courseInfo.findMany()
        return res
    }

    async addCourse(dto: addCourse, file: Express.Multer.File) {
        try {
            const fileName = await this.fileService.createImageFile(file)
            const res = await this.databaseService.courses.create({
                data: {
                    author: { connect: { id: +dto.authorId } },
                    courseName: dto.courseName,
                    educationType: { connect: { id: +dto.educationTypeId } },
                    faculty: { connect: { id: +dto.facultyId } },
                    diplomType: { connect: { id: +dto.diplomTypeId } },
                    diplomImg: fileName,
                    courseToAdditional: {
                        create: {
                            courseAdditional: {
                                connect: {
                                    id: +dto.coursesToAdditionalId
                                }
                            }
                        }
                    },
                    minHours: +dto.minHours,
                    courseInfo: { create: {} }
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async changeCourseInfo(id: number, dto: changeCourseInfo) {
        try {
            const res = await this.databaseService.courseInfo.update({
                where: {
                    courseId: id
                },
                data: {
                    ...dto
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async deleteCourse(id: number) {
        try {
            const res = await this.databaseService.courses.delete({
                where: {
                    id
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    // author info CRUD
    async getAuthorInfo() {
        const res = await this.databaseService.authorInfo.findMany()
        return res
    }

    async addAuthorInfo(courseInfoId: number, dto: addAuthorInfo) {
        try {
            const res = await this.databaseService.authorInfo.create({
                data: {
                    ...dto,
                    courseInfo: {
                        connect: {
                            id: courseInfoId
                        }
                    }
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async deleteAuthorInfo(id: number) {
        try {
            const res = await this.databaseService.authorInfo.delete({
                where: {
                    id
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    // section CRUD
    async getSections() {
        const res = await this.databaseService.section.findMany()
        return res
    }

    async addSection(courseInfoId: number, dto: addSection) {
        try {
            const res = await this.databaseService.section.create({
                data: {
                    ...dto,
                    courseInfo: {
                        connect: {
                            id: courseInfoId
                        }
                    }
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async deleteSection(id: number) {
        try {
            const res = await this.databaseService.section.delete({
                where: {
                    id
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    // module CRUD
    async getModule() {
        const res = await this.databaseService.modules.findMany()
        return res
    }

    async addModule(sectionId: number, dto: addModule) {
        try {
            const res = await this.databaseService.modules.create({
                data: {
                    hoursAmount: dto.hoursAmount,
                    moduleName: dto.moduleName,
                    section: {
                        connect: {
                            id: sectionId
                        }
                    }
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async deleteModule(id: number) {
        try {
            const res = await this.databaseService.modules.delete({
                where: {
                    id
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    // video lection CRUD
    async getVideoLection() {
        const res = await this.databaseService.videoLesson.findMany()
        return res
    }

    async addVideoLection(moduleId: number, dto: addModuleVideoLection, files: Array<Express.Multer.File>) {
        try {
            // two files, mp4 first, pdf second
            const videoUrl = await this.fileService.createMP4File(files[0])
            const homeworkUrl = await this.fileService.createPDFFile(files[1])

            dto.queueNumber = +dto.queueNumber
            const res = await this.databaseService.videoLesson.create({
                data: {
                    ...dto,
                    videoUrl: videoUrl,
                    homeworkFile: homeworkUrl,
                    module: {
                        connect: {
                            id: moduleId
                        }
                    }
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async deleteVideoLection(id: number) {
        try {
            const res = await this.databaseService.videoLesson.delete({
                where: {
                    id
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    // lection CRUD
    async getLection() {
        const res = await this.databaseService.lectionLesson.findMany()
        return res
    }

    async addLection(moduleId: number, dto: addLection, file: Express.Multer.File) {
        try {
            const homeworkUrl = await this.fileService.createPDFFile(file)
            console.log(+dto.queueNumber)
            const res = await this.databaseService.lectionLesson.create({
                data: {
                    ...dto,
                    queueNumber: +dto.queueNumber,
                    homeworkFile: homeworkUrl,
                    module: {
                        connect: {
                            id: moduleId
                        }
                    }
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async deleteLection(id: number) {
        try {
            const res = await this.databaseService.lectionLesson.delete({
                where: {
                    id
                }
            })
            return res
        } catch (error) {
            return error
        }
    }


    async getLectionBlock() {
        const res = await this.databaseService.lectionBlock.findMany()
        return res
    }

    async addLectionBlock(lectionId: number, dto: addLectionBlock, file: Express.Multer.File) {
        try {
            const imgUrl = await this.fileService.createImageFile(file)
            const res = await this.databaseService.lectionBlock.create({
                data: {
                    ...dto,
                    img: imgUrl,
                    lectionLesson: {
                        connect: {
                            id: lectionId
                        }
                    }
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async deleteLectionBlock(id: number) {
        try {
            const res = await this.databaseService.lectionBlock.delete({
                where: {
                    id
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    // test CRUD
    async getTest() {
        const res = await this.databaseService.testLesson.findMany()
        return res
    }

    async addTest(moduleId: number, dto: addTest) {
        try {
            const res = await this.databaseService.testLesson.create({
                data: {
                    ...dto,
                    module: {
                        connect: {
                            id: moduleId
                        }
                    }
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async deleteTest(id: number) {
        try {
            const res = await this.databaseService.testLesson.delete({
                where: {
                    id
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async getTestQuestion() {
        const res = await this.databaseService.testQuestion.findMany()
        return res
    }

    async addTestQuestion(testId: number, dto: addTestQuestion, file: Express.Multer.File) {
        try {
            const imgUrl = await this.fileService.createImageFile(file)
            const res = await this.databaseService.testQuestion.create({
                data: {
                    ...dto,
                    queueNumber: +dto.queueNumber,
                    questionImg: imgUrl,
                    testLesson: {
                        connect: {
                            id: testId
                        }
                    }
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async deleteTestQuestion(id: number) {
        try {
            const res = await this.databaseService.testQuestion.delete({
                where: {
                    id
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async getTestQuestionVariant() {
        const res = await this.databaseService.testQuestionVariant.findMany()
        return res
    }

    async addTestQuestionVariant(moduleId: number, dto: addTestQuestionVariant) {
        try {
            const res = await this.databaseService.testQuestionVariant.create({
                data: {
                    ...dto,
                    testQuestion: {
                        connect: {
                            id: moduleId
                        }
                    }
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async deleteTestQuestionVariant(id: number) {
        try {
            const res = await this.databaseService.testQuestionVariant.delete({
                where: {
                    id
                }
            })
            return res
        } catch (error) {
            return error
        }
    }
    // exam CRUD
    async getExam() {
        const res = await this.databaseService.examLesson.findMany()
        return res
    }

    async addExam(moduleId: number, dto: addExam) {
        try {
            const res = await this.databaseService.examLesson.create({
                data: {
                    ...dto,
                    module: {
                        connect: {
                            id: moduleId
                        }
                    }
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async deleteExam(id: number) {
        try {
            const res = await this.databaseService.examLesson.delete({
                where: {
                    id
                }
            })
            return res
        } catch (error) {
            return error
        }
    }
}
