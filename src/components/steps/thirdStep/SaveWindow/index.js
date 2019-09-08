import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { saveWindow } from '../../../../store/actions/creatorActions'

import BaseInput from '../../../inputs/BaseInput'
import BaseSubmit from '../../../inputs/BaseSubmit'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class SaveWindow extends Component {
  state = {
    name: '',
    error: '',
  }

  validationError = (error) => {
    this.setState({
      error,
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  saveProject = (e) => {
    e.preventDefault()

    this.props.saveWindow(this.state.name)
  }

  render() {
    return (
      <div>
        <p className="text-xs mb-2">
          <FormattedMessage
            id="You can save Your current window project for later use."
            defaultMessage="You can save Your current window project for later use."
          />
        </p>
        <form onSubmit={this.saveProject} className="flex mb-2">
          <BaseInput
            value={this.state.name}
            validationError={this.validationError}
            handleChange={this.handleChange}
            id="name"
            type="text"
            toValidate={['isRequired', 'tooLong']}
            classes="mr-1 w-full"
            placeholder="Name of Your project"
          />
          <BaseSubmit
            disabled={this.state.error || !this.state.name}
            sm
            value="Save project"
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveWindow: (name) => dispatch(saveWindow(name)),
})

SaveWindow.propTypes = {
  saveWindow: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(SaveWindow);
