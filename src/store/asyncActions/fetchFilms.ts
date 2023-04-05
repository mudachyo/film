import axios from "axios";
import { AppDispatch } from "..";
import {
    IGenresAndCountries,
    IFilmResponse,
    IFilmResponseKP,
    IFilmResponsePopular,
    SelectedGenresAndCountries,
} from "types";
import {filmSlice} from "../reducers/FilmSlice";
import {$kpToken} from "http/index";



export const fetchFilms = (page: number, filter: SelectedGenresAndCountries = {} as SelectedGenresAndCountries) => async (dispatch: AppDispatch) => {
    try {
        dispatch(filmSlice.actions.filmsFetching())
        const {data: dataFilms} = await $kpToken.get<IFilmResponseKP>(`https://kinopoiskapiunofficial.tech/api/v2.2/films?${filter?.genres && filter.genres.map(el => `genres=${el}&`)}${filter?.countries && filter.countries.map(el => `countries=${el}&`)}order=${filter.sort ? filter.sort : 'RATING'}&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=2022&page=${page}`)
        dispatch(filmSlice.actions.filmsFetchingSuccess(dataFilms.items))
        dispatch(filmSlice.actions.setPageCount(dataFilms.totalPages))
    } catch (e: any) {
        dispatch(filmSlice.actions.filmsFetchingError(e?.message))
    }
}

export const fetchGenresAndCountries = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(filmSlice.actions.fetchingGenresAndCountries())
        const {data} = await $kpToken.get<IGenresAndCountries>('https://kinopoiskapiunofficial.tech/api/v2.2/films/filters')
        dispatch(filmSlice.actions.fetchGenresAndCountriesSuccess(data))
    } catch (e: any) {
        dispatch(filmSlice.actions.filmsFetchingError(e?.message))
    }
}

export const fetchOneFilm = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(filmSlice.actions.fetchOne())
        const {data} = await axios.get<IFilmResponse>(`https://kinobd.ru/api/films/search/kp_id?q=${id}`)
        dispatch(filmSlice.actions.fetchOneSuccess(data.data[0]))
    } catch (e: any) {
        dispatch(filmSlice.actions.filmsFetchingError(e?.message))
    }
}

export const fetchSearchFilms = (title: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(filmSlice.actions.filmsSearchFetching())
        const {data} = await $kpToken.get<IFilmResponseKP>(`https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&keyword=${title}&page=1`)
        dispatch(filmSlice.actions.filmsSearchSuccess(data.items))
    } catch (e: any) {
        dispatch(filmSlice.actions.filmsFetchingError(e?.message))
    }
}


export const fetchPopularFilms = (page: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(filmSlice.actions.filmsFetching())
        const {data} = await $kpToken.get<IFilmResponsePopular>(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`)
        dispatch(filmSlice.actions.fetchPopularFilms(data.films))
    } catch (e: any) {
        dispatch(filmSlice.actions.filmsFetchingError(e?.message))
    }
}
