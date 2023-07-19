import Header from '../Header'
import './index.css'

const Home = props => {
  const findJobsList = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div className="container">
      <Header />
      <div className="home-container">
        <div className="home-text-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="app-description">
            Millions of people are searching for jobs,salary information,company
            reviews. Find the job that fits your abilities and potential.
          </p>
          <button
            type="button"
            className="find-jobs-btn"
            onClick={findJobsList}
          >
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  )
}
export default Home
