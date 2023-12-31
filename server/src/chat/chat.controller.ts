import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { createChat } from './dto/create-chat.dto';
import { addMessage } from './dto/add-message.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('chat')
@ApiTags('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Return chats'})
    async getChats() {
        const res = this.chatService.getChats()
        return res
    }

    @Get('usersOnChat')
    @ApiResponse({ status: 200, description: 'Return usersOnChat'})
    async UsersOnChat() {
        const res = this.chatService.getUsersOnChat()
        return res
    }

    @Post('createChat')
    @ApiResponse({ status: 200, description: 'Return chat'})
    @UsePipes(new ValidationPipe())
    async createChat(@Body() dto: createChat) {
        const res = this.chatService.createChat(dto)
        return res
    }

    @Delete('deleteChat/:id')
    @ApiResponse({ status: 200, description: 'Return chat'})
    async deleteChat(@Param('id') id: number) {
        const res = this.chatService.deleteChat(+id)
        return res
    }

    @Get('messages')
    @ApiResponse({ status: 200, description: 'Return messages'})
    async getMessages() {
        const res = this.chatService.getMessages()
        return res
    }

    @Post('addMessage')
    @ApiResponse({ status: 200, description: 'Return message'})
    @UsePipes(new ValidationPipe())
    async addMessage(@Body() dto: addMessage) {
        const res = this.chatService.addMessage(dto)
        return res
    }

    @Delete('deleteMessage/:id')
    @ApiResponse({ status: 200, description: 'Return message'})
    async deleteMessage(@Param('id') id: number) {
        const res = this.chatService.deleteMessage(+id)
        return res
    }
}
