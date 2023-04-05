import React, {FC} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay, Pagination} from "swiper";
import SliderButton from "../SliderButton/SliderButton";
import FilmItem from "components/FilmItem/FilmItem";
import {IFilmPopular} from "types";
import cl from './Slider.module.sass';

interface SliderProps {
    films: IFilmPopular[]
}

const Slider: FC<SliderProps> = ({films}) => {

    return (
        <Swiper
            style={{marginBottom: 70, paddingBottom: 50}}
            spaceBetween={30}
            slidesPerView={4}
            modules={[Pagination, Autoplay]}
            // autoplay={true}
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={{
                1: {
                    slidesPerView: 1
                },
                500: {
                    slidesPerView: 2
                },
                750: {
                    slidesPerView: 3
                },
                950: {
                    slidesPerView: 4
                }
            }}
        >
            {films.map(film =>
                <SwiperSlide key={film.filmId} className={cl.slider__item}>
                    <FilmItem popularFilm={film} />
                </SwiperSlide>
            )}

            <SliderButton navigate='prev' />
            <SliderButton navigate='next' />
        </Swiper>
    );
};

export default Slider;
