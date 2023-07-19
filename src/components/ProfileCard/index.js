import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class ProfileCard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileData: {},
  }

  componentDidMount() {
    this.renderProfileData()
  }

  renderProfileData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        name: data.profile_details.name,
        profileImgUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileView = () => {
    const {profileData} = this.state
    const {name, profileImgUrl, shortBio} = profileData
    return (
      <div className="profile-card-container">
        <img src={profileImgUrl} alt="profile-logo" className="profile-logo" />
        <h1 className="profile-name">{name}</h1>
        <p className="designation">{shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="profile-loading-view" data-testid="loader">
      <Loader type="ThreeDots" color="white" height="80" width="80" />
    </div>
  )

  renderFailureView = () => (
    <div className="profile-failure-view">
      <button type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderProfileCard = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderProfileView()
      case 'FAILURE':
        return this.renderFailureView()
      case 'IN_PROGRESS':
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderProfileCard()}</>
  }
}
export default ProfileCard
