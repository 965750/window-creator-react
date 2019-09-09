import './App.scss'
import './index.css'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { setLocalLang, checkLocation } from './store/actions/themeActions'

import CodeInfoBox from './components/blocks/CodeInfoBox/'
import Creator from './pages/Creator/'
import Login from './pages/Login/'
import messages from './messages-i18n'
import Navbar from './components/header/Navbar/'
import NotificationBanner from './components/blocks/NotificationBanner/'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Register from './pages/Register/'

class App extends Component {
  componentDidMount() {
    this.checkLanguage()
  }

  checkLanguage = () => {
    if (localStorage.lang) {
      this.props.setLocalLang(localStorage.lang)
    } else {
      this.props.checkLocation()
    }
  }

  render() {
    return (
      <IntlProvider
        locale={this.props.lang}
        messages={messages[this.props.lang]}
      >
        <BrowserRouter>
          <div className="App">
            <Navbar auth={this.props.auth} />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/creator" component={Creator} />
              <Route path="/register" component={Register} />
              <Route path="/*" component={Login} />
            </Switch>
            <NotificationBanner />
            <CodeInfoBox />
          </div>
        </BrowserRouter>
      </IntlProvider>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLocalLang: (lang) => dispatch(setLocalLang(lang)),
  checkLocation: () => dispatch(checkLocation()),
})

const mapStateToProps = (state) => ({
  lang: state.theme.lang,
  auth: state.firebase.auth,
})

App.propTypes = {
  setLocalLang: PropTypes.func,
  checkLocation: PropTypes.func,
  lang: PropTypes.string,
  auth: PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
