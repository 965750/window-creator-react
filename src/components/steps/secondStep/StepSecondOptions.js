import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeWindowDivision } from '../../../store/actions/creatorActions'
import DivisionInput from './DivisionInput'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

class StepSecondOptions extends Component {
    changeDivision = (value, id) => {
        this.props.changeWindowDivision(value, id)
    }

    render() {
        return (
            <div className={`pt-2`}>
                <div className={`mb-10`}>
                    <p className="mb-4 text-darkText border-b border-mercury">
                        Door division
                    </p>
                    <div className="flex justify-between w-3/4">
                        <p>
                            <FormattedMessage
                                id="Number of beams"
                                defaultMessage="Number of beams"
                            />
                        </p>
                        <DivisionInput
                            id="rows"
                            classes="mb-5"
                            inputValue={this.props.window.rows.length - 1}
                            changeDivision={this.changeDivision}
                        />
                    </div>
                    <div className="flex justify-between w-3/4">
                        <p>
                            <FormattedMessage
                                id="Number of posts"
                                defaultMessage="Number of posts"
                            />
                        </p>
                        <DivisionInput
                            id="columns"
                            inputValue={this.props.window.columns.length - 1}
                            changeDivision={this.changeDivision}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeWindowDivision: (value, id) =>
            dispatch(changeWindowDivision(value, id)),
    }
}

StepSecondOptions.propTypes = {
    window: PropTypes.shape({
        color: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        doorType: PropTypes.number,
        rows: PropTypes.array,
        columns: PropTypes.array,
    }),
    changeWindowDivision: PropTypes.func,
}

export default connect(
    null,
    mapDispatchToProps
)(StepSecondOptions)
