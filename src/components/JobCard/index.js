import {AiFillStar} from 'react-icons/ai'
import {MdPlace} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    title,
    rating,
    location,
    id,
    companyLogoUrl,
    jobDescription,
    employmentType,
    packagePerAnnum,
  } = jobData

  return (
    <Link to={`/jobs/${id}`} className="job-card-link-item">
      <li className="job-card-item">
        <div className="job-card">
          <div className="company-logo-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="job-title-container">
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>

          <div className="company-details-container">
            <div className="company-type-location-container">
              <div className="location-container">
                <MdPlace className=" icon place-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="job-type-container">
                <BsFillBriefcaseFill className=" icon briefCase-icon" />
                <p className="job-type">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <h1 className="description-title">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobCard
