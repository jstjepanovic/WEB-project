import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UserGet } from 'src/app/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userId: string = '';
  user: UserGet | null = null;
  private sub!: Subscription;

  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService){}
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.userId = String(params['userId']);
      this.userService.getUser(this.userId).subscribe((data) =>{
        this.user = data;
      })
    })
    
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      this.userService.uploadAvatar(this.userId, this.selectedFile).subscribe(
        (response: any) => {
          console.log('Avatar uploaded successfully', response);
          // Handle success, e.g., update the user's avatar URL
        },
        (error) => {
          console.error('Error uploading avatar', error);
          // Handle error
        }
      );
    }
  }

} 
