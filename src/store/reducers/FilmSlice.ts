import {
    IGenresAndCountries,
    IFilm,
    IFilmKP,
    IFilmPopular,
    SelectedGenresAndCountries
} from "types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface FilmState {
    films: {
        allFilms: IFilmKP[],
        searchFilms: IFilmKP[]
    }
    isLoading: boolean;
    error: string;
    filmInfo: IFilm
    page: number;
    pageCount: number;
    popularFilms: IFilmPopular[]
    genresAndCountries: IGenresAndCountries
    loadingGenresAndCountries: boolean
    selectedGenresAndCountries: SelectedGenresAndCountries
}

const initialState: FilmState = {
    films: {
        allFilms: [] as IFilmKP[],
        searchFilms: [] as IFilmKP[]
    },
    isLoading: false,
    error: '',
    filmInfo: {} as IFilm,
    page: 1,
    pageCount: 0,
    popularFilms: [] as IFilmPopular[],
    genresAndCountries: {} as IGenresAndCountries,
    loadingGenresAndCountries: false,
    selectedGenresAndCountries: {} as SelectedGenresAndCountries
}

export const filmSlice = createSlice({
    name: 'film',
    initialState,
    reducers: {
        filmsFetching(state) {
            state.error = ''
            state.isLoading = true
            state.films.allFilms = []
        },
        filmsFetchingSuccess(state, action: PayloadAction<IFilmKP[]>) {
            state.isLoading = false
            state.error = ''
            state.films.allFilms = action.payload
        },
        filmsSearchFetching(state) {
            state.isLoading = true
            state.error = ''
            state.films.searchFilms = [] as IFilmKP[]
        },
        filmsSearchSuccess(state, action: PayloadAction<IFilmKP[]>){
            state.isLoading = false
            state.error = ''
            state.films.searchFilms = action.payload
        },
        filmsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        fetchOne(state) {
            state.isLoading= true
            state.filmInfo = {} as IFilm
        },
        fetchOneSuccess(state, action: PayloadAction<IFilm>) {
            state.isLoading = false
            state.error = ''
            state.filmInfo = action.payload
        },
        fetchPopularFilms(state, action: PayloadAction<IFilmPopular[]>) {
            state.isLoading = false
            state.error = ''
            state.popularFilms = action.payload
        },
        fetchingGenresAndCountries(state) {
            state.loadingGenresAndCountries = true
        },
        fetchGenresAndCountriesSuccess(state, action: PayloadAction<IGenresAndCountries>) {
            state.genresAndCountries = action.payload
            state.loadingGenresAndCountries = false
        },
        setSelectedGenresAndCountries(state, action: PayloadAction<SelectedGenresAndCountries>) {
            state.selectedGenresAndCountries = action.payload
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload
            state.isLoading = false
        },
        setPage(state, action: PayloadAction<number>){
            state.page = action.payload
        }
    }
})

export default filmSlice.reducer
