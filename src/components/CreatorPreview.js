import React, { Component } from 'react'
import Window from '../components/Window'
import PreviewSwitcher from './PreviewSwitcher'
import styles from './CreatorPreview.module.scss'
import WindowRulers from './WindowRulers'
import { connect } from "react-redux";
import cityImage from '../assets/city.jpg'

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
            <div className={`${styles.preview} ${this.state.interiorPreview ? styles.preview__background : ''} w-2/3 border border-mercury relative`}>
                <PreviewSwitcher interiorPreview={this.state.interiorPreview} onSwitchPreview={this.onSwitchPreview} />
                <div className={`${styles.city__window} absolute flex`}>
                    { this.state.interiorPreview ? (<div className='overflow-hidden absolute w-full h-full'><img src={cityImage} className={`${styles.city__background} absolute bottom-0`} /></div>) : null }
                    <WindowRulers doorType={this.props.window.doorType} height={this.props.window.height} width={this.props.window.width} />
                    { [...Array(this.props.window.doorType)].map(() => {
                        return (
                            <Window height={this.props.window.height} width={this.props.window.width} />
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
