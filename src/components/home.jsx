import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import './fonts.css';

export default function Home() {

    return (
        <div id='home-root'>
            <div id='home-wrapper'>
                <img id='logo' src="images/iteration-1-images/logo.svg" alt="logo" />
                <span className='plain-text roboto-condensed-home'>KOD ACIKTIRIR</span>
                <span className='plain-text roboto-condensed-home'>PİZZA, DOYURUR</span>
                <Link to="/order">
                    <button className='home-btn barlow-semibold'>ACIKTIM</button>
                </Link>
            </div>
        </div>
    )
} 