import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(payload) {
    return await this.messageRepository.save(payload);
  }

  async update(payload) {
    const { id, ...rest } = payload;
    return await this.messageRepository.update({ id }, { ...rest });
  }

  async delete(id) {
    return await this.messageRepository.delete(id);
  }

  async list(page: number = 1, pageSize: number = 10): Promise<any> {
    const [data, total] = await this.messageRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        id: 'DESC',
      },
    });
    return { data, total };
  }
}
