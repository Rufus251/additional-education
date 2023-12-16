import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class addModuleVideoLection {

    @IsNumber()
    @ApiProperty()
    @Type(() => Number)
    queueNumber: number

    @IsString()
    @ApiProperty()
    lessonName: string

    @IsString()
    @ApiProperty()
    descriptionHeader: string

    @IsString()
    @ApiProperty()
    descriptionContent: string

    @IsString()
    @ApiProperty()
    homeworkName: string

    @IsString()
    @ApiProperty()
    homeworkDesription: string
}