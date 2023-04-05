import React, {FC, FormEvent, useState} from 'react';
import SearchIcon from "static/searchIcon.svg";
import {useNavigate} from "react-router-dom";

interface SearchFormProps {
    setMenuIsOpen: (e: boolean) => void
}

const SearchForm: FC<SearchFormProps> = ({setMenuIsOpen}) => {

    const [valueSearch, setValueSearch] = useState('')
    const navigate = useNavigate()

    const searchFilms = (e: FormEvent<HTMLFormElement> | null = null) => {
        e?.preventDefault()
        if(valueSearch) navigate(`/watch/search/${valueSearch}`)
        setValueSearch('')
        setMenuIsOpen(false)
    }

    return (
        <form onSubmit={(e) => searchFilms(e)} className="header__search">
            <input
                value={valueSearch}
                onChange={(e) => setValueSearch(e.target.value)}
                placeholder='Поиск'
                className="header__search-input"
            />
            <img onClick={() => searchFilms()} src={SearchIcon} alt="" className="header__search-icon"/>
        </form>
    );
};

export default React.memo(SearchForm);
