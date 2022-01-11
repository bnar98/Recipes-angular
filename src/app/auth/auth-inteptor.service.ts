import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http'
import { AuthServiceService } from "./auth-service.service";
import { exhaustMap, take } from "rxjs";
@Injectable()

export class interceptorService implements HttpInterceptor {

    constructor(private authService: AuthServiceService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap((user) => {

                const modifiedReq = req.clone({ params: new HttpParams().set('auth', user?.token ? user.token : "") })
                return next.handle(modifiedReq);
            }))
    }
}