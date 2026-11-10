import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/transaction.dto';
import { ApiResponse } from '@nestjs/swagger';
import { TransactionResponseDto } from './dto/transaction.response.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Create and return a new transaction',
    type: TransactionResponseDto,
  })
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return await this.transactionsService.createTransaction(
      createTransactionDto,
    );
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Return a list of all transactions',
    type: TransactionResponseDto,
    isArray: true,
  })
  async returnAllTransactions() {
    return await this.transactionsService.returnAllTransactions();
  }
}
