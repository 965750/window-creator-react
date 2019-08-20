import React, { Component } from 'react'
import styles from './Navbar.module.scss'
import LanguageSwitcher from './LanguageSwitcher'

export default class Navbar extends Component {
    render() {
        return (
            <div className={`${styles.navbar} bg-white shadow`}>
                NAVBAR
                <LanguageSwitcher />
            </div>
        )
    }
}
