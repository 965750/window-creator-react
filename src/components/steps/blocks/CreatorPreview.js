import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Window from './Window'
import PreviewSwitcher from './PreviewSwitcher'
import styles from './CreatorPreview.module.scss'
import WindowRulers from './WindowRulers'
import cityImage from '../../../assets/city.jpg'

class CreatorPreview extends Component {
    state = {
        interiorPreview: true,
    }

    onSwitchPreview = isSwiched => {
        this.setState({
            interiorPreview: isSwiched,
        })
    }

    render() {
        return (
            <div
                className={`${styles.preview} ${
                    this.state.interiorPreview ? styles.preview__background : ''
                } w-full md:w-2/3 border border-mercury relative`}
            >
                <PreviewSwitcher
                    interiorPreview={this.state.interiorPreview}
                    onSwitchPreview={this.onSwitchPreview}
                />
                <div className={`${styles.city__window} absolute flex`}>
                    {this.state.interiorPreview ? (
                        <div className="overflow-hidden absolute w-full h-full">
                            <img
                                alt="city"
                                src={cityImage}
                                className={`${styles.city__background} absolute bottom-0`}
                            />
                        </div>
                    ) : null}
                    <WindowRulers window={this.props.window} />
                    {[...Array(this.props.window.doorType)].map(
                        (single, index) => (
                            <Window
                                key={index}
                                window={this.props.window}
                                windowColor={this.props.windowColor.color}
                            />
                        )
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    window: state.creator.window,
    windowColor: state.creator.colorBoxes.find(box => box.active === true),
})

CreatorPreview.propTypes = {
    window: PropTypes.shape({
        color: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        doorType: PropTypes.number,
        rows: PropTypes.array,
        columns: PropTypes.array,
    }),
    windowColor: PropTypes.shape({
        id: PropTypes.string,
        color: PropTypes.string,
        label: PropTypes.string,
        active: PropTypes.bool,
    }),
}

export default connect(mapStateToProps)(CreatorPreview)
