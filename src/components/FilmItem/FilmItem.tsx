import React, {FC, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import IMDb from 'static/IMDb.svg';
import cl from './FilmItem.module.sass';
import {IFilmKP, IFilmPopular} from "types";

interface FilmItemProps {
    filmInfo?: IFilmKP
    popularFilm?: IFilmPopular
}

const filmDescription = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias aliquid amet cumque doloremque earum error esse facere fuga id illum impedit iusto labore maiores mollitia nam nisi numquam, perferendis provident quia, quis similique sunt unde voluptatem voluptates? Aliquid atque similique voluptatum? Accusamus asperiores enim, eveniet excepturi fugiat inventore ipsam magni maiores neque quidem quo sit ullam, voluptates! A aliquam, debitis dignissimos dolores dolorum eos fugit nobis officia quo totam! Architecto, assumenda aut commodi corporis deleniti dicta dignissimos est eveniet facere magnam minima minus, molestiae nemo nisi nulla, pariatur quidem quis ratione rem reprehenderit saepe veniam veritatis voluptatum. Accusantium adipisci animi autem beatae blanditiis, commodi consequatur cum cumque dolor, dolores doloribus ea earum enim eos error eum id in ipsa ipsam nam natus nobis non nostrum nulla numquam officiis omnis possimus quisquam quos repellat saepe sequi sit tempore temporibus totam voluptas voluptatem. Beatae corporis exercitationem quae quisquam, quod saepe tenetur?'

const FilmItem: FC<FilmItemProps> = ({filmInfo, popularFilm}) => {

    const [selected, setSelected] = useState(false)
    const [selectDefault, setSelectDefault] = useState(false)
    const navigate = useNavigate()
    const itemHover = () => {
        setSelectDefault(true)
        setSelected(true)
    }
    const watch = (id: number) => {
        navigate(`/watch/${id}`);
    }

    return (
        <div className={[cl.film__item, selected ? cl.active : selectDefault && cl.disable].join(' ')}
            onMouseEnter={() => itemHover()}
             onMouseLeave={() => setSelected(false)}
        >
            <img src={filmInfo?.posterUrl || popularFilm?.posterUrl} className={cl.film__item_img} alt="" />
            <div className={cl.film__info}>
                <div className={cl.film__short}>{filmInfo?.countries[0]?.country} {filmInfo?.countries.length && filmInfo?.countries.length > 1 ? `и еще ${filmInfo?.countries.length}` : '' || popularFilm?.countries[0]?.country} {popularFilm?.countries.length && popularFilm?.countries.length > 1 ? `и еще ${popularFilm?.countries.length}` : ''}<span>{filmInfo?.year || popularFilm?.year}</span></div>
                <div className={cl.film__title}>{filmInfo?.nameRu || popularFilm?.nameRu}</div>
                <div className={cl.film__rating}>
                    <img src={IMDb} alt="" className={cl.film__ratingIcon}/>
                    <div className={cl.film__rating_num}>{filmInfo?.ratingImdb || popularFilm?.rating}</div>
                </div>
                {/*todo: убрать инлайн стили*/}
                <div className={cl.film__description} style={{overflowY: selected ? 'auto' : 'unset'}}>{!selected ? filmDescription.split(' ').slice(0, 3).join(' ') + '...' : filmDescription}</div>
                <button
                    className={[cl.film__button, selected && cl.active].join(' ')}
                    onClick={() => {
                        filmInfo?.kinopoiskId && watch(filmInfo.kinopoiskId)
                        popularFilm?.filmId && watch(popularFilm?.filmId)
                    }
                    }
                >
                    смотреть
                </button>
            </div>
        </div>
    );
};

export default FilmItem;
