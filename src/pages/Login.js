import React, { Component } from 'react'
import styles from './Login.module.scss'
import { connect } from 'react-redux'
import { login } from '../store/actions/authActions'

class Login extends Component {
  state = {
    email: '',
    password: '',
    remember: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  toggleCheckbox = (e) => {
    this.setState({
      [e.target.id]: e.target.checked
    })
  }

  onLogin = (e) => {
    e.preventDefault()
    console.log(this.state)
    this.props.login(this.state)
  }

  render () {
    return (
      <form className={`mt-5`} onSubmit={this.onLogin}>
        <input id="email" onChange={this.handleChange} value={this.state.email} type="text" placeholder="Email address" className={`${styles.field} border border-light rounded p-3 mx-auto block`} />
        <input id="password" onChange={this.handleChange} value={this.state.password} type="password" placeholder="Password" className={`${styles.field} border border-light rounded p-3 mx-auto block mt-10`} />
        <div className={`${styles.checkbox} mx-auto block`}>
          <input id="remember" onChange={this.toggleCheckbox} checked={this.state.remember} type="checkbox" />
          <label htmlFor="keepMeLoggedIn">Keep me logged in</label>
        </div>
        <input type="submit" className={`${styles.submit} block bg-first rounded text-white mx-auto`} value="Login" />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(login(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
