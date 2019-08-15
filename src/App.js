import React, { Component } from 'react'
import './App.scss'
import './index.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Creator from './pages/Creator'
import { connect } from 'react-redux'
import { wasUserLoggedIn } from './store/actions/authActions'
import cookies from 'js-cookie'
import NotificationBanner from './components/NotificationBanner'
import Loading from './components/Loading'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends Component {
  checkLoggedIn = () => {
    const userToken = cookies.get('userToken') || sessionStorage.getItem('userToken')
    if (userToken) {
      this.props.wasUserLoggedIn(userToken)
    }
  }

  componentDidMount () {
    this.checkLoggedIn()
  }

  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/creator' component={Creator} />
          </Switch>
          <NotificationBanner />
          { this.props.showLoading ? <Loading showLoading={this.props.showLoading} /> : null }
          { this.props.isLoggedIn ? 'zalogowany' : 'niezalogowany' }
        </div>
      </BrowserRouter>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    wasUserLoggedIn: (userToken) => dispatch(wasUserLoggedIn(userToken))
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    showLoading: state.theme.isLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
