import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { PollOption } from './pollOptions/pollOption.entity';
import { PollOptionResolver } from './pollOptions/pollOption.resolver';
import { PollOptionsService } from './pollOptions/pollOptions.service';
import { Poll } from './polls/poll.entity';
import { PollResolver } from './polls/poll.resolver';
import { PollsService } from './polls/polls.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      // typePaths: [join(__dirname, '../../shared/schema/**/*.gql')],
      // definitions: {
      //   path: join(__dirname, 'graphql.ts'),
      // },
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.PG_URI,
      entities: [Poll, PollOption],
      synchronize: true,
      logging: 'all',
    }),
    TypeOrmModule.forFeature([Poll, PollOption]),
  ],
  providers: [
    PollsService,
    PollOptionsService,
    PollResolver,
    PollOptionResolver,
  ],
})
export class AppModule {}
