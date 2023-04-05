import React, {useEffect} from 'react';
import FilmItem from "./FilmItem/FilmItem";
import {useAppDispatch, useAppSelector} from "hooks/store";
import {fetchFilms, fetchSearchFilms} from "store/asyncActions/fetchFilms";
import Spinner from "./UI/Spinner/Spinner";
import {useParams} from 'react-router-dom';
import Pagination from "./UI/Pagination/Pagination";
import {filmSlice} from "store/reducers/FilmSlice";

const FilmList = () => {

    const dispatch = useAppDispatch()
    const {title, page: pageParams} = useParams()
    const {films, error, isLoading, selectedGenresAndCountries, pageCount, page} = useAppSelector(state => state.filmSlice)


    useEffect(() => {
        if(films.allFilms.length < 1) {
            dispatch(fetchFilms(page ? Number(page) : 1, selectedGenresAndCountries))
        }
    }, [])

    useEffect(() => {
        title && dispatch(fetchSearchFilms(title))
        if(Number(pageParams) && Number(pageParams) !== page) {
            dispatch(filmSlice.actions.setPage(Number(pageParams)))
            dispatch(fetchFilms(Number(pageParams), selectedGenresAndCountries))
        }
    }, [title, pageParams])

    useEffect(() => {
        dispatch(fetchFilms(page, selectedGenresAndCountries))
    }, [selectedGenresAndCountries])

    return (
        <div className="list">
            <div className="list__container">
                {isLoading && <Spinner />}
                {title
                    ? films.searchFilms.map(film =>
                        <FilmItem key={film.kinopoiskId} filmInfo={film} />
                    )
                    : films.allFilms.map(film =>
                        <FilmItem key={film.kinopoiskId} filmInfo={film} />
                    )

                }
                {error && <h3>{error}</h3>}
            </div>
            {!title && <Pagination pageCount={pageCount}/>}
        </div>
    );
};

export default React.memo(FilmList);
