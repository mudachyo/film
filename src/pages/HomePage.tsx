import React from 'react';
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <div className="banner">
                <div className="container">
                    <div className="banner__title">Kot film</div>
                    <div className="banner__subtitle">Смотрите все новинки абсолютно бесплатно</div>
                    <Link to='/watch' className="banner__button">Выбрать фильм</Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;