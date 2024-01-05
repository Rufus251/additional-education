import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class addBlogBlock {
    
    @IsString()
    @IsOptional()
    @ApiProperty({required: false})
    header: string
    
    @IsString()
    @IsOptional()
    @ApiProperty({required: false})
    text: string
}