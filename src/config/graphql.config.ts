import { Injectable } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlOptionsFactory } from '@nestjs/graphql';

@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      // Tell NestJS to use Apollo Server
      driver: ApolloDriver,

      // Generate schema automatically
      autoSchemaFile: 'src/schema.gql',

      // Sort schema alphabetically
      sortSchema: true,

      // GraphQL endpoint
      path: '/graphql',

      // Enable playground
      // playground: true,

      // Allow introspection
      introspection: true,
    };
  }
}
