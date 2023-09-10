import { Component, OnInit } from '@angular/core';
import { BoardGameService } from 'src/app/services/board-game.service';
import { GenreService } from 'src/app/services/genre.service';
import { BoardGame, Genre } from 'src/app/types';

@Component({
  selector: 'app-browse-board-games',
  templateUrl: './browse-board-games.component.html',
  styleUrls: ['./browse-board-games.component.scss']
})

export class BrowseBoardGamesComponent implements OnInit {
  boardGames: BoardGame[] = [];
  genres: Genre[] = [];
  boardGameName: string = '';
  modifiedBoardGames: any[] = [];

  constructor( protected bgService: BoardGameService, protected genreService: GenreService){}

  ngOnInit(): void {
    this.bgService.getBoardGames().subscribe(
      (data) => {
        this.boardGames = data;

        this.genreService.getGenres().subscribe(
          (data) => {

            this.genres = data;

            this.modifiedBoardGames = this.boardGames.map((game) => {
              const modifiedGame = { ...game };
              modifiedGame.genreIds = game.genreIds.map((genreId) =>
                this.genres.find((genre) => genre._id === genreId)?.name!
              );
              return modifiedGame;
            });
            
          },
          (error) => {
            console.error('Error fetching Genres:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching Board Games:', error);
      }
    );


  }

  

  replaceGenreIds() {
    
  }
}
