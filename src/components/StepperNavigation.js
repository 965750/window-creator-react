import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeStep } from '../store/actions/themeActions'

class StepperNavigation extends Component {
    render() {
        let btnBack

        if (this.props.currentStep !== 1) {
            btnBack = <button className='h-8 mr-4 uppercase border-2 border-gullGray w-full cursor-pointer' onClick={() => this.props.handleChangeStep(this.props.currentStep - 1)}>
            back
        </button>            
        }
        return (
            <div className='flex absolute w-full bottom-0'>
                { btnBack }
                <button className='h-8 min-w-half uppercase border-2 bg-gullGray text-white border-gullGray cursor-pointer' onClick={() => this.props.handleChangeStep(this.props.currentStep + 1)}>
                    next step
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentStep: state.theme.stepper.active
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleChangeStep: (step) => dispatch(changeStep(step))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepperNavigation)
