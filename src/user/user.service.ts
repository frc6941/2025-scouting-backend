import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { Role, User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async isUserExistByFeishuId(feishuId: string): Promise<boolean> {
    return await this.userRepository.existsBy({
      feishuId,
    });
  }

  async getUserRoleByFeishuId(feishuId: string): Promise<Role[] | undefined> {
    const user = await this.userRepository.findOneBy({
      feishuId,
    });
    return user?.roles;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async getUserByFeishuId(feishuId: string): Promise<User | null> {
    return await this.userRepository.findOneBy({
      feishuId,
    });
  }

  async findOne(options: FindOneOptions<User>): Promise<User | undefined> {
    const user = await this.userRepository.findOne(options);
    return user || undefined;
  }

  async createUser(
    name: string,
    openId: string,
    avatarUrl: string,
    roles: Role[],
  ): Promise<void> {
    const user = this.userRepository.create();
    user.roles = roles;
    user.name = name;
    user.feishuId = openId;
    user.avatar = avatarUrl;
    await this.userRepository.save(user);
  }
}
