import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterItem = props => {
  const renderTypesOfEmployment = () => (
    <div className="employment-types-container">
      <ul className="filter-items-container">
        <hr className="filter-container-line" />

        <h1 className="filter-type-heading">Type of Employment</h1>
        {employmentTypesList.map(eachItem => {
          const {activeEmploymentType} = props

          const onClickChangeEmploymentType = () => {
            activeEmploymentType(eachItem.employmentTypeId)
          }

          return (
            <li className="filter-item">
              <input
                type="checkbox"
                id={eachItem.label}
                className="input-element"
              />

              <label
                htmlFor={eachItem.label}
                className="item-label"
                onClick={onClickChangeEmploymentType}
              >
                {eachItem.label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  const renderSalaryRanges = () => (
    <div className="salary-ranges-container">
      <ul className="filter-items-container">
        <hr className="filter-container-line" />

        <h1 className="filter-type-heading">Salary Range</h1>
        {salaryRangesList.map(eachItem => {
          const {activeMinimumPackage} = props
          const onClickFilterSalary = () => {
            activeMinimumPackage(eachItem.salaryRangeId)
          }
          return (
            <li className="filter-item">
              <input
                type="radio"
                id={eachItem.label}
                className="input-element"
              />
              <label
                htmlFor={eachItem.label}
                className="item-label"
                onClick={onClickFilterSalary}
              >
                {eachItem.label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <div className="filter-component">
      {renderTypesOfEmployment()}
      {renderSalaryRanges()}
    </div>
  )
}
export default FilterItem
