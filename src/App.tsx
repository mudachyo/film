import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.sass';
import {routes} from "routes";
import NavBar from "components/NavBar";

const App = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                {routes.map(route =>
                    <Route key={route.path} path={route.path} element={route.element}/>
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
