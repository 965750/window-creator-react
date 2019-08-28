import React, { Component } from 'react'
import styles from './CodeInfoBox.module.scss'
import Cookies from 'js-cookie'

class CodeInfoBox extends Component {
    state = {
        showBox: false,
        visable: false,
    }

    componentDidMount() {
        if (!Cookies.get('showCodeInfoBox')) {
            setTimeout(() => {
                this.setState({
                    visable: true,
                })
            }, 2000)

            setTimeout(() => {
                this.setState({
                    showBox: true,
                })
            }, 1500)
        }
    }

    closeBox = () => {
        Cookies.set('showCodeInfoBox', '0', { expires: 2 })
        this.setState({
            showBox: false,
        })
    }

    render() {
        if (this.state.showBox) {
            return (
                <div
                    className={`${styles.box__wrapper} ${
                        this.state.visable ? styles['box__wrapper--active'] : ''
                    } z-30 p-2 pr-5 absolute right-20 bottom-20 border border-gullGray rounded bg-wildSand`}
                >
                    Are You interested in this app? If You want to see full code
                    checkout my Github repository here
                    <span
                        onClick={this.closeBox}
                        className={`${styles.box__close} absolute right-5 top-10 cursor-pointer`}
                    >
                        &#10005;
                    </span>
                </div>
            )
        } else {
            return null
        }
    }
}

export default CodeInfoBox
