import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { error } from "console";
import { Observable, tap } from "rxjs";

@Injectable()

export class LoggerInterceptor implements NestInterceptor {

    private readonly logger = new Logger(LoggerInterceptor.name)
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const { method, url } = context.switchToHttp().getRequest()
        this.logger.log(`Incoming request => METHOD ${method} URL ${url}`)

        const startTime = Date.now()
        return next
            .handle()
            .pipe(
                tap({
                    next: () => {
                        const endTime = Date.now()
                        this.logger.log(`Request completed in ${endTime - startTime} ms
                        METHOD ${method} URL ${url}`)
                    },
                    error: (error) => {
                        const endTime = Date.now()
                        this.logger.error(`Request failed in ${endTime - startTime} ms
                        METHOD ${method} URL ${url} ERROR ${error.message}`)
                    }
                })
            )
    }
}