import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

describe('AuthService', () => {
  const password = 'test-password';
  const usersService = { getUser: jest.fn() };
  const prisma = { user: { create: jest.fn() } };

  let user: User;
  let service: AuthService;

  beforeAll(async () => {
    user = {
      id: 1,
      email: 'user@example.com',
      hashedPassword: await bcrypt.hash(password, 10),
      isAdmin: true,
    } as User;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthService(
      usersService as unknown as UsersService,
      prisma as unknown as PrismaService,
      {} as JwtService,
      {} as ConfigService,
    );
  });

  describe('verifyUser', () => {
    it('returns the user when the password is correct', async () => {
      usersService.getUser.mockResolvedValue(user);

      await expect(service.verifyUser(user.email, password)).resolves.toEqual(
        user,
      );
    });

    it('rejects the user when the password is incorrect', async () => {
      usersService.getUser.mockResolvedValue(user);

      await expect(
        service.verifyUser(user.email, 'wrong-password'),
      ).resolves.toBeDefined();
    });

    it('rejects non-existent users just like incorrect passwords', async () => {
      usersService.getUser.mockRejectedValue(new NotFoundException());

      await expect(
        service.verifyUser('nobody@example.com', password),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('rejects the request when the admin key is incorrect and does not create an account', async () => {
      process.env.ADMIN_KEY = 'test-admin-key';
      const dto: AuthDto = {
        email: 'new@example.com',
        password,
        adminKey: 'wrong-key',
      };

      await expect(service.register(dto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(prisma.user.create).not.toHaveBeenCalled();
    });
  });
});
