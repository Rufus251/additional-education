import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { addVideoLection } from './dto/add-video-lection.dto';
import { changeVideolectionInfo } from './dto/change-video-lection-info.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class VideolectionService {
    constructor(private readonly databaseService: DatabaseService,
        private readonly fileService: FilesService) { }

    async getVideolections() {
        const res = await this.databaseService.videolections.findMany()
        return res
    }

    async addVideolection(userId: number, facultyId: number, dto: addVideoLection, file: Express.Multer.File) {
        try {
            const fileName = await this.fileService.createImageFile(file)
            const res = await this.databaseService.videolections.create({
                data: {
                    ...dto,
                    lectionImg: fileName,
                    Author: {
                        connect: {
                            id: userId
                        }
                    },
                    faculty: {
                        connect: {
                            id: facultyId
                        }
                    },
                    VideolectionInfo: {
                        create: {}
                    }
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async deleteVideolection(id: number) {
        try {
            const res = await this.databaseService.videolections.delete({
                where: {
                    id
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async getVideolectionInfos() {
        const res = await this.databaseService.videolectionInfo.findMany()
        return res
    }

    async changeVideolectionInfo(id: number, dto: changeVideolectionInfo, files: Array<Express.Multer.File>) {
        try {
            // two files, mp4 first, pdf second
            const videoUrl = await this.fileService.createMP4File(files[0])
            const diplomUrl = await this.fileService.createPDFFile(files[1])

            const res = await this.databaseService.videolectionInfo.update({
                where: {
                    id
                },
                data: {
                    ...dto,
                    videoLectionURL: videoUrl,
                    diplomForPass: diplomUrl
                }
            })
            return res
        } catch (error) {
            return error
        }
    }
}
