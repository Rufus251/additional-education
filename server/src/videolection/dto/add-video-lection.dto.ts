import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class addVideoLection {
    @IsString()
    @ApiProperty()
    lectionName: string
}