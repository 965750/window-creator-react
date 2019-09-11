import { FormattedMessage } from 'react-intl'

import Cookies from 'js-cookie'
import React, { Component } from 'react'
import styles from './CodeInfoBox.module.scss'

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
      }, 120000)

      setTimeout(() => {
        this.setState({
          showBox: true,
        })
      }, 119500)
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
          } z-30 p-2 pr-5 fixed right-20 bottom-20 border border-gullGray rounded bg-wildSand`}
        >
          <p>
            <span>
              <FormattedMessage
                id="Are You interested in this app? If You want to see full code with tests checkout my "
                defaultMessage="Are You interested in this app? If You want to see full code with tests checkout my "
              />
            </span>
            <a href="https://github.com/965750/window-creator-react" className="hover:text-mountainMeadow text-malachite cursor-pointer">
              <FormattedMessage
                id="Github repository here"
                defaultMessage="Github repository here"
              />
            </a>
          </p>
          <button
            onClick={this.closeBox}
            className={`${styles.box__close} absolute right-5 top-10 cursor-pointer`}
          >
            &#10005;
          </button>
        </div>
      )
    }
    return null
  }
}

export default CodeInfoBox
