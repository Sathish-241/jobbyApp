import Cookies from 'js-cookie'
import {Component} from 'react'
import {BiSearch} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobCard from '../JobCard'
import FilterItem from '../FilterItem'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import ProfileCard from '../ProfileCard'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class JobsList extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    searchInput: '',
    activeEmploymentType: [],
    activeMinimumPackage: '',
  }

  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput, activeEmploymentType, activeMinimumPackage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${[
      ...activeEmploymentType,
    ]}&minimum_package=${activeMinimumPackage}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedJobsList = data.jobs.map(job => ({
        title: job.title,
        rating: job.rating,
        id: job.id,
        location: job.location,
        companyLogoUrl: job.company_logo_url,
        jobDescription: job.job_description,
        employmentType: job.employment_type,
        packagePerAnnum: job.package_per_annum,
      }))
      this.setState({
        jobsList: updatedJobsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0

    if (shouldShowJobsList) {
      return (
        <ul className="job-cards-container">
          {jobsList.map(eachItem => (
            <JobCard jobData={eachItem} key={eachItem.id} />
          ))}
        </ul>
      )
    }
    return this.renderNoJobsView()
  }

  renderNoJobsView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-found-text">No Jobs Found</h1>
      <p className="failure-description">
        We could not find any jobs. Try another filters.
      </p>
    </div>
  )

  renderLoadingView = () => (
    <div className="loading-view" data-testid="loader">
      <Loader type="ThreeDots" color="white" height="80" width="80" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-view-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" type="button" onClick={this.getResults}>
        Retry
      </button>
    </div>
  )

  renderAllJobsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderJobsList()

      case 'FAILURE':
        return this.renderFailureView()
      case 'IN_PROGRESS':
        return this.renderLoadingView()

      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickSearch = () => {
    this.getResults()
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          type="search"
          value={searchInput}
          placeholder="Search"
          className="search-input"
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          className="search-btn"
          onClick={this.onClickSearch}
          data-testid="searchButton"
        >
          <BiSearch className="search-icon" />
        </button>
      </div>
    )
  }

  upDateActiveEmploymentType = employmentType => {
    this.setState(
      prevState => ({
        activeEmploymentType: [
          ...prevState.activeEmploymentType,
          employmentType,
        ],
      }),
      this.getResults,
    )
  }

  activeMinimumPackage = activeMinimumPackage => {
    this.setState({activeMinimumPackage}, this.getResults)
  }

  render() {
    return (
      <div className="jobs-list-container">
        <Header />
        <div className="sub-division-container">
          <div className="filters-view-container">
            <div className="profile-container">
              <ProfileCard />
            </div>
            <div className="filter-container">
              <FilterItem
                activeEmploymentType={this.upDateActiveEmploymentType}
                activeMinimumPackage={this.activeMinimumPackage}
              />
            </div>
          </div>

          <div className="jobs-list-display-section">
            {this.renderSearchInput()}
            {this.renderAllJobsView()}
          </div>
        </div>
      </div>
    )
  }
}
export default JobsList
