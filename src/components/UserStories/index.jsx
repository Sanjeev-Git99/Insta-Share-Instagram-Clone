import {useState, useEffect, useCallback} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import apiStatusConstants from '../../constants/apiStatus'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import UserStory from '../UserStory'

import './index.css'

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 1,
  slidesToShow: 4,
  centerPadding: '50px',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 9999,
      settings: {
        slidesToShow: 7,
      },
    },
  ],
}

const UserStories = () => {
  const [usersStories, setUsersStories] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getStories = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const accessToken = Cookies.get('jwt_token')
    const storiesUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {Authorization: `Bearer ${accessToken}`},
      method: 'GET',
    }

    try {
      const response = await fetch(storiesUrl, options)
      if (response.ok === true) {
        const fetchedData = await response.json()
        const stories = fetchedData.users_stories ?? []
        const updatedData = stories.map(eachStory => ({
          userId: eachStory.user_id,
          userName: eachStory.user_name,
          storyUrl: eachStory.story_url,
        }))
        setUsersStories(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [])

  useEffect(() => {
    getStories()
  }, [getStories])

  const renderSuccessView = () => (
    <div className="stories-slider-wrapper">
      <Slider {...sliderSettings}>
        {usersStories.map(eachStory => (
          <UserStory key={eachStory.userId} storyDetails={eachStory} />
        ))}
      </Slider>
    </div>
  )

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.inProgress:
        return <LoaderView />
      case apiStatusConstants.failure:
        return <FailureView onRetry={getStories} />
      default:
        return null
    }
  }

  return <div className="user-stories-container">{renderView()}</div>
}

export default UserStories
