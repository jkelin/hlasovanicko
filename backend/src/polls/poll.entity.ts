import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { PollOption } from 'src/pollOptions/pollOption.entity';
import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Poll {
  @PrimaryColumn({ type: 'uuid' })
  @Field((type) => String)
  id: string;

  @Column()
  @Index({ unique: true })
  @Field()
  slug: string;

  @Column({ default: true })
  @Field()
  isNew: boolean;

  @Column({ default: false })
  @Field()
  isActive: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  title?: string;

  @OneToMany((type) => PollOption, (option) => option.poll)
  @Field(() => [PollOption])
  options?: PollOption[];
}
