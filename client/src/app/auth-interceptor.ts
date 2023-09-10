import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "./services/user.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(protected userService: UserService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.userService.getToken();

        if(!token){
            return next.handle(req);
        }
    
        const authRequest = req.clone({
            headers : req.headers.set('authorization', token)
        });

        return next.handle(authRequest);
    }

}