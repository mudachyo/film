import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import cl from './Pagination.module.sass';
import {useAppSelector} from "hooks/store";

interface PaginationProps {
    pageCount: number;
}

const Pagination: FC<PaginationProps> = ({pageCount}) => {

    const pages: number[] = []
    for(let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }
    const navigate = useNavigate()
    const {page: pageParams} = useParams()
    const {page} = useAppSelector(state => state.filmSlice)
    const [selectedPage, setSelectedPage] = useState<number>(Number(page) || 1)

    useEffect(() => {
        pageParams && setSelectedPage(Number(pageParams))
    }, [pageParams])

    const setPage = (page: number) => {
        navigate(`/watch/page=${page}`)
    }

    return (
        <div className={cl.pagination__container}>
            {selectedPage < 5
                ? <div className={cl.pagination}>
                    {pages.slice(0, 5).map(p =>
                        <div
                            key={p}
                            className={[cl.pagination__item, selectedPage === p ? cl.selected : ''].join(' ')}
                            onClick={() => setPage(p)}
                        >{p}</div>
                    )}
                    <div>...</div>
                    <div
                        className={cl.pagination__item}
                        onClick={() => setPage(pageCount)}
                    >{pageCount}</div>
                </div>
                : selectedPage < pageCount - 3
                    ? <div className={cl.pagination}>
                        <div
                            className={cl.pagination__item}
                            onClick={() => setPage(1)}
                        >1</div>
                        <div>...</div>
                        {pages.slice(Number(page) - 3, Number(page) + 2).map(p =>
                            <div
                                key={p}
                                className={[cl.pagination__item, selectedPage === p ? cl.selected : ''].join(' ')}
                                onClick={() => setPage(p)}
                            >{p}</div>
                        )}
                        <div>...</div>
                        <div
                            className={cl.pagination__item}
                            onClick={() => setPage(pageCount)}
                        >{pageCount}</div>
                    </div>
                    : <div className={cl.pagination}>
                        <div
                            className={cl.pagination__item}
                            onClick={() => setPage(1)}
                        >1</div>
                        <div>...</div>
                        {pages.slice(pageCount - 5, pageCount).map(p =>
                            <div
                                key={p}
                                className={[cl.pagination__item, selectedPage === p ? cl.selected : ''].join(' ')}
                                onClick={() => setPage(p)}
                            >
                                {p}
                            </div>
                        )}
                    </div>
            }
        </div>
    );
};

export default Pagination;
