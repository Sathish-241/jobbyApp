import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdPlace} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {IoOpenOutline} from 'react-icons/io5'
import Loader from 'react-loader-spinner'

import SimilarJobs from '../SimilarJobs'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'
import Header from '../Header'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    lifeAtCompany: {},
    skills: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
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
      const updatedJobDetails = {
        title: data.job_details.title,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        rating: data.job_details.rating,
        packagePerAnnum: data.job_details.package_per_annum,
      }
      const updatedLifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imgUrl: data.job_details.life_at_company.image_url,
      }
      const updatedSkills = data.job_details.skills.map(eachItem => ({
        name: eachItem.name,
        imgUrl: eachItem.image_url,
      }))
      const similarJobs = data.similar_jobs.map(eachJob => ({
        id: eachJob.id,
        title: eachJob.title,
        rating: eachJob.rating,
        location: eachJob.rating,
        jobDescription: eachJob.job_description,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
      }))
      console.log(updatedJobDetails)
      this.setState({
        jobDetails: updatedJobDetails,
        skills: updatedSkills,
        lifeAtCompany: updatedLifeAtCompany,
        similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      rating,
      packagePerAnnum,
      location,
    } = jobDetails
    return (
      <div className="job-details-container">
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="job-details-company-logo"
          />
          <div className="job-details-title-container">
            <h1 className="job-details-title">{title}</h1>
            <div className="job-details-rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details-location-container">
          <div className="job-details-place-container">
            <div className="location-container">
              <MdPlace className=" icon place-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="job-details-type-container">
              <BsFillBriefcaseFill className=" icon briefCase-icon" />
              <p className="job-type">{employmentType}</p>
            </div>
          </div>
          <p className="job-details-package">{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="job-details-description-container">
          <div className="job-details-description-view">
            <h1 className="job-details-description-title">Description</h1>
            <div>
              <a href={companyWebsiteUrl} className="open-view-logo">
                <p className="logo-text">Visit</p>
                <IoOpenOutline className="outline-logo" />
              </a>
            </div>
          </div>
          <p className="job-details-description">{jobDescription}</p>
        </div>
      </div>
    )
  }

  renderSkillsView = () => {
    const {skills} = this.state
    // console.log(skills)
    return (
      <div className="skills-view">
        <h1 className="skill-heading">Skills</h1>

        <ul className="skill-items-container">
          {skills.map(eachItem => (
            <li className="skill-item">
              <img
                src={eachItem.imgUrl}
                alt={eachItem.name}
                className="skill-logo"
              />
              <p className="skill-title">{eachItem.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLifeAtCompanyView = () => {
    const {lifeAtCompany} = this.state
    const {description, imgUrl} = lifeAtCompany

    return (
      <div className="life-at-company-section">
        <h1 className="life-at-company-title">Life at Company</h1>
        <div className="life-at-company-view-container">
          <h1 className="description-life">{description}</h1>
          <img
            src={imgUrl}
            alt="life at company"
            className="life-at-company-img"
          />
        </div>
      </div>
    )
  }

  renderSimilarJobsView = () => {
    const {similarJobs} = this.state
    console.log(similarJobs)
    return (
      <div className="similar-jobs-view">
        <h1 className="similar-jobs-title">Similar Jobs</h1>
        <ul className="similar-jobs-cards-container">
          {similarJobs.map(eachItem => (
            <SimilarJobs jobData={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="job-details-loading-view" data-testid="loader">
      <Loader type="ThreeDots" color="white" height="80" width="80" />
    </div>
  )

  renderFailureView = () => (
    <div className="job-details-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="job details failure view"
        className="failure-img"
      />
      <h1 className="job-details-failure-view-text">
        Oops! Something Went Wrong
      </h1>
      <p className="job-details-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" type="button" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  successView = () => (
    <div className="job-details-section">
      <div className="job-details-view">
        {this.renderJobDetails()}
        {this.renderSkillsView()}
        {this.renderLifeAtCompanyView()}
      </div>
      <div className="similar-jobs-section">{this.renderSimilarJobsView()}</div>
    </div>
  )

  renderAllView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.successView()
      case 'FAILURE':
        return this.renderFailureView()
      case 'IN_PROGRESS':
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderAllView()}
      </>
    )
  }
}
export default JobDetails
