import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthorsResolver } from './root.resolver';

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
  controllers: [AppController],
  providers: [AppService, AuthorsResolver],
})
export class AppModule {}
