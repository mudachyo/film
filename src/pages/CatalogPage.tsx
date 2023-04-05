import React from 'react';
import FilmList from "components/FilmList";
import FilterBar from "components/FilterBar";
import {useParams} from 'react-router-dom';

const CatalogPage = () => {

    const {title} = useParams()

    return (
        <div className='container catalog'>
            {!title && <FilterBar />}
            <FilmList />
        </div>
    );
};

export default CatalogPage;
