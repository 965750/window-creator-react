import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styles from './AvatarInfoBox.module.scss'

class AvatarInfoBox extends Component {
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
    const initials = this.props.user.firstName
      ? this.props.user.firstName[0] + this.props.user.lastName[0]
      : ''

    if (this.state.showInfoBox) {
      infoBox = (
        <div
          data-testid="avatarInfoBox"
          className={`${styles.infoBox} p-2 absolute right-0 border border-gullGray rounded bg-wildSand`}
        >
          <p>{`${this.props.user.firstName} ${this.props.user.lastName}`}</p>
          <p>{this.props.auth.email}</p>
          <p>
            <span>
              <FormattedMessage
                id="saved projects:"
                defaultMessage="saved projects:"
              />
            </span>
            <span>{` ${this.props.user.windows.length}`}</span>
          </p>
        </div>
      )
    }

    return (
      <div
        data-testid="avatar"
        className={`${styles.avatar} z-30 mt-md rounded-full bg-mountainMeadow cursor-pointer`}
        onClick={this.toggleInfoBox}
        ref={n => (this.node = n)} // eslint-disable-line
      >
        <p className="uppercase text-center pt-1 leading-loose text-white text-xl font-bold">
          {initials}
        </p>
        {infoBox}
      </div>
    )
  }
}

AvatarInfoBox.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    isLoaded: PropTypes.bool,
    isEmpty: PropTypes.bool,
    windows: PropTypes.array,
  }),
  auth: PropTypes.shape({
    email: PropTypes.string,
    isEmpty: PropTypes.bool,
    lastLoginAt: PropTypes.string,
  }),
}

const mapStateToProps = (state) => ({
  user: state.firebase.profile,
  auth: state.firebase.auth,
})

export default connect(mapStateToProps)(AvatarInfoBox)
