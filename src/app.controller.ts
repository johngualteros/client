import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { BookDTO } from './book';

@Controller('booksstore')
export class AppController {
  constructor(@Inject('BOOKS_SERVICE') private client: ClientProxy) {}

  @Get()
  getAllBooks() {
    return this.client.send({cmd: 'get_books'}, {})
  }

  @Get(':id')
  getBookByID(@Param('id') id ) {
    return this.client.send({cmd: 'get_book'}, id)
  }

  @Post()
  createNewBook(@Body() book: BookDTO) {
    return this.client.send({cmd: 'new_book'}, book)
  }
}