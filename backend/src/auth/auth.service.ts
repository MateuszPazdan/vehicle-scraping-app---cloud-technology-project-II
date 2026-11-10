import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.userService.getUser({ email });
      const authenticated = await bcrypt.compare(password, user.hashedPassword);
      if (!authenticated) throw new UnauthorizedException();
      return user;
    } catch {
      throw new UnauthorizedException('Niepoprawne dane uwierzytelniające');
    }
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async register(dto: AuthDto) {
    if (dto.adminKey !== process.env.ADMIN_KEY)
      throw new UnauthorizedException();
    const hashedPassword = await this.hashData(dto.password);
    await this.prisma.user.create({
      data: {
        email: dto.email,
        hashedPassword: hashedPassword,
        isAdmin: dto.adminKey === process.env.ADMIN_KEY,
      },
    });
  }

  login(user: User, response: Response) {
    const expirationMs = parseInt(
      this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_EXPIRATION_MS'),
    );
    const expiresAccessToken = new Date();
    expiresAccessToken.setTime(expiresAccessToken.getTime() + expirationMs);

    const tokenPayload: TokenPayload = {
      userId: user.id.toString(),
    };
    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${expirationMs}ms`,
    });

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresAccessToken,
    });
  }

  verifyToken() {
    return true;
  }

  logout(response: Response) {
    response.clearCookie('Authentication', {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
    });
  }
}
