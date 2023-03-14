import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

import { BoardGame, BoardGameCreate } from '../types';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BoardGameService {

  constructor(protected http: HttpClient) { 
    this.getBoardGames();
  }

  private readonly url = "/api/boardGame/";

  boardGames: BehaviorSubject<BoardGame[]> = new BehaviorSubject<BoardGame[]>([]);

  getBoardGames(){
    this.http.get<BoardGame[]>(this.url)
      .subscribe((boardGame: BoardGame[])=>{
        this.boardGames.next(boardGame);
      });
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
