import { Module } from "@nestjs/common";
import { UserEventsService } from "./user-events.service";
import { UserRegisteredListener } from "./listeners/user-registered.listener";
import { UserLoginListener } from "./listeners/user-login.listener";

@Module({
    imports: [],
    providers: [UserEventsService, UserRegisteredListener, UserLoginListener],
    controllers: [],
    exports: [UserEventsService]
})

export class EventsModule { }