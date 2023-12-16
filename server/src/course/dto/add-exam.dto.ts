import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class addExam {
    @IsString()
    @ApiProperty()
    lessonName: string
    
    @IsNumber()
    @ApiProperty()
    @Type(() => Number)
    queueNumber: number
    
    @IsString()
    @ApiProperty()
    @IsOptional()
    header: string
    
    @IsString()
    @ApiProperty()
    @IsOptional()
    text: string
    
    @IsString()
    @ApiProperty()
    homeworkName: string
    
    @IsString()
    @ApiProperty()
    homeworkDesription: string
}