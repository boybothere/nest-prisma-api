import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()

export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(LoggerMiddleware.name)
    use(req: Request, res: Response, next: (error?: any) => void) {
        const { method, url, ip } = req
        const userAgent = req.get('user-agent')

        this.logger.log(`
            [Incoming] ->  ${method} - ${url} - ${ip} - ${userAgent}    
        `)
        req['startTime'] = Date.now()

        res.on('finish', () => {
            const duration = Date.now() - req['startTime']
            const { statusCode } = res

            if (statusCode >= 500) {
                this.logger.error(`
                    [Response] ->  ${method} - ${url} - ${statusCode} - ${duration} ms    
                `)
            } else if (statusCode >= 400) {
                this.logger.warn(`
                    [Response] ->  ${method} - ${url} - ${ip} - ${userAgent}    
                `)
            } else {
                this.logger.log(`
                    [Response] ->  ${method} - ${url} - ${statusCode} - ${duration} ms    
                `)
            }
        })
        next()
    }
}