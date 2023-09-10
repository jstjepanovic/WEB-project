import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BoardGameService } from 'src/app/services/board-game.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { BoardGame, Review, ReviewCreate } from 'src/app/types';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.scss']
})
export class BoardGameComponent implements OnInit, OnDestroy {
  boardGameId: string = '';
  reviews: Review[] = [];
  boardGame: BoardGame | null = null
  numbersRating: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  numbersWeight: number[] = Array.from({ length: 5 }, (_, i) => i + 1);
  toReview = true;
  isAuthenticated: boolean = false;
  private AuthenticatedSub!: Subscription;

  constructor(private route: ActivatedRoute, protected reviewService: ReviewService,
              protected boardGameService: BoardGameService, protected userService: UserService) {
    this.boardGameId = this.route.snapshot.queryParamMap.get('boardGameId')!;
  }

  ngOnDestroy(): void {
    this.AuthenticatedSub.unsubscribe();
  }

  ngOnInit(): void {
    this.reviewService.getReviews(this.boardGameId).subscribe(
      (data) => {
        this.reviews = data;
        this.boardGameService.getBoardGame(this.boardGameId).subscribe(
          (data) => {
            this.boardGame = data;
          }
        )
      },
      (error) => {
        console.error('Error fetching elements:', error);
      }
    );

    this.AuthenticatedSub = this.userService.getAuthenticatedSub().subscribe(status =>{
      this.isAuthenticated = status;
    })

    this.isAuthenticated = this.userService.getIsAuthenticated();

  }

  addReview() {
    this.toReview = !this.toReview;
  }

  form: FormGroup = new FormGroup({
    text: new FormControl("", [Validators.required]),
    rating: new FormControl("", [Validators.required]),
    weight: new FormControl("", [Validators.required])
  });

  submitForm() {
    let newReview: ReviewCreate = this.form.value;
    this.form.reset();
    
    this.reviewService.createReview(newReview)

  }

}
