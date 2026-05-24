import {useState, useEffect, useCallback} from 'react'
import Cookies from 'js-cookie'

import apiStatusConstants from '../../constants/apiStatus'
import {normalizeMyProfile} from '../../utils/normalizeProfile'
import Header from '../Header'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import Profile from '../Profile'

import './index.css'

const MyProfile = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [profileData, setProfileData] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  const getMyProfileData = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const accessToken = Cookies.get('jwt_token')
    const myProfileUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      headers: {Authorization: `Bearer ${accessToken}`},
      method: 'GET',
    }

    try {
      const response = await fetch(myProfileUrl, options)
      if (response.ok === true) {
        const fetchedData = await response.json()
        setProfileData(normalizeMyProfile(fetchedData))
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    handleWindowSizeChange()
    getMyProfileData()
    return () => window.removeEventListener('resize', handleWindowSizeChange)
  }, [getMyProfileData])

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <Profile
            profileData={profileData}
            isMobile={isMobile}
            profilePicAlt="my profile"
            storyAlt="my story"
            postAlt="my post"
            profileType="my-profile"
          />
        )
      case apiStatusConstants.inProgress:
        return <LoaderView />
      case apiStatusConstants.failure:
        return (
          <FailureView
            onRetry={getMyProfileData}
            failureImageUrl="https://res.cloudinary.com/dvbuzxcwn/image/upload/v1779547416/Group_7522_g0chkv.png"
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <Header pageActive="PROFILE" />
      <div className="my-profile-container">{renderView()}</div>
    </>
  )
}

export default MyProfile
