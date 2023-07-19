import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props

    history.replace('/login')
  }

  const gotoHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <nav className="nav-container">
      <button type="button" className="header-logo-btn" onClick={gotoHome}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </button>
      <div className="nav-menu">
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/jobs" className="nav-item">
          Jobs
        </Link>
      </div>
      <button className="logout-btn" type="button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
