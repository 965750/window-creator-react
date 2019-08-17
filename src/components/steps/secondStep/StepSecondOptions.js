import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeWindowDivision } from '../../../store/actions/creatorActions'
import DivisionInput from './DivisionInput'

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
                    <DivisionInput
                        id="rows"
                        inputValue={this.props.window.rows.length - 1}
                        changeDivision={this.changeDivision}
                    />
                    <DivisionInput
                        id="columns"
                        inputValue={this.props.window.columns.length - 1}
                        changeDivision={this.changeDivision}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        window: state.creator.window,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeWindowDivision: (value, id) =>
            dispatch(changeWindowDivision(value, id)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StepSecondOptions)
