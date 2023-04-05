import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks/store";
import IMDbIcon from 'static/IMDb.svg';
import PlayIcon from 'static/play.svg';
import TrailerIcon from 'static/trailer.svg';
import AddIcon from 'static/add.svg';
import {fetchOneFilm, fetchPopularFilms} from "store/asyncActions/fetchFilms";
import Spinner from "components/UI/Spinner/Spinner";
import Slider from "components/UI/Slider/Slider";
import Player from "components/UI/Player/Player";
import ArrowIcon from 'static/arrow.svg';

const FilmPage = () => {

    const {id: filmId} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {filmInfo, popularFilms, isLoading, error} = useAppSelector(state => state.filmSlice)


    useEffect(() => {
        dispatch(fetchOneFilm(Number(filmId)))
        if(!popularFilms.length) dispatch(fetchPopularFilms(1))
    }, [filmId])


    return (
        <div className='container'>
            {error && <h3>{error}</h3>}
            {isLoading
                ? <Spinner />
                : <div>
                    <div className="film">
                        <div className="film__info">
                            <div className="navigation" onClick={() => navigate(-1)}>
                                <img src={ArrowIcon} alt="" className="navigation__icon"/>
                                <div className="navigation__inner">Назад</div>
                            </div>
                            <div className="film__title">{filmInfo.name_russian}</div>
                            <div className="film__row">
                                <div className="film__year">{filmInfo.year}</div>
                                <div className="film__age">{filmInfo.age_restriction ? filmInfo.age_restriction : '0'}+</div>
                                <div className="film__rating">
                                    <img src={IMDbIcon} alt="" className="film__rating-icon"/>
                                    <div className="film__rating-num">{filmInfo.rating_imdb}</div>
                                </div>
                                <div className="film__length"><span>{Math.floor(filmInfo?.time_minutes / 60)}</span> h <span>{filmInfo?.time_minutes % 60}</span> min</div>
                            </div>
                            <div className="film__description">{filmInfo.description}</div>
                            <div className="film__navigate">
                                <a href='#player' className="film__button">
                                    <img src={PlayIcon} alt="" className="film__button-icon"/>
                                    <div className="film__button-text">PLAY</div>
                                </a>
                                <div className="film__button">
                                    <img src={TrailerIcon} alt="" className="film__button-icon"/>
                                    <div className="film__button-text">Трейлер</div>
                                </div>
                                <div className="film__button">
                                    <img src={AddIcon} alt="" className="film__button-icon"/>
                                    <div className="film__button-text">Смотреть позже</div>
                                </div>
                            </div>
                            <div className="persons__subtitle subtitle">PERSONS</div>
                            <div className="film__wrapper">
                                <div className="film__persons">
                                    <span>Актеры</span>
                                    {filmInfo?.persons?.filter(el => el.profession.profession_id === 'actor').length
                                        ? filmInfo?.persons?.filter(el => el.profession.profession_id === 'actor')?.map(person =>
                                            <div key={person?.name_russian} className="film__person-item">{person.name_russian}</div>
                                        )
                                        : <div className="film__perosn-item">Не указаны</div>
                                    }
                                </div>
                                <div className="film__persons">
                                    <span>Продюссеры</span>
                                    {filmInfo?.persons?.filter(el => el.profession.profession_id === 'producer').length
                                        ? filmInfo?.persons?.filter(el => el.profession.profession_id === 'producer')?.map(person =>
                                            <div key={person?.name_russian} className="film__person-item">{person.name_russian}</div>
                                        )
                                        : <div className="film__perosn-item">Не указаны</div>
                                    }
                                </div>
                                <div className="film__persons">
                                    <span>Директор</span>
                                    {filmInfo?.persons?.filter(el => el.profession.profession_id === 'director').length
                                        ? filmInfo?.persons?.filter(el => el.profession.profession_id === 'director')?.map(person =>
                                            <div key={person?.name_russian} className="film__person-item">{person.name_russian}</div>
                                        )
                                        : <div className="film__perosn-item">Не указаны</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="film__poster">
                            <img src={filmInfo.big_poster} alt="" className="film__poster-inner"/>
                        </div>
                    </div>
                    <div className="player" id='player'>
                        <div className="player__subtitle subtitle">Let's watch</div>
                        <div className="player__title title">Приятного просмотра</div>
                        <div className="player__inner">
                            <Player filmId={filmId} />
                        </div>
                    </div>
                    <div className="slider">
                        <div className="slider__subtitle subtitle">popular</div>
                        <div className="slider__title title">Подборка популярных фильмов</div>
                        <Slider films={popularFilms.slice(0,6)} />
                    </div>
                </div>
            }
        </div>
    );
};

export default FilmPage;
