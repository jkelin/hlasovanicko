import { Injectable } from '@nestjs/common';
import { Poll } from './poll.entity';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Connection, Repository } from 'typeorm';
import humanId from 'human-id';
import { PollOption } from 'src/pollOptions/pollOption.entity';
import { orderBy } from 'lodash';

@Injectable()
export class PollsService {
  constructor(
    @InjectRepository(Poll)
    private pollRepository: Repository<Poll>,
    @InjectRepository(PollOption)
    private optionRepository: Repository<PollOption>,
    private connection: Connection,
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

  async findById(pollId: string) {
    return await this.pollRepository.findOne({ where: { id: pollId } });
  }

  async findBySlug(pollSlug: string) {
    return await this.pollRepository.findOne({ where: { slug: pollSlug } });
  }

  async update(pollId: string, update: Partial<Poll>) {
    const poll = await this.pollRepository.findOne({ where: { id: pollId } });

    if (!poll) {
      return new Error('Poll not found');
    }

    await this.connection.transaction(async (manager) => {
      if (typeof update.title !== undefined) {
        poll.title = update.title;
      }

      await manager.save(poll);
    });

    return poll;
  }

  async updateOptionsOrder(pollId: string, options: string[]) {
    const poll = await this.pollRepository.findOne({
      where: { id: pollId },
      relations: ['options'],
    });

    if (!poll) {
      return new Error('Poll not found');
    }

    await this.connection.transaction(async (manager) => {
      options.forEach((id, i) => {
        const option = poll.options.find((x) => x.id === id);
        option.index = i;
      });

      await manager.save(poll.options);
    });

    return poll;
  }
}
