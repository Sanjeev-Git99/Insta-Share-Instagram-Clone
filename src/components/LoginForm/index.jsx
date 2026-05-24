import {useState} from 'react'
import Cookies from 'js-cookie'
import {Navigate, useNavigate} from 'react-router-dom'

import './index.css'

const LoginForm = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30, path: '/', sameSite: 'strict'})
      navigate('/', {replace: true})
    } else {
      setShowSubmitError(true)
      setErrorMsg(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="login-form-container">
      <img
        className="login-image"
        src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1682592775/Layer_2login-image_vgli1y.png"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          className="login-website-logo"
          src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1682663744/Standard_Collection_8website_logo_o4ixu3.png"
          alt="website logo"
        />
        <h1 className="website-logo-name">Insta Share</h1>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="username-input-field"
            value={username}
            onChange={onChangeUsername}
            placeholder="Username : rahul"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="password-input-field"
            value={password}
            onChange={onChangePassword}
            placeholder="Password : rahul@2021"
          />
        </div>
        {showSubmitError && <p className="error-message">{errorMsg}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
