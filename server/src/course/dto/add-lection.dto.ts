import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class addLection {
    @IsString()
    @ApiProperty()
    lessonName: string

    @IsNumber()
    @ApiProperty()
    @Type(() => Number)
    queueNumber: number

    @IsString()
    @ApiProperty()
    homeworkName: string

    @IsString()
    @ApiProperty()
    homeworkDesription: string
}