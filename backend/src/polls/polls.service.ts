import { Injectable } from '@nestjs/common';
import { Poll } from './poll.entity';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import humanId from 'human-id';

@Injectable()
export class PollsService {
  constructor(
    @InjectRepository(Poll)
    private pollRepository: Repository<Poll>,
  ) {}

  async create() {
    const poll = new Poll();
    poll.id = v4();
    poll.slug = humanId({
      separator: '-',
      capitalize: false,
    });

    await this.pollRepository.insert(poll);

    return poll;
  }

  async findAll() {
    return await this.pollRepository.find();
  }

  async findById(id: string) {
    return await this.pollRepository.findOne({ where: { id } });
  }

  async findBySlug(slug: string) {
    return await this.pollRepository.findOne({ where: { slug } });
  }

  async update(id: string, update: Partial<Poll>) {
    const poll = await this.pollRepository.findOne({ where: { id } });

    if (!poll) {
      return new Error('Poll not found');
    }

    if (typeof update.title !== undefined) {
      poll.title = update.title;
    }

    await this.pollRepository.save(poll);

    return poll;
  }
}
