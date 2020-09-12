import {
  Args,
  Int,
  ResolveField,
  Parent,
  Resolver,
  Query,
  Mutation,
  ArgsType,
  Field,
  ID,
} from '@nestjs/graphql';
import { Poll, UpdatePollArgs } from './poll.entity';
import { PollsService } from './polls.service';

@Resolver()
export class PollResolver {
  constructor(private pollService: PollsService) {}

  @Query((returns) => Poll)
  async poll(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.pollService.findById(id);
  }

  @Query((returns) => Poll)
  async pollBySlug(@Args({ name: 'slug', type: () => ID }) slug: string) {
    return this.pollService.findBySlug(slug);
  }

  @Mutation((returns) => Poll)
  async createPoll() {
    return this.pollService.create();
  }

  @Mutation((returns) => Poll)
  async updatePoll(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args() args: UpdatePollArgs,
  ) {
    return this.pollService.update(id, args);
  }
}
