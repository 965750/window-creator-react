import React, { Component } from 'react'
import styles from './Window.module.scss'

class Window extends Component {
    render() {
        const table = this.props.window.rows.map((row, index) => {
            return (
                <tr
                    style={{ borderColor: this.props.windowColor.color }}
                    className={`${styles.window__rows}`}
                    key={index}
                >
                    {this.props.window.columns.map((column, index) => {
                        return (
                            <td
                                style={{
                                    borderColor: this.props.windowColor.color,
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
                    width: `${this.props.window.width}px`,
                    height: `${this.props.window.height}px`,
                }}
            >
                <table
                    style={{ borderColor: this.props.windowColor.color }}
                    className={`${styles.window} w-full h-full`}
                >
                    <tbody>{table}</tbody>
                </table>
            </div>
        )
    }
}

export default Window
