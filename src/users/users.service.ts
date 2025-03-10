import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  // Create User
  async createUser(email: string, password: string, name?: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: UserRole.USER,
        name: name ?? email,
      },
    });
  }

  // Find User by Email
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  // Find User by ID
  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        // Exclude password at the DB level
        id: true,
        name: true,
        email: true,
        role: true,
        eventsCreated: {
          include: {
            location: true,
            participants: {
              include: {
                user: {
                  select: { id: true, name: true, email: true, role: true }, // Select only necessary fields
                },
              },
            },
          },
        },
        eventsParticipated: {
          include: {
            event: {
              include: {
                location: true,
                creator: {
                  select: { id: true, name: true, email: true, role: true },
                },
                participants: {
                  include: {
                    user: {
                      select: { id: true, name: true, email: true, role: true },
                    },
                  },
                },
              },
            },
            travelPlan: true,
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user; // Excluded password
  }

  // ✅ Get All Users
  async findAll() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return users;
  }

  async updateUser(id: number, userData: { name?: string }) {
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) throw new Error('User not found');

    Object.assign(user, userData);
    return prisma.user.update({ where: { id }, data: user });
  }

  // Delete User
  async deleteUser(id: number) {
    return prisma.user.delete({ where: { id } });
  }
}
