import {AiFillStar} from 'react-icons/ai'
import {MdPlace} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {jobData} = props
  const {
    title,
    rating,
    companyLogoUrl,
    jobDescription,
    location,
    employmentType,
  } = jobData
  //   console.log(jobData)

  return (
    <li className="similar-job-card">
      <div className="card-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="card-company-logo"
        />
        <div className="card-title-container">
          <h1 className="card-title">{title}</h1>
          <div className="card-rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="card-description-title">Description</h1>
      <p className="card-description">{jobDescription}</p>
      <div className="card-location-container">
        <div className="location-container">
          <MdPlace className=" icon place-icon" />
          <p className="location">{location}</p>
        </div>
        <div className="card-employment-type-container">
          <BsFillBriefcaseFill className=" icon briefCase-icon" />
          <p className="job-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
