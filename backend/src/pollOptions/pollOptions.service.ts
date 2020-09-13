import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Connection, Repository } from 'typeorm';
import humanId from 'human-id';
import { PollOption } from './pollOption.entity';
import { Poll } from 'src/polls/poll.entity';

@Injectable()
export class PollOptionsService {
  constructor(
    @InjectRepository(Poll)
    private pollRepository: Repository<Poll>,
    @InjectRepository(PollOption)
    private optionRepository: Repository<PollOption>,
    private connection: Connection,
  ) {}

  async create(pollId: string) {
    const poll = await this.pollRepository.findOne({
      where: { id: pollId },
      relations: ['options'],
    });

    if (!poll) {
      return new Error('Poll not found');
    }

    const option = new PollOption();
    option.id = v4();
    option.poll = poll;
    option.index = poll.options.length;

    await this.connection.transaction(async (manager) => {
      await manager.save(poll);
      await manager.save(option);
    });

    return option;
  }

  async delete(optionId: string) {
    const pollOption = await this.optionRepository.findOne({
      where: { id: optionId },
      relations: ['poll'],
    });

    await this.optionRepository.remove(pollOption);

    const poll = pollOption.poll;

    return poll;
  }

  async updateOption(optionId: string, update: Partial<PollOption>) {
    const option = await this.optionRepository.findOne({
      where: { id: optionId },
    });

    if (!option) {
      return new Error('Poll option not found');
    }

    await this.connection.transaction(async (manager) => {
      if (update.title !== undefined) {
        option.title = update.title;
      }

      if (update.index !== undefined) {
        option.index = update.index;
      }

      await manager.save(option);
    });

    return option;
  }

  async findForPoll(pollId: string) {
    return this.optionRepository.find({
      where: { poll: { id: pollId } },
      order: { index: 'ASC' },
    });
  }
}
