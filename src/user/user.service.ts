import { Injectable } from '@nestjs/common';
import { CreateYDto } from './dto/create-y.dto';
import { UpdateYDto } from './dto/update-y.dto';
import { PrismaService } from '../config/db/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { hash } from 'bcrypt'

@Injectable()
export class YService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createYDto: CreateYDto) {
    const exitstUsername = await this.prisma.user.findFirst({ where: { username: createYDto.username } })

    if (exitstUsername) {
      throw new RpcException({
        statusCode: 409, message: 'Username already exists'
      });
    }
    const exitstphone = await this.prisma.user.findFirst({ where: { phone: createYDto.phone } })

    if (exitstphone) {
      throw new RpcException({
        statusCode: 409, message: 'Phone already exists'
      });
    }
    const hashedPass = await hash(createYDto.password, 7);
    const user = await this.prisma.user.create({ data: { ...createYDto, password: hashedPass } })
    return {
      id: user.id,
      username: user.username,
      phone: user.phone,
      role: user.role
    };
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        phone: true,
        role : true
      }
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new RpcException({
        statusCode: 404,
        massege : 'User not found'
      })
    }
    return {
      id: user.id,
      username: user.username,
      phone: user.phone,
      role: user.role
    };
  }

  async update(id: number, dto: UpdateYDto) {
    await this.findOne(id)
    
    const user = await this.prisma.user.update({
      where: { id },
      data: {
      ...dto,
      ...(dto?.password ? { password: await hash(dto.password, 7)} : {} )  
    }} );
    return {
      id: user.id,
      username: user.username,
      phone: user.phone,
      role: user.role,
    };;
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.user.delete({ where: { id } })
    return { isDeleted: true };
  }
}
