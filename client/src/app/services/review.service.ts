import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { Review, ReviewCreate } from '../types';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(protected http: HttpClient) { }

  private readonly url = "/api/review/";

  getAllReviews() : Observable<Review[]>{
    return this.http.get<Review[]>(this.url)
  }

  getReviews(boardGameId: string){
    return this.http.get<Review[]>(`${this.url}${boardGameId}`);
  }

  createReview(review: ReviewCreate){
    this.http.post<ReviewCreate>(
      this.url, review
    ).subscribe((res: ReviewCreate) => {
      console.log(res);
    });
  }

}
