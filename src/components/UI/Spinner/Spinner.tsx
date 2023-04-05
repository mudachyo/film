import React from 'react';
import cl from './spinner.module.sass';
import SpinnerIcon from 'static/spinner.svg';

const Spinner = () => {
    return (
        <div className={cl.spinner}>
            <img src={SpinnerIcon} className={cl.spinner__inner} alt=""/>
        </div>
    );
};

export default Spinner;
