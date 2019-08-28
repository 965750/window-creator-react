import React, { Component } from 'react'
import styles from './Window.module.scss'
import PropTypes from 'prop-types'

class Window extends Component {
    componentDidMount() {
        console.log(
            this.props.window.width * (window.innerWidth > 767 ? 1 : 0.8)
        )
    }

    render() {
        const table = this.props.window.rows.map((row, index) => {
            return (
                <tr
                    style={{ borderColor: this.props.windowColor }}
                    className={`${styles.window__rows}`}
                    key={index}
                >
                    {this.props.window.columns.map((column, index) => {
                        return (
                            <td
                                style={{
                                    borderColor: this.props.windowColor,
                                }}
                                className={`${styles.window__columns}`}
                                key={index}
                            >
                                &nbsp;
                            </td>
                        )
                    })}
                </tr>
            )
        })

        return (
            <div
                className="h-full z-20"
                style={{
                    width: `${this.props.window.width *
                        (window.innerWidth > 767 ? 1 : 0.6)}px`,
                    height: `${this.props.window.height *
                        (window.innerWidth > 767 ? 1 : 0.6)}px`,
                }}
            >
                <table
                    style={{ borderColor: this.props.windowColor }}
                    className={`${styles.window} w-full h-full`}
                >
                    <tbody>{table}</tbody>
                </table>
            </div>
        )
    }
}

Window.propTypes = {
    windowColor: PropTypes.string,
    window: PropTypes.shape({
        color: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        doorType: PropTypes.number,
        rows: PropTypes.array,
        columns: PropTypes.array,
    }),
}

export default Window
