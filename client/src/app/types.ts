export interface BoardGame {
    boardGameId: string,
    rating: number,
    weight: number,
    age: number,
    avgPlayingTime: number,
    publisher: string,
    noPlayersMin: number,
    noPlayersMax: number,
    genreIds: string[]
}

export interface Genre {
    genreId: string,
    name: string
}

export interface Review {
    reviewId: string,
    rating: number,
    weight: number,
    text: string,
    userId: string,
    boardGameId: string
}

export interface User {
    userId: string,
    email: string,
    username: string,
    password: string
}