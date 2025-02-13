import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

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
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    if (!email || !password) {
      throw new UnauthorizedException('Email and password are required.');
    }

    return await this.authService.login(email, password);
  }
}
