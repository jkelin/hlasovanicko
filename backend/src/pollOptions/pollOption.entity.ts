import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { Poll } from 'src/polls/poll.entity';
import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';

@ArgsType()
export class UpdateOptionArgs {
  @Field({ nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  order?: number;
}

@ObjectType()
@Entity()
export class PollOption {
  @PrimaryColumn({ type: 'uuid' })
  @Field((type) => String)
  id: string;

  @Column({ default: '' })
  @Field(() => String)
  title: string;

  @ManyToOne((type) => Poll, (poll) => poll.options)
  @Field(() => Poll)
  poll?: Poll;

  @Column({ default: 0 })
  @Field(() => Int)
  index: number;
}
