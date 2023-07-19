import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {
    shouldShowErrorMsg: false,
    username: '',
    password: '',
    errorMsg: '',
  }

  getUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  getPassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      shouldShowErrorMsg: true,
      errorMsg,
    })
  }

  onClickSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, shouldShowErrorMsg, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-details-container">
        <div className="login-from-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="login-form" onSubmit={this.onClickSubmitForm}>
            <div className="input-field-container">
              <label htmlFor="username" className="input-label">
                USERNAME
              </label>
              <br />
              <input
                id="username"
                type="text"
                value={username}
                className="input-field"
                placeholder="Username"
                onChange={this.getUsername}
              />
            </div>
            <div className="input-field-container">
              <label htmlFor="password" className="input-label">
                PASSWORD
              </label>
              <br />
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={this.getPassword}
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
            {shouldShowErrorMsg && (
              <p className="error-display-text">*{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
