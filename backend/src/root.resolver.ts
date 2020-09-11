import {
  Args,
  Int,
  ResolveField,
  Parent,
  Resolver,
  Query,
} from '@nestjs/graphql';

@Resolver()
export class AuthorsResolver {
  constructor() {} // private postsService: PostsService, // private authorsService: AuthorsService,

  @Query((returns) => String)
  async test() {
    return 'asdassd';
  }
}
