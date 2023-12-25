import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Transform, Type } from 'class-transformer';
export class addCourse {

    @IsNumber()
    @ApiProperty()
    @Type(() => Number)
    authorId: number;

    @IsString()
    @ApiProperty()
    courseName: string;

    @IsNumber()
    @ApiProperty()
    @Type(() => Number)
    educationTypeId: number;

    @IsNumber()
    @ApiProperty()
    @Type(() => Number)
    facultyId: number;

    @IsNumber()
    @ApiProperty()
    @Type(() => Number)
    diplomTypeId: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({required: false})
    @Type(() => Number)
    coursesToAdditionalId: number;

    @IsNumber()
    @ApiProperty()
    @Type(() => Number)
    minHours: number;
}