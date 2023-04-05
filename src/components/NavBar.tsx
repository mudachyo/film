import React, { useState } from 'react';
import Logo from 'static/logo.svg';
import {Link} from "react-router-dom";
import SearchForm from "components/UI/SearchForm/SearchForm";

const NavBar = () => {

    const [MenuIsOpen, setMenuIsOpen] = useState<boolean>(false)

    return (
        <div className='header'>
            <div className="header__container container">
                <div className={['header__icon', MenuIsOpen ? 'open' : ''].join(' ')} onClick={() => setMenuIsOpen(!MenuIsOpen)}></div>
                <Link to='/' className='header__logo'>
                    <img src={Logo} alt="swipe film"/>
                </Link>
                <div className={['header__navigate', MenuIsOpen ? 'open' : ''].join(' ')}>
                    <div className="header__wrapper">
                        <Link to='/' className='header__link' onClick={() => setMenuIsOpen(false)}>Главная</Link>
                        <Link to='/watch' className='header__link' onClick={() => setMenuIsOpen(false)}>Каталог фильмов</Link>
                    </div>
                    <div className="header__menu">
                        <SearchForm setMenuIsOpen={setMenuIsOpen}/>
                        {/*<div className="header__notification">*/}
                        {/*    <img src={Notification} alt="" className="header__notification-icon"/>*/}
                        {/*</div>*/}
                        {/*<div className="header__profile">*/}
                        {/*    <img src={HeaderProfileIcon} className="header__profile-img" />*/}
                        {/*    <img src={HeaderArrow} alt="" className="header__profile-arrow"/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(NavBar);
