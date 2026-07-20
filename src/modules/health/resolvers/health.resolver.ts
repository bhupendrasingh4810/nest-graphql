import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HealthResolver {
    /**
     * Simple query used to verify that
     * GraphQL is working correctly.
     */
    @Query(() => String, {
        name: 'health',
        description: 'Returns application health status.',
    })
    health(): string {
        return 'Application is running.';
    }
}