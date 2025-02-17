import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  // ✅ Register Route
  @Post('register')
  async register(
    @Body() body: { email: string; password: string; name?: string },
  ) {
    const existingUser = await this.usersService.findByEmail(body.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use.');
    }

    const newUser = await this.usersService.createUser(
      body.email,
      body.password,
      body.name,
    );
    return { message: 'User registered successfully', user: newUser };
  }

  // ✅ Login Route
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const { email, password } = body;
    if (!email || !password) {
      throw new UnauthorizedException('Email and password are required.');
    }
    const result = await this.authService.login(email, password);

    res.cookie('user_id', result.user.id, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json(result);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('user_id');
    return res.json({ message: 'Logged out successfully' });
  }

  @Get('me')
  getUser(@Req() req: Request, @Res() res: Response) {
    const userId = req.cookies?.user_id;

    if (!userId) {
      return res.status(401).json({ message: 'Not Authenticated' });
    }

    return res.json({ userId });
  }
}
