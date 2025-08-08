import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { UserLoginInterface } from "events/user-events.service";

@Injectable()
export class UserLoginListener {

    private readonly logger = new Logger(UserLoginListener.name)

    @OnEvent('user.login')
    handleUserlogin(event: UserLoginInterface) {
        this.logger.log(`
            Account's username => ${event.userDetails.username}
            Login time => ${event.timestamp.toISOString()}
        `)
    }
}