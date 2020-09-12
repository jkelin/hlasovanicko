import {
  Args,
  Int,
  ResolveField,
  Parent,
  Resolver,
  Query,
  Mutation,
  ID,
} from '@nestjs/graphql';
import { Vote } from './models/vote.model';
import { VotesService } from './votes.service';

@Resolver()
export class VoteResolver {
  constructor(private votesService: VotesService) {}

  @Query((returns) => Vote)
  async vote(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.votesService.findById(id);
  }

  @Mutation((returns) => Vote)
  async createVote(@Args({ name: 'title', type: () => String }) title: string) {
    return this.votesService.create(title);
  }
}
