// src/components/Home/index.js

import React, {Component} from 'react'
import './index.css'
import {HiOutlineSearch} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfilePage from '../ProfilePage'
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

  getGitHubbersDetails = async () => {
    const {username} = this.context
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const profileDetailsApiUrl = `https://apis2.ccbp.in/gpv/profile-details/${username}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(profileDetailsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        avatarUrl: data.avatar_url,
        bio: data.bio,
        blog: data.blog,
        company: data.company,
        createdAt: data.created_at,
        email: data.email,
        eventsUrl: data.events_url,
        followers: data.followers,
        followersUrl: data.followers_url,
        following: data.following,
        followingUrl: data.following_url,
        gistsUrl: data.gists_url,
        gravatarId: data.gravatar_id,
        hireable: data.hireable,
        htmlUrl: data.html_url,
        id: data.id,
        location: data.location,
        login: data.login,
        name: data.name,
        nodeId: data.node_id,
        organizationsUrl: data.organizations_url,
        publicGists: data.public_gists,
        publicRepos: data.public_repos,
        receivedEventsUrl: data.received_events_url,
        reposUrl: data.repos_url,
        siteAdmin: data.site_admin,
        starredUrl: data.starred_url,
        subscriptionsUrl: data.subscriptions_url,
        twitterUsername: data.twitter_username,
        type: data.type,
        updatedAt: data.updated_at,
        url: data.url,
      }
      this.setState(prevState => ({
        profileDetails: [...prevState.profileDetails, updatedData],
        apiStatus: apiStatusConstants.success,
      }))
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  tryAgain = () => {
    this.setState({isInvalid: false, errorMsg: ''})
    this.getGitHubbersDetails()
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
      <button
        className="try-again-button"
        type="button"
        onClick={this.tryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  onSearch = () => {
    const {username} = this.context

    if (!username.trim()) {
      this.setState({
        isInvalid: true,
        errorMsg: 'Enter the valid github username',
        profileDetails: [],
      })
    } else {
      this.getGitHubbersDetails()
      this.setState({isInvalid: false, errorMsg: ''})
    }
  }

  renderProfileView = () => (
    <ProfilePage userProfileDetails={this.state.profileDetails} />
  )

  renderLandingPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {username, changeUsername} = this.context
    const {isInvalid, profileDetails} = this.state

    return (
      <div className="home-page-container">
        <Header />
        <div className="centered-content">
          <div className="search-container">
            <div className="text-input-container">
              <input
                type="search"
                className="text-input"
                id="search-input"
                value={username}
                placeholder="Enter GitHub username"
                onChange={e => changeUsername(e.target.value)}
                style={{borderColor: isInvalid ? 'red' : 'initial'}}
              />
              <button
                data-testid="searchButton"
                type="button"
                className="search-icon-button"
                onClick={this.onSearch}
              >
                <HiOutlineSearch />
              </button>
            </div>
            {isInvalid && (
              <p className="error-message">Enter a valid GitHub username</p>
            )}
          </div>
          <div>
            {profileDetails.length === 0 ? (
              <>
                <h1 className="home-page-heading">GitHub Profile Visualizer</h1>
                <img
                  className="home-page-image"
                  src="https://res.cloudinary.com/dfxtnqgcz/image/upload/v1721058054/Group_2_1x_y0vqqa.png"
                  alt="gitHub profile visualizer home page"
                />
              </>
            ) : (
              this.renderLandingPage()
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
