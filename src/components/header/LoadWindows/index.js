import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import LoadWindow from '../LoadWindow'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styles from './LoadWindows.module.scss'

class LoadWindows extends Component {
  state = {
    showInfoBox: false,
  }

  componentDidMount() {
    window.addEventListener('click', this.hideInfoBox)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hideInfoBox)
  }

  toggleInfoBox = () => {
    this.setState((prevState) => ({
      showInfoBox: !prevState.showInfoBox,
    }))
  }

  hideInfoBox = (e) => {
    if (this.state.showInfoBox && !this.node.contains(e.target)) {
      this.setState({
        showInfoBox: false,
      })
    }
  }

  render() {
    let infoBox
    let savedWindows

    if (this.props.user.windows) {
      savedWindows = this.props.user.windows.map((window, index) => (
        <LoadWindow isLast={this.props.user.windows.length === index + 1} key={window.id} window={window} />
      ))
    }


    if (this.state.showInfoBox) {
      infoBox = (
        <div
          className={`${styles.infoBox} px-2 absolute right-0 border border-gullGray rounded bg-wildSand lowercase`}
        >
          {savedWindows}
        </div>
      )
    }

    return (
      <button
        className="z-40 uppercase mr-5 cursor-pointer"
        onClick={this.toggleInfoBox}
        ref={n => (this.node = n)} // eslint-disable-line
      >
        <span className="hover:text-malachite">
          <FormattedMessage id="Load" defaultMessage="Load" />
        </span>
        {infoBox}
      </button>
    )
  }
}

LoadWindows.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    isLoaded: PropTypes.bool,
    isEmpty: PropTypes.bool,
    windows: PropTypes.array,
  }),
}

const mapStateToProps = (state) => ({
  user: state.firebase.profile,
})

export default connect(mapStateToProps)(LoadWindows)
