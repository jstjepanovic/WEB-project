import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { ReviewProfile, UserGet } from 'src/app/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userId: string = '';
  user: UserGet | null = null;
  reviews: ReviewProfile[] = [];
  private sub!: Subscription;

  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService, private reviewService: ReviewService){}
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.userId = String(params['userId']);
      this.userService.getUser(this.userId).subscribe((data) =>{
        this.user = data;
      })
      this.reviewService.getUserReviews(this.userId).subscribe((rew) =>{
        this.reviews = rew;
      })
    })
    
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }

  onSubmit() {
    if (this.selectedFile) {
      this.userService.uploadAvatar(this.userId, this.selectedFile).subscribe(
        (response: any) => {
          console.log('Avatar uploaded successfully', response);
        },
        (error) => {
          console.error('Error uploading avatar', error);
        }
      );
      window.location.reload();
    }
  }

} 
