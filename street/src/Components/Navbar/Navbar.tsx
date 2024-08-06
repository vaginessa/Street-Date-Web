import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';

import { useSession } from '../../States/Session/Session';


import { FaDiscord } from "react-icons/fa";

interface NavProps {
    tab?: number;
}

export default function Navbar({ tab }: NavProps) {

    const { isSession } = useSession()

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <Link className='link' to='/'><img src='https://i.postimg.cc/SKH1Dy1G/Screenshot-6-removebg-preview.png'></img></Link>
            </div>

            <div className={styles.hrefs}>
                <Link className='link' to='/'><p className={`${tab === 1 ? styles.selected : ''}`}>Home</p></Link>
                <Link className='link' to='/download'><p className={`${tab === 2 ? styles.selected : ''}`}>Download</p></Link>
                <Link className='link' to='/explore/1'><p className={`${tab === 3 ? styles.selected : ''}`}>Explore Dates</p></Link>
                <Link className='link' to='/documentation'><p className={`${tab === 4 ? styles.selected : ''}`}>Documentation</p></Link>
                {isSession && <Link className='link' to='/play'><p className={`${tab === 5 ? styles.selected : ''}`}>Play</p></Link>}
                {!isSession &&
                    <>
                        <Link className='link' to='/register'><p className={`${tab === 6 ? styles.selected : ''}`}>Register</p></Link>
                        <Link className='link' to='/login'> <p className={`${tab === 7 ? styles.selected : ''}`}>Login</p></Link>
                    </>
                }
            </div>

            <div className={styles.discord}>
                <span onClick={() => { window.open('https://discord.gg/YDWqmevJxk', '_blank') }}><FaDiscord /></span>
            </div>
        </div>
    )
}
