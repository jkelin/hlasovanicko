import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UpdatePollOptionArgs {
  @Field({ nullable: true })
  title?: string;
}
