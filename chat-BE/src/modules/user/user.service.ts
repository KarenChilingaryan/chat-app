import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({ ...createUserDto });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);
    return user.update(updateUserDto);
  }

  async findUserById(id: string): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ where: { username } });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
  async searchUsersByName(name: string): Promise<User[]> {
    return this.userModel.findAll({
      where: {
        username: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }
}