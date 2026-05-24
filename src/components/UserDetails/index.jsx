import {useState, useEffect, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'

import apiStatusConstants from '../../constants/apiStatus'
import {normalizeUserProfile} from '../../utils/normalizeProfile'
import Header from '../Header'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import Profile from '../Profile'

import './index.css'

const UserDetails = () => {
  const {id} = useParams()
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [profileData, setProfileData] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  const getUserProfileData = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const accessToken = Cookies.get('jwt_token')
    const userProfileUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      headers: {Authorization: `Bearer ${accessToken}`},
      method: 'GET',
    }

    try {
      const response = await fetch(userProfileUrl, options)
      if (response.ok === true) {
        const fetchedData = await response.json()
        setProfileData(normalizeUserProfile(fetchedData))
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [id])

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    handleWindowSizeChange()
    getUserProfileData()
    return () => window.removeEventListener('resize', handleWindowSizeChange)
  }, [getUserProfileData])

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <Profile
            profileData={profileData}
            isMobile={isMobile}
            profilePicAlt="user profile"
            storyAlt="user story"
            postAlt="user post"
            showNoPostsView
            profileType="user-profile"
          />
        )
      case apiStatusConstants.inProgress:
        return <LoaderView />
      case apiStatusConstants.failure:
        return (
          <FailureView
            onRetry={getUserProfileData}
            failureImageUrl="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1683130740/Group_7522something-went-wrong-image_hjsfjr.png"
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="user-profile-container">{renderView()}</div>
    </>
  )
}

export default UserDetails
