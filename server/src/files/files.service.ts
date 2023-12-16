import { Injectable } from '@nestjs/common';
import * as fs from "fs";;
import * as path from "path";
import * as uuid from "uuid"
@Injectable()
export class FilesService {

    async createFile(file: Express.Multer.File, extension: string) {
        try {
            const fileName = uuid.v4() + extension
            const filePath = path.resolve(__dirname, "..", "static")
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName
        } catch (error) {
            return error
        }
    }
    async createImageFile(file: Express.Multer.File) {
        try {
            return this.createFile(file, ".jpg")
        } catch (error) {
            return error
        }
    }

    async createMP4File(file: Express.Multer.File) {
        try {
            return this.createFile(file, ".mp4")
        } catch (error) {
            return error
        }
    }

    async createPDFFile(file: Express.Multer.File) {
        try {
            return this.createFile(file, ".pdf")
        } catch (error) {
            return error
        }
    }

}
