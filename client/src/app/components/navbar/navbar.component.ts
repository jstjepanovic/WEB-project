import { Component, OnDestroy, OnInit } from '@angular/core';
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
  
  constructor(protected userService: UserService){}
  
  ngOnDestroy(): void {
    this.AuthenticatedSub.unsubscribe();
  }
    
  ngOnInit(): void {
    this.isAuthenticated = this.userService.getIsAuthenticated();
    this.AuthenticatedSub = this.userService.getAuthenticatedSub().subscribe(status =>{
      this.isAuthenticated = status;
    })
  }

  logout(){
    this.userService.logout();
  }

}
