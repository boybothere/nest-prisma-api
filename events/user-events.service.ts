import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "generated/prisma";

export interface UserRegisteredInterface {
    userDetails: {
        id: number;
        username: string;
    },
    timestamp: Date
}
export interface UserLoginInterface {
    userDetails: {
        id: number;
        username: string;
    },
    timestamp: Date
}

@Injectable()
export class UserEventsService {
    constructor(private eventEmitter: EventEmitter2) { }
    emitUserRegistered(user: User): void {
        const userRegisteredEventData: UserRegisteredInterface = {
            userDetails: {
                id: user.id,
                username: user.username
            },
            timestamp: new Date()
        }

        this.eventEmitter.emit('user.registered', userRegisteredEventData)
    }

    emitUserLogin(user: User): void {
        const userLoginEventData: UserLoginInterface = {
            userDetails: {
                id: user.id,
                username: user.username
            },
            timestamp: new Date()
        }

        this.eventEmitter.emit('user.login', userLoginEventData)
    }
}