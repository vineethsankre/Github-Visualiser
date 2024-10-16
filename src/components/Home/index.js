// src/components/Home/index.js

import React, {Component} from 'react'
import './index.css'
import {HiOutlineSearch} from 'react-icons/hi'
import Cookies from 'js-cookie'
import Header from '../Header'
import ProfilePage from '../ProfilePage'
import LoadingView from '../LoadingView'
import UserContext from '../../context/UserContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  static contextType = UserContext

  state = {
    apiStatus: apiStatusConstants.initial,
    profileDetails: [],
    isInvalid: false,
    errorMsg: '',
  }

  componentDidMount() {
    this.getGitHubbersDetails()
  }

  onSuccessAuthentication = data => {
    this.setState({apiStatus: apiStatusConstants.success, isInvalid: false})
    const {changeUsername, addProfileDetails} = this.context
    changeUsername(data.login)
    addProfileDetails(data)
    Cookies.set('auth_token', data.id)
  }

  tryAgain = () => {
    this.onSubmitSearch({preventDefault: () => {}})
  }

  onFailureAuthentication = () => {
    this.setState({apiStatus: apiStatusConstants.failure, isInvalid: true})
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <h1 className="home-page-heading">GitHub Profile Visualizer</h1>
      <img
        className="failure-image"
        src="https://rawcdn.githack.com/chennachandrika/Mini_Project_Task_Flow_Manager/aff08ba65374b593c22bf3b26e9894ec8f812112/src/Components/LoginPage/resources/SomthingWentWrong.png"
        alt="something went wrong"
      />
      <h1 className="failure-text">Something went wrong. Please try again</h1>
      <button className="try-again-button" onClick={this.tryAgain}>
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => <LoadingView />

  onSubmitSearch = async event => {
    event.preventDefault()
    const {username} = this.context

    if (!username.trim()) {
      this.setState({isInvalid: true})
      return
    }

    this.setState({apiStatus: apiStatusConstants.inProgress})
    try {
      const url = `https://apis2.ccbp.in/gpv/profile-details/kentcdodds?api_key=`
      const response = await fetch(url)
      if (response.ok) {
        const userData = await response.json()
        this.onSuccessAuthentication(userData)
      } else {
        this.onFailureAuthentication()
      }
    } catch (error) {
      this.onFailureAuthentication()
    }
  }

  renderProfileView = () => <ProfilePage />

  renderLandingView = () => (
    <>
      <h1 className="home-page-heading">GitHub Profile Visualizer</h1>
      <img
        className="home-page-image"
        src="https://res.cloudinary.com/dfxtnqgcz/image/upload/v1721058054/Group_2_1x_y0vqqa.png"
        alt="gitHub profile visualizer home page"
      />
    </>
  )

  renderHomePage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return this.renderLandingView()
    }
  }

  render() {
    const {username, changeUsername} = this.context
    const {isInvalid} = this.state

    return (
      <div className="home-page-container">
        <Header />
        <div className="centered-content">
          <div className="search-container">
            <form
              className="text-input-container"
              onSubmit={this.onSubmitSearch}
            >
              <input
                type="search"
                className="text-input"
                value={username}
                placeholder="Enter GitHub username"
                onChange={e => changeUsername(e.target.value)}
                style={{borderColor: isInvalid ? 'red' : 'initial'}}
              />
              <button
                data-testid="searchButton"
                className="search-icon-button"
                type="submit"
              >
                <HiOutlineSearch />
              </button>
            </form>
            {isInvalid && (
              <p className="error-message">Enter a valid GitHub username</p>
            )}
          </div>
          {this.renderHomePage()}
        </div>
      </div>
    )
  }
}

export default Home
