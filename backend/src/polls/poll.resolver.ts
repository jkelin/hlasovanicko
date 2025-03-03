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
import { PollOptionsService } from 'src/pollOptions/pollOptions.service';
import { Poll } from './poll.entity';
import { PollsService } from './polls.service';
import { UpdatePollArgs } from './args.entity';
import { orderBy } from 'lodash';

@Resolver(() => Poll)
export class PollResolver {
  constructor(
    private pollService: PollsService,
    private pollOptionsService: PollOptionsService,
  ) {}

  @ResolveField(() => Poll)
  async options(@Parent() parent: Poll) {
    const options =
      parent.options ||
      (await this.pollOptionsService.findForPoll(parent.id)) ||
      [];

    return orderBy(options, (x) => x.index);
  }

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

  @Mutation((returns) => Poll)
  async updatePollOptionOrders(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args({ name: 'options', type: () => [ID] }) options: string[],
  ) {
    return this.pollService.updateOptionsOrder(id, options);
  }
}
