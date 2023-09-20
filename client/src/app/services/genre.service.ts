import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

import { Genre } from '../types';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(protected http: HttpClient) {}
  private readonly url = "https://board-frenzy.onrender.com/api/genres/";

  getGenres(){
    return this.http.get<Genre[]>(this.url)
  }

}
