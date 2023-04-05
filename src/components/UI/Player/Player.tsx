import React, {FC} from 'react';
import {usePlayer} from "hooks/usePlayer";

interface PlayerProps {
    filmId: string | undefined;
}

const Player: FC<PlayerProps> = ({filmId}) => {

    usePlayer()

    return (
        <div id="yohoho" data-resize="1" data-kinopoisk={filmId}></div>
    );
};

export default Player;
