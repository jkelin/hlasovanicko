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
import { Poll } from 'src/polls/poll.entity';
import { PollsService } from 'src/polls/polls.service';
import { UpdatePollOptionArgs } from './args.entity';
import { PollOption } from './pollOption.entity';
import { PollOptionsService } from './pollOptions.service';

@Resolver(() => PollOption)
export class PollOptionResolver {
  constructor(
    private pollService: PollsService,
    private pollOptionsService: PollOptionsService,
  ) {}

  @ResolveField(() => Poll)
  async poll(@Parent() option: PollOption) {
    return option.poll || this.pollService.findById(option.id);
  }

  @Mutation((returns) => PollOption)
  async createPollOption(
    @Args({ name: 'pollId', type: () => ID }) pollId: string,
  ) {
    return this.pollOptionsService.create(pollId);
  }

  @Mutation((returns) => Poll)
  async deletePollOption(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.pollOptionsService.delete(id);
  }

  @Mutation((returns) => PollOption)
  async updatePollOption(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args() args: UpdatePollOptionArgs,
  ) {
    return this.pollOptionsService.updateOption(id, args);
  }
}
