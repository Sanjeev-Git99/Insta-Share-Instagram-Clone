import {useState} from 'react'
import Cookies from 'js-cookie'

import apiStatusConstants from '../../constants/apiStatus'
import Header from '../Header'
import UserStories from '../UserStories'
import PostsList from '../PostsList'
import SearchResults from '../SearchResults'

import './index.css'
import '../SearchResults/index.css'

const Home = () => {
  const [searchMode, setSearchMode] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [searchResultsList, setSearchResultsList] = useState([])
  const [likedPostIds, setLikedPostIds] = useState([])

  const getSearchResults = async () => {
    setSearchMode(true)
    setApiStatus(apiStatusConstants.inProgress)
    const accessToken = Cookies.get('jwt_token')
    const searchUrl = `https://apis.ccbp.in/insta-share/posts?search=${encodeURIComponent(searchInput)}`
    const options = {
      headers: {Authorization: `Bearer ${accessToken}`},
      method: 'GET',
    }

    try {
      const response = await fetch(searchUrl, options)
      if (response.ok === true) {
        const fetchedData = await response.json()
        const posts = fetchedData.posts ?? []
        const updatedData = posts.map(eachPost => ({
          postId: eachPost.post_id,
          userId: eachPost.user_id,
          userName: eachPost.user_name,
          profilePic: eachPost.profile_pic,
          postDetails: eachPost.post_details,
          likesCount: eachPost.likes_count,
          comments: eachPost.comments ?? [],
          createdAt: eachPost.created_at,
        }))
        setSearchResultsList(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const onChangeSearchMode = () => {
    setSearchMode(prev => !prev)
  }

  const onChangeSearchModeDesktop = () => {
    setSearchMode(true)
  }

  const onChangeSearchModeOff = () => {
    setSearchMode(false)
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onSearchInputKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      getSearchResults()
    }
  }

  const onClickLike = async postId => {
    const accessToken = Cookies.get('jwt_token')
    const likeUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      headers: {Authorization: `Bearer ${accessToken}`},
      method: 'POST',
      body: JSON.stringify({like_status: false}),
    }
    await fetch(likeUrl, options)
    setLikedPostIds(prev => prev.filter(id => id !== postId))
  }

  const onClickUnlike = async postId => {
    const accessToken = Cookies.get('jwt_token')
    const likeUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      headers: {Authorization: `Bearer ${accessToken}`},
      method: 'POST',
      body: JSON.stringify({like_status: true}),
    }
    await fetch(likeUrl, options)
    setLikedPostIds(prev => [...prev, postId])
  }

  return (
    <>
      <Header
        searchMode={searchMode}
        pageActive="HOME"
        showSearch
        onChangeSearchInput={onChangeSearchInput}
        searchInput={searchInput}
        getSearchResults={getSearchResults}
        onSearchInputKeyDown={onSearchInputKeyDown}
        onChangeSearchMode={onChangeSearchMode}
        onChangeSearchModeOff={onChangeSearchModeOff}
        onChangeSearchModeDesktop={onChangeSearchModeDesktop}
      />
      {searchMode ? (
        <div className="search-results-container">
          <SearchResults
            onClickLike={onClickLike}
            onClickUnlike={onClickUnlike}
            getSearchResults={getSearchResults}
            likedPostIds={likedPostIds}
            searchResultsList={searchResultsList}
            apiStatus={apiStatus}
            onChangeSearchInput={onChangeSearchInput}
            onSearchInputKeyDown={onSearchInputKeyDown}
            searchInput={searchInput}
          />
        </div>
      ) : (
        <div className="home-container">
          <UserStories />
          <PostsList />
        </div>
      )}
    </>
  )
}

export default Home
