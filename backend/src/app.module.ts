import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
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
      entities: [Poll],
      synchronize: true,
      logging: 'all',
    }),
    TypeOrmModule.forFeature([Poll]),
  ],
  providers: [PollsService, PollResolver],
})
export class AppModule {}
