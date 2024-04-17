import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request, Response } from "express";
import { Observable, map } from "rxjs";

export class ResponseIntercept implements NestInterceptor{
    constructor(private readonly reflector:Reflector){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(map(value => {
            const msg = this.reflector.get("aksjko2u3qwdhkq3r28wv98e",context.getHandler())
            console.log(value)
            return {
                message:msg ?? null,
                data:value
            }
        }))
    }
}