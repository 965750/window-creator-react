import React, { Component } from 'react'
import './App.scss'
import './index.css'
import Navbar from './components/header/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import { IntlProvider } from 'react-intl'
import messages from './messages-i18n'
import Creator from './pages/Creator'
import { connect } from 'react-redux'
import { wasUserLoggedIn } from './store/actions/authActions'
import NotificationBanner from './components/blocks/NotificationBanner'
import Loading from './components/blocks/Loading'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { setLocalLang, checkLocation } from './store/actions/themeActions'
import PropTypes from 'prop-types'

class App extends Component {
    checkLanguage = () => {
        if (localStorage.lang) {
            this.props.setLocalLang(localStorage.lang)
        } else {
            this.props.checkLocation()
        }
    }

    componentDidMount() {
        this.checkLanguage()
    }

    render() {
        return (
            <IntlProvider
                locale={this.props.lang}
                messages={messages[this.props.lang]}
            >
                <BrowserRouter>
                    <div className="App">
                        <Navbar />
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route path="/creator" component={Creator} />
                            <Route path="/register" component={Register} />
                            <Route path="/*" component={Login} />
                        </Switch>
                        <NotificationBanner />
                        {this.props.showLoading ? (
                            <Loading showLoading={this.props.showLoading} />
                        ) : null}
                    </div>
                </BrowserRouter>
            </IntlProvider>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        wasUserLoggedIn: userToken => dispatch(wasUserLoggedIn(userToken)),
        setLocalLang: lang => dispatch(setLocalLang(lang)),
        checkLocation: () => dispatch(checkLocation()),
    }
}

const mapStateToProps = state => {
    return {
        showLoading: state.theme.isLoading,
        lang: state.theme.lang,
    }
}

App.propTypes = {
    wasUserLoggedIn: PropTypes.func,
    setLocalLang: PropTypes.func,
    checkLocation: PropTypes.func,
    showLoading: PropTypes.bool.isRequired,
    lang: PropTypes.string,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
