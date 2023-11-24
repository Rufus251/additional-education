import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserPhoneDto } from './dto/create-user-phone.dto';
import { AuthService } from './auth.service';
import { CreateUserEmailDto } from './dto/create-user-email.dto';
import { LoginUserPhone } from './dto/login-user-phone.dto';
import { LoginUserEmail } from './dto/login-user-email.dto';
import { CheckJwt } from './dto/check-jwt.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UsePipes(new ValidationPipe())
    @Post("createPhone")
    @HttpCode(201)
    @ApiResponse({ status: 201, description: 'Return user'})
    async createUserPhone(@Body() dto: CreateUserPhoneDto){
        const res = await this.authService.createUserPhone(dto)
        return res
    }

    @UsePipes(new ValidationPipe())
    @Post("createEmail")
    @ApiResponse({ status: 201, description: 'Return user'})
    @ApiResponse({ status: 403, description: 'Forbidden'})
    async createUserEmail(@Body() dto: CreateUserEmailDto){
        const res = await this.authService.createUserEmail(dto)
        return res
    }

    @Post("checkJwt")
    @ApiResponse({ status: 200, description: 'Return jwt + user'})
    async checkJwt(@Body() dto: CheckJwt){
        const res = await this.authService.checkJwt(dto)
        return res
    }

    @UsePipes(new ValidationPipe())
    @Post("loginPhone")
    @ApiResponse({ status: 200, description: 'Return user'})
    @ApiResponse({ status: 401, description: 'Incorrect password'})
    async loginPhone(@Body() dto: LoginUserPhone){
        const res = await this.authService.loginUserPhone(dto)
        return res
    }

    @UsePipes(new ValidationPipe())
    @Post("loginEmail")
    @ApiResponse({ status: 201, description: 'Return user'})
    @ApiResponse({ status: 401, description: 'Incorrect password'})
    @ApiResponse({ status: 404, description: 'User Not Found'})
    async loginEmail(@Body() dto: LoginUserEmail){
        const res = await this.authService.loginUserEmail(dto)
        return res
    }
}
