import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdatePollOptionArgs {
  @Field({ nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  index?: number;
}
