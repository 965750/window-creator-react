import React, { Component } from 'react'
import Window from '../components/Window'
import PreviewSwitcher from './PreviewSwitcher'
import styles from './CreatorPreview.module.scss'
import WindowRulers from './WindowRulers'
import { connect } from "react-redux";

class CreatorPreview extends Component {
    state = {
        interiorPreview: true
    }

    onSwitchPreview = (isSwiched) => {
        this.setState({
            interiorPreview: isSwiched
        })
    }

    render () {
        return (
            <div className={`${styles.preview} w-2/3 border border-mercury relative`}>
                <PreviewSwitcher interiorPreview={this.state.interiorPreview} onSwitchPreview={this.onSwitchPreview} />
                <div className={`${this.state.interiorPreview ? styles.cityBackground : ''} absolute flex`}>
                    <WindowRulers doorType={this.props.window.doorType} height={this.props.window.height} width={this.props.window.width} />
                    { [...Array(this.props.window.doorType)].map(() => {
                        return (
                            <Window height={this.props.window.height} width={this.props.window.width}/>
                        )
                    }) }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        window: state.creator.window
    }
}

export default connect(mapStateToProps)(CreatorPreview)
