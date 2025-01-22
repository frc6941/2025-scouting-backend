import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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
