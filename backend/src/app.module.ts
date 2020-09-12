import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { VoteResolver } from './votes/vote.resolver';
import { VotesService } from './votes/votes.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      // typePaths: [join(__dirname, '../../shared/schema/**/*.gql')],
      // definitions: {
      //   path: join(__dirname, 'graphql.ts'),
      // },
      autoSchemaFile: true,
    }),
  ],
  providers: [VotesService, VoteResolver],
})
export class AppModule {}
