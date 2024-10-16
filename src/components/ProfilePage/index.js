import {useContext} from 'react'
import {BsSearch} from 'react-icons/bs'
import {RiBuildingLine} from 'react-icons/ri'
import {IoLocationOutline} from 'react-icons/io5'
import {IoMdLink} from 'react-icons/io'
import './index.css'

const ProfilePage = props => {
  const {userProfileDetails} = props
  const profileObject = userProfileDetails[0]

  return (
    <div className='profile-container'>
      <img
        className='avatar-image'
        src={profileObject.avatarUrl}
        alt={profileObject.name}
      />
      <h1 className='user-name'>{profileObject.name}</h1>
      <p className='login-name'>{profileObject.login}</p>
      <p className='bio'>{profileObject.bio}</p>
      <div className='user-info-container'>
        <div className='userstats-container'>
          <p className='stat-number'>{profileObject.followers}</p>
          <p className='stat'>FOLLOWERS</p>
        </div>
        <hr className='divider' />
        <div className='userstats-container'>
          <p className='stat-number'>{profileObject.following}</p>
          <p className='stat'>FOLLOWING</p>
        </div>
        <hr className='divider' />
        <div className='userstats-container'>
          <p className='stat-number'>{profileObject.publicRepos}</p>
          <p className='stat'>PUBLIC REPOS</p>
        </div>
      </div>
      <div className='user-info-container'>
        <div className='userstats-container'>
          <p className='stat-number'>Company</p>
          <div className='stat-container'>
            <RiBuildingLine className='icon-style' />
            <p className='stat'>{profileObject.company}</p>
          </div>
        </div>
        <div className='userstats-container'>
          <p className='stat-number'>Company Url</p>
          <div className='stat-container'>
            <IoMdLink className='icon-style' />
            <p className='stat'>{profileObject.blog}</p>
          </div>
        </div>
        <div className='userstats-container'>
          <p className='stat-number'>Location</p>
          <div className='stat-container'>
            <IoLocationOutline className='icon-style' />
            <p className='stat'>{profileObject.location}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
