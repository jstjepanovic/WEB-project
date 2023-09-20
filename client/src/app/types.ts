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

export interface ReviewBG {
    _id: string,
    rating: number,
    weight: number,
    text: string,
    userId: string,
    boardGameId: string,
    creator: {username : string}[]
}

export interface ReviewProfile {
    _id: string,
    rating: number,
    weight: number,
    text: string,
    boardGame: {name : string}[]
}

export interface ReviewCreate {
    rating: number,
    weight: number,
    text: string,
    userId: string,
    boardGameId: string
}

export interface UserGet {
    username: string,
    imagePath: string,
}

export interface UserCreate {
    username: string,
    password: string,
    imagePath: string,
}