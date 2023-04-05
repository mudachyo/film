import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "hooks/store";
import {filmSlice} from "store/reducers/FilmSlice";
import Spinner from "./UI/Spinner/Spinner";
import CustomSelect from "./UI/CustomSelect/CustomSelect";
import {fetchGenresAndCountries} from "store/asyncActions/fetchFilms";
import {useNavigate} from "react-router-dom";

export interface SelectProps {
    id: number;
    title: string;
    value: string;
}

const FilterBar = () => {

    const {genresAndCountries, selectedGenresAndCountries, loadingGenresAndCountries} = useAppSelector(state => state.filmSlice)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [selectedGenres, setSelectedGenre] = useState<number[]>(selectedGenresAndCountries.genres || [])
    const [selectedCountries, setSelectedCountries] = useState<number[]>(selectedGenresAndCountries.countries || [])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const filterFilms = () => {
        const filtered = {
            genres: selectedGenres,
            countries: selectedCountries,
            sort: selectedValue.value
        }
        dispatch(filmSlice.actions.setSelectedGenresAndCountries(filtered))
        setIsOpen(false)
        navigate('/watch/page=1')
    }

    useEffect(() => {
        if(!genresAndCountries.genres || !genresAndCountries.countries) dispatch(fetchGenresAndCountries())
    }, [])

    const selectValues = [
        {id: 0, title: 'Сортировка по', value: ''},
        {id: 1, title: 'Рейтингу', value: 'RATING'},
        {id: 2, title: 'Количеству отзывов', value: 'NUM_VOTE'},
        {id: 3, title: 'Дате', value: 'YEAR'}
    ]

    const [selectedValue, setSelectedValue] = useState<SelectProps>(selectValues[0])

    return (
        <div className="filter__container">
            <div className="filter__open" onClick={() => setIsOpen(!isOpen)}>
                Фильтр
            </div>
            <div className={['filter', isOpen ? 'active' : ''].join(' ')}>

                <CustomSelect
                    selectValues={selectValues}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                />

                <div className="filter__item">
                    <div className="filter__title">Жанры</div>
                    <div className="filter__wrapper">
                        {loadingGenresAndCountries ? <Spinner /> : genresAndCountries?.genres?.length &&
                            genresAndCountries?.genres.map(genre =>
                                genre.genre &&
                                <div
                                    key={genre.id}
                                    className={["filter__wrapper-item", selectedGenres?.includes(genre.id) ? 'active' : ''].join(' ')}
                                    onClick={() =>
                                        selectedGenres?.includes(genre.id)
                                            ? setSelectedGenre(selectedGenres.filter(el => el !== genre.id))
                                            : setSelectedGenre([...selectedGenres, genre.id])
                                    }
                                >
                                    {genre.genre}
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="filter__item">
                    <div className="filter__title">Страны</div>
                    <div className="filter__wrapper">
                        {loadingGenresAndCountries ? <Spinner /> : genresAndCountries?.countries?.length &&
                            genresAndCountries?.countries.map(country =>
                                country.country &&                            <div
                                    key={country.id}
                                    className={["filter__wrapper-item", selectedCountries?.includes(country.id) ? 'active' : ''].join(' ')}
                                    onClick={() =>
                                        selectedCountries?.includes(country.id)
                                            ? setSelectedCountries(selectedCountries.filter(el => el !== country.id))
                                            : setSelectedCountries([...selectedCountries, country.id])
                                    }
                                >
                                    {country.country}
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="filter__button" onClick={filterFilms}>Применить</div>
            </div>
        </div>
    );
};

export default FilterBar;
