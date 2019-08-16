import React, { Component } from 'react'
import styles from './Navbar.module.scss'

export default class Navbar extends Component {
    render () {
        return (
            <div className={`${styles.navbar} bg-white shadow`}>
                NAVBAR
            </div>
        )
    }
}
