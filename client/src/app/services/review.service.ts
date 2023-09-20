import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

import { ReviewBG, ReviewCreate, ReviewProfile } from '../types';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(protected http: HttpClient) {}

  private readonly url = "https://board-frenzy.onrender.com/api/review/";

  getAllReviews() : Observable<ReviewBG[]>{
    return this.http.get<ReviewBG[]>(this.url)
  }

  getReviews(boardGameId: string){
    return this.http.get<ReviewBG[]>(`${this.url}${boardGameId}`);
  }

  getUserReviews(userId: string){
    return this.http.get<ReviewProfile[]>(`https://board-frenzy.onrender.com/api/userreview/${userId}`);
  }

  createReview(review: ReviewCreate){
    this.http.post<ReviewCreate>(
      this.url, review
    ).subscribe((res: ReviewCreate) => {
      console.log(res);
    });
  }

}
