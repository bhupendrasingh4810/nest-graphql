import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import {
    Field,
    ID,
    ObjectType,
} from '@nestjs/graphql';

import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';
import { Vehicle } from 'src/modules/vehicles/entities/vehicle.entity';

/**
 * Marks this class as a database table.
 *
 * Table Name:
 * users
 */
@Entity({
    name: 'users',
})

/**
 * Exposes this class as a GraphQL Object Type.
 */
@ObjectType()
export class User {
    /**
     * Auto increment primary key.
     *
     * Example:
     * 1
     * 2
     * 3
     */
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * Full name of the user.
     */
    @Field()
    @Column({
        length: 100,
    })
    fullName!: string;

    /**
     * Email address.
     *
     * Must always be unique.
     */
    @Field()
    @Column({
        unique: true,
        length: 255,
    })
    email!: string;

    /**
     * Hashed password.
     *
     * Never expose in GraphQL.
     */
    @Column({
        length: 255,
    })
    password!: string;

    /**
     * User role.
     */
    @Field(() => UserRole)
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.CUSTOMER,
    })
    role!: UserRole;

    /**
     * Account status.
     */
    @Field(() => UserStatus)
    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.ACTIVE,
    })
    status!: UserStatus;

    /**
     * Whether user's email is verified.
     */
    @Field()
    @Column({
        default: false,
    })
    isEmailVerified!: boolean;

    // bidirectional relationship between User and Vehicle. While that's valid, exposing every relationship in GraphQL can easily create cyclic object graphs (for example, User → Vehicle → User → Vehicle...) and unnecessary queries.
    /**
 * Vehicles owned by the user.
 */
    // @Field(() => [Vehicle])
    // @OneToMany(
    //     () => Vehicle,
    //     (vehicle: Vehicle) => vehicle.owner,
    // )
    // vehicles!: Vehicle[];

    /**
     * Last successful login.
     */
    @Field({
        nullable: true,
    })
    @Column({
        type: 'timestamp',
        nullable: true,
    })
    lastLoginAt?: Date;

    /**
     * Automatically populated when record is created.
     */
    @Field()
    @CreateDateColumn()
    createdAt!: Date;

    /**
     * Automatically updated whenever entity changes.
     */
    @Field()
    @UpdateDateColumn()
    updatedAt!: Date;
}