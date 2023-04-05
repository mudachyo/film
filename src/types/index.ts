export interface IFilm {
    id: number;
    kinopoisk_id: number;
    name_russian: string;
    rating_imdb: number;
    age_restriction: string;
    description: string;
    year: string;
    country_ru: string;
    big_poster: string;
    time_minutes: number;
    persons: IFilmPerson[]
}

interface IFilmPerson {
    name_russian: string;
    profession: {
        profession_id: 'producer' | 'actor' | 'director'
    }
}


export interface IFilmResponse {
    current_page: number;
    data: IFilm[]
}

export interface IFilmResponseKP {
    totalPages: number;
    items: IFilmKP[]
}

export interface IFilmResponsePopular {
    pagesCount: number;
    films: IFilmPopular[]
}
export interface IFilmPopular {
    filmId: number;
    nameRu: string;
    year: number;
    countries: {country: string}[]
    rating: number;
    posterUrl: string;
}

export interface IFilmKP {
    kinopoiskId: number;
    nameRu: string;
    posterUrl: string;
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid corporis eius ipsum repudiandae sapiente sint unde voluptate. Accusantium, architecto autem consectetur dolor ea est expedita itaque nulla perferendis repellat, sed?'
    ratingImdb: number;
    countries: {country: string}[]
    year: number;
}
export interface IGenresAndCountries {
    genres: {id: number, genre: string}[];
    countries: {id: number; country: string}[]
}

export interface SelectedGenresAndCountries {
    genres: number[];
    countries: number[];
    sort: string;
}


