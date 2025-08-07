import { Injectable } from '@nestjs/common';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UserIdExistsConstraint implements ValidatorConstraintInterface {
    constructor(private prisma: PrismaService) { }

    async validate(userIds: number[], validationArguments?: ValidationArguments): Promise<boolean> {

        try {
            const users = await this.prisma.user.findMany({
                where: {
                    id: { in: userIds }
                },
                select: { id: true }
            })
            return users.length === userIds.length
        } catch (err) {
            console.log(err);
            return false
        }
    }

    defaultMessage(): string {
        return 'One or more user IDs do not exist.';
    }
}
