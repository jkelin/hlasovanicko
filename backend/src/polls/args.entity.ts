import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UpdatePollArgs {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  isActive?: boolean;
}
