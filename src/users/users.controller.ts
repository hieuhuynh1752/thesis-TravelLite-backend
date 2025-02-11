import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtStrategy } from '../auth/jwt/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ✅ Protected Route: Get the authenticated user's profile
  @UseGuards(JwtStrategy)
  @Get('me')
  async getProfile(@Request() req) {
    const userId = req.user.userId; // Retrieved from JWT payload
    return this.usersService.findById(userId);
  }

  // ✅ Protected Route: Get a specific user by ID (Admin can use this)
  @UseGuards(JwtStrategy)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  // ✅ Protected Route: Get all users (Can be restricted to admins if needed)
  @UseGuards(JwtStrategy)
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  // Delete User
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
