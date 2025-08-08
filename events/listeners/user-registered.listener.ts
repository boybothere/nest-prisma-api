import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { UserRegisteredInterface } from "events/user-events.service";

@Injectable()
export class UserRegisteredListener {

    private readonly logger = new Logger(UserRegisteredListener.name)

    @OnEvent('user.registered')
    handleUserRegistered(event: UserRegisteredInterface) {
        this.logger.log(`
            Account's username => ${event.userDetails.username}
            Registration time => ${event.timestamp.toISOString()}
        `)
    }
}