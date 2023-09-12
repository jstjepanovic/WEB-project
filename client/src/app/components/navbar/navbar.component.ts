import { Component, OnDestroy, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  isMenuCollapsed: boolean = true;
  isAuthenticated: boolean = false;
  private AuthenticatedSub!: Subscription;
  userId: string = '';
  
  constructor(private userService: UserService, private jwtHelper: JwtHelperService){}
  
  ngOnDestroy(): void {
    this.AuthenticatedSub.unsubscribe();
  }
    
  ngOnInit(): void {
    this.isAuthenticated = this.userService.getIsAuthenticated();
    this.AuthenticatedSub = this.userService.getAuthenticatedSub().subscribe(status =>{
      this.isAuthenticated = status;
    })
    
    this.userService.getTokenChanges().subscribe((token) => {
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        this.userId = decodedToken._id;
      }
    });
  }

  logout(){
    this.userService.logout();
  }

}
