import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

import { BoardGame, BoardGameCreate } from '../types';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BoardGameService {

  constructor(protected http: HttpClient) { }

  private readonly url = "/api/boardGame/";

  getBoardGames() : Observable<BoardGame[]>{
    return this.http.get<BoardGame[]>(this.url)
  }

  getBoardGame(boardGameId: string){
    return this.http.get<BoardGame>(`${this.url}${boardGameId}`);
  }

  createBoardGame(boardGame: BoardGameCreate){
    this.http.post<BoardGameCreate>(
      this.url, boardGame
    ).subscribe((res: BoardGameCreate) => {
      console.log(res);
    });
  }

  updateBoardGame(boardGameId: string, boardGame: BoardGameCreate){ 
    this.http.patch<BoardGameCreate>(
      `${this.url}${boardGameId}`, boardGame
    ).subscribe((res: BoardGameCreate) => {
      console.log(res);
    });
  }

  deleteBoardGame(boardGameId: string){
    this.http.delete<{}>(
      `${this.url}${boardGameId}`
    ).subscribe((res: {}) => {
      console.log(res);
    });
  }

}
