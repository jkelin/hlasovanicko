import { Injectable } from '@nestjs/common';
import { Vote } from './models/vote.model';
import { v4 } from 'uuid';

@Injectable()
export class VotesService {
  private readonly votes: Vote[] = [];

  create(title: string) {
    const vote = new Vote();
    vote.id = v4();
    vote.title = title;

    this.votes.push(vote);

    return vote;
  }

  findAll(): Vote[] {
    return this.votes;
  }

  findById(id: string): Vote | undefined {
    return this.votes.find((x) => x.id === id);
  }
}
