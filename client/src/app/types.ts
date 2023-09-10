export interface BoardGame {
    _id: string,
    name: string,
    rating: number,
    weight: number,
    age: number,
    avgPlayingTime: number,
    publisher: string,
    noPlayersMin: number,
    noPlayersMax: number,
    genreIds: string[]
}

export interface BoardGameCreate {
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
    _id: string,
    name: string
}

export interface Review {
    _id: string,
    rating: number,
    weight: number,
    text: string,
    userId: string,
    boardGameId: string
}

export interface ReviewCreate {
    rating: number,
    weight: number,
    text: string,
    userId: string,
    boardGameId: string
}

export interface User {
    _id: string,
    username: string,
    password: string
}

export interface UserCreate {
    username: string,
    password: string
}