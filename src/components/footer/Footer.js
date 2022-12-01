import { bottom } from '@popperjs/core';
import React from 'react';

const styles = {
    backgroundColor: 'gray',
    width: '100%',
    height: '30px',
    position: 'fixed',
    bottom: 0,
};

export function Footer(){
    return(
        <div style={styles}>
            &copy; Copyright 2022
        </div>
    );
}