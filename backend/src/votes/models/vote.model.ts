import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Vote {
  @Field((type) => String)
  id: string;

  @Field({ nullable: false })
  title: string;
}
