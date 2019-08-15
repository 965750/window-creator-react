import React, { Component } from 'react'
import styles from './Loading.module.scss'
import { connect } from 'react-redux'
import { isLoading } from '../store/actions/themeActions'
import { withRouter } from 'react-router'

class Loading extends Component {
    state = {
        progress: 0
    }

    addProgress = () => {
        setTimeout(() => {
            this.setState((prevState) => ({
                progress: prevState.progress + 1
            }))
        }, 10)
    }

    componentDidMount () {
        this.addProgress()
    }

    componentDidUpdate () {
        if (this.state.progress < 100) {
            this.addProgress()
        }

        if (this.state.progress === 100) {
            this.props.history.push('/creator')
            this.props.setLoading(false)
        }
    }

    render() {
        return (
            <div className={`bg-overlay absolute w-full h-full top-0 opacity-75`}>
                <div className={`${styles.loading} text-center text-white absolute top-half left-half`}>
                    <h3 className={`text-2xl mb-10`}>Processing...</h3>
                    <div className={`${styles.bar} border rounded-full p-1`}>
                        <div className={`${styles.bar__inside} bg-white rounded-full h-full`} style={{width: `${this.state.progress}%`}} />
                        <p className={`absolute text-black right-20 bottom-3`}>
                            { this.state.progress }%
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (loading) => dispatch(isLoading(loading))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Loading))
