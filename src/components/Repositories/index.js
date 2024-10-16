import {Component} from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Header from '../Header'
import LoadingView from '../LoadingView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class Repositories extends Component {
  static contextType = UserContext

  state = {
    apiStatus: apiStatusConstants.initial,
    repositories: [],
    isError: false,
  }

  componentDidMount() {
    this.fetchRepositories()
  }

  fetchRepositories = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {username} = this.context
    const apiUrl = `https://apis2.ccbp.in/gpv/repos/${username}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        repositories: data,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => <LoadingView />

  renderFailureView = () => (
    <div className="failure-view-container">
      <div className="failure-content">
        <img
          className="nodata-image"
          src="https://res.cloudinary.com/dfxtnqgcz/image/upload/v1721720233/Layer_3_bed9kr.png"
        />
        <h1 className="failure-text">No Repositories Found</h1>
      </div>
    </div>
  )

  renderRepositoriesPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRespositories()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-page-container">{this.renderRepositoriesPage()}</div>
    )
  }
}

export default Repositories
