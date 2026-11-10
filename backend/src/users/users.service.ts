import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(query: Prisma.UserWhereInput) {
    const user = await this.prisma.user.findFirst({
      where: query,
    });
    if (!user) throw new NotFoundException('Użytkownik nieznaleziony');
    return user;
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }
}
