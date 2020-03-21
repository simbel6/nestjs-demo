import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messagesService: MessageService) { }

  @Get(':page/:pageSize')
  list(@Param() param): Promise<any> {
    const { page, pageSize} = param
    return this.messagesService.list(page, pageSize);
  }

  @Post()
  async add(@Body() payload): Promise<any> {
      await this.messagesService.create(payload);
  }

  @Put()
  async update(@Body() payload): Promise<any> {
      await this.messagesService.update(payload);
  }

  @Put()
  async remove(@Body() payload): Promise<any> {
      await this.messagesService.delete(payload);
  }
}
