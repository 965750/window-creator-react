import React, { Component } from 'react'
import { connect } from 'react-redux'
import ColorBox from './ColorBox'

class StepThirdOptions extends Component {
    render() {
        const colorBoxes = this.props.colorBoxes.map(box => {
            return <ColorBox classes="w-1/4" key={box.id} data={box} />
        })

        return (
            <div className={`pt-2`}>
                <div className={`mb-10`}>
                    <p className="mb-4 text-darkText border-b border-mercury">
                        Choose color
                    </p>
                    <div className="flex">{colorBoxes}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        colorBoxes: state.creator.colorBoxes,
    }
}

export default connect(mapStateToProps)(StepThirdOptions)