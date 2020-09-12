import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@ArgsType()
export class UpdatePollArgs {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  isActive?: boolean;
}

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
}
