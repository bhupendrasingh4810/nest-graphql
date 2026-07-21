import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../../modules/users/repositories/user.repository';
import { UserRole } from '../../modules/users/enums/user-role.enum';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class UserSeeder {

    constructor(private readonly repository: UserRepository) { }

    async seed() {

        const admin = await this.repository.findByEmail('admin@parking.com');

        if (admin) return;

        await this.repository.save({
            fullName: 'System Admin',
            email: 'admin@parking.com',
            password: await bcrypt.hash(
                'Admin@123',
                10,
            ),
            role: UserRole.ADMIN,
        } as User);

        console.log('✔ Admin user created');
    }
}