import HomePage from "pages/HomePage";
import CatalogPage from "pages/CatalogPage";
import FilmPage from "pages/FilmPage";
import {Navigate} from "react-router-dom";

export const routes = [
    {path: '/', element: <HomePage />},
    {path: '/watch', element: <CatalogPage />},
    {path: '/watch/page=:page', element: <CatalogPage />},
    {path: '/watch/search/:title', element: <CatalogPage />},
    {path: '/watch/:id', element: <FilmPage />},
    {path: '*', element: <Navigate to='/' replace />},
]
