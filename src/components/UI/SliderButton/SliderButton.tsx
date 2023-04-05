import React, { FC } from 'react';
import {useSwiper} from "swiper/react";
import cl from './SliderButton.module.sass';
import SliderButtonIcon from 'static/SliderButton.svg';


interface SliderButtonProps {
    navigate: 'prev' | 'next'
}

const SliderButton: FC<SliderButtonProps> = ({navigate}) => {
    const swiper = useSwiper()

    return (
        <div
            onClick={() => navigate === 'prev' ? swiper.slidePrev() : swiper.slideNext()}
            className={[cl.slider__button, navigate === 'prev' ? cl.left : cl.right].join(' ')}
        >
            <img src={SliderButtonIcon} alt=""/>
        </div>
    );
};

export default SliderButton;
