import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class addTestQuestion {
    
    @IsString()
    @ApiProperty()
    questionType: string
    
    @IsNumber()
    @ApiProperty()
    @Type(() => Number)
    queueNumber: number
    
    @IsString()
    @ApiProperty()
    questionHeader: string
}