import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./services/user.service";
import { Injectable } from "@angular/core";

@Injectable()
export class RouteGuard implements CanActivate{
    
    constructor(protected userService: UserService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAuthenticated = this.userService.getIsAuthenticated();
        if (!isAuthenticated){
            this.router.navigate(['/login']);
        }

        return isAuthenticated;
    }
    
}