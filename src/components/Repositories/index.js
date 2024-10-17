import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import UserContext from '../../context/UserContext'
import Header from '../Header'
import RepoCard from '../RepoCard'
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
    const {username} = this.context
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const repositoriesApiUrl = `https://apis2.ccbp.in/gpv/repos/${username}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(repositoriesApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.map(eachItem => ({
        allowForking: eachItem.allow_forking,
        archiveUrl: eachItem.archive_url,
        archived: eachItem.archived,
        assigneesUrl: eachItem.assignees_url,
        blobsUrl: eachItem.blobs_url,
        branchesUrl: eachItem.branches_url,
        cloneUrl: eachItem.clone_url,
        collaboratorsUrl: eachItem.collaborators_url,
        commentsUrl: eachItem.comments_url,
        compareUrl: eachItem.compare_url,
        contentsUrl: eachItem.contents_url,
        contributorsUrl: eachItem.contributors_url,
        createdAt: eachItem.crated_at,
        defaultBranch: eachItem.default_branch,
        deploymentsUrl: eachItem.deployments_url,
        description: eachItem.description,
        disabled: eachItem.disabled,
        downloadsUrl: eachItem.downloads_url,
        eventsUrl: eachItem.events_url,
        fork: eachItem.fork,
        forks: eachItem.forks,
        forksCount: eachItem.forks_count,
        forksUrl: eachItem.forks_url,
        fullName: eachItem.full_name,
        gitCommitsUrl: eachItem.git_commits_url,
        gitRefsUrl: eachItem.git_refs_url,
        gitTagsUrl: eachItem.git_tags_url,
        gitUrl: eachItem.git_url,
        hasDiscussions: eachItem.has_discussions,
        hasDownloads: eachItem.has_downloads,
        hasIssues: eachItem.has_issues,
        hasPages: eachItem.has_pages,
        hasProjects: eachItem.has_projects,
        hasWiki: eachItem.has_wiki,
        hooksUrl: eachItem.hooks_url,
        htmlUrl: eachItem.html_url,
        id: eachItem.id,
        isTemplate: eachItem.is_template,
        issueCommentsUrl: eachItem.issue_comments_url,
        issueEventsUrl: eachItem.issue_events_url,
        issuesUrl: eachItem.issues_url,
        keysUrl: eachItem.keys_url,
        labelsUrl: eachItem.labels_url,
        language: eachItem.language,
        languages: eachItem.languages.map(each => ({
          name: each.name,
          value: each.value,
        })),
        languageUrl: eachItem.languages_url,
        license: eachItem.license,
        mergesUrl: eachItem.merges_url,
        milestonesUrl: eachItem.milestones_url,
        mirrorUrl: eachItem.mirror_url,
        name: eachItem.name,
        nodeId: eachItem.node_id,
        notificationsUrl: eachItem.notifications_url,
        openIssues: eachItem.open_issues,
        openIssuesCount: eachItem.open_issues_count,
        owner: this.getOwner(eachItem.owner),
        permissions: this.getPermission(eachItem.permissions),
        private: eachItem.private,
        pullsUrl: eachItem.pulls_url,
        pushedAt: eachItem.pushed_at,
        releasesUrl: eachItem.releases_url,
        size: eachItem.size,
        sshUrl: eachItem.ssh_url,
        stargazersCount: eachItem.stargazers_count,
        stargazersUrl: eachItem.stargazers_url,
        statusesUrl: eachItem.statuses_url,
        subscribersUrl: eachItem.subscribers_url,
        subscriptionUrl: eachItem.subscription_url,
        svnUrl: eachItem.svn_url,
        tagsUrl: eachItem.tags_url,
        teamsUrl: eachItem.teams_url,
        topics: eachItem.topics,
        treesUrl: eachItem.trees_url,
        updatedAt: eachItem.updated_at,
        url: eachItem.url,
        visibility: eachItem.visibility,
        watchers: eachItem.watchers,
        watchersCount: eachItem.watchers_count,
        webCommitSignOffRequired: eachItem.web_commit_signoff_required,
      }))
      this.setState({
        repositories: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }
  renderNoDataFound = () => (
    <div className="nodata-found-container">
      <img
        src="https://res.cloudinary.com/ddsn9feta/image/upload/v1718949987/Repository-NoDataFound-2x_dzw1h2.png"
        alt="empty repositories"
        className="nodata-img"
      />
      <h1 className="nodata-heading">No Data Found</h1>
      <p className="nodata-desc">
        GitHub Username is empty, please provide a valid username for
        Repositories
      </p>
      <Link to="/">
        <button type="button" className="goto-home-btn">
          Go to Home
        </button>
      </Link>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )
  tryAgain = () => {
    this.fetchRepositories()
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
  renderRespositoriesListView = () => {
    const {repositories} = this.state
    return (
      <div className="repositories-container">
        {repositories.length === 0 ? (
          <div className="noData-Container">
            <img
              src="https://res.cloudinary.com/dfxtnqgcz/image/upload/v1721720233/Layer_3_bed9kr.png"
              alt="no repositories"
              className="no-data-image"
            />
            <h1 className="no-data-heading">No Repositories Found!</h1>
          </div>
        ) : (
          <>
            <h1 className="repositories-heading">Repositories</h1>
            <ul className="repositoriesList-container">
              {repositories.map(eachRepository => (
                <RepoCard
                  repositoryDetails={eachRepository}
                  key={eachRepository.id}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
  renderRepositoriesPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRespositoriesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {username} = this.context
    return (
      <>
        <Header />
        <div className="repositories-container">
          {username === ''
            ? this.renderNoDataFound()
            : this.renderRepositoriesPage()}
        </div>
      </>
    )
  }
}

export default Repositories
