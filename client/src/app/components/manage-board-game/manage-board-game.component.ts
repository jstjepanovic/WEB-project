import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { BoardGameService } from 'src/app/services/board-game.service';
import { GenreService } from 'src/app/services/genre.service';
import { BoardGameCreate, Genre } from 'src/app/types';

@Component({
  selector: 'app-manage-board-game',
  templateUrl: './manage-board-game.component.html',
  styleUrls: ['./manage-board-game.component.scss']
})
export class ManageBoardGameComponent implements OnInit {

  constructor( protected bgService: BoardGameService, protected genreService: GenreService, private router: Router ){}

  genres : Genre[] = [];

  ngOnInit(): void {
    this.genreService.getGenres().subscribe(
      (data) => {
        this.genres = data;
      },
      (error) => {
        console.error('Error fetching elements:', error);
      }
    );
  }

  form: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    age: new FormControl("", [Validators.required]),
    avgPlayingTime: new FormControl("", [Validators.required]),
    publisher: new FormControl("", [Validators.required]),
    noPlayersMin: new FormControl("", [Validators.required]),
    noPlayersMax: new FormControl("", [Validators.required]),
    genreIds: new FormControl("", [Validators.required])
  });

  submitForm() {
    let boardGame: BoardGameCreate = this.form.value;
    boardGame.rating = 0, boardGame.weight = 0;
    this.form.reset();
    
    this.bgService.createBoardGame(boardGame);
    this.router.navigate(['/browse']);

  }

}
