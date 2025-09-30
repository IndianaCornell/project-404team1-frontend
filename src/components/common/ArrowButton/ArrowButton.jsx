import React from 'react';
import Arrow from '@assets/icons/arrow.svg?react';
import s from './ArrowButton.module.css';

function ArrowButton({onClick, color}) {
    const colorClass = color === 'white' ? s.arrowButtonWhite : s.arrowButtonBlack;

    return (
        <button className={colorClass} onClick={onClick}>
            <Arrow/>
        </button>
    );
}

export default ArrowButton;