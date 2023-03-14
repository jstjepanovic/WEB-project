import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

import { Genre } from '../types';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(protected http: HttpClient) { 
    this.getGenres();
  }

  genres: BehaviorSubject<Genre[]> = new BehaviorSubject<Genre[]>([]);

  getGenres(){
    this.http.get<Genre[]>('/api/genres/')
      .subscribe((genre: Genre[])=>{
        this.genres.next(genre);
      });
  }


}
