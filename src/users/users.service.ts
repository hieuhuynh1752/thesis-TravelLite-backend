import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  // ✅ Create User
  async createUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: { email, password: hashedPassword, role: UserRole.USER },
    });
  }

  // ✅ Find User by Email
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  // ✅ Find User by ID
  async findById(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const { password, ...userData } = user; // Exclude password
    return userData;
  }

  // ✅ Get All Users
  async findAll() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });
    return users;
  }
}
