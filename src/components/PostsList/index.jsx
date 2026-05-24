import {useState, useEffect, useCallback} from 'react'
import Cookies from 'js-cookie'

import apiStatusConstants from '../../constants/apiStatus'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import Post from '../Post'

import './index.css'

const PostsList = () => {
  const [postsList, setPostsList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [likedPostIds, setLikedPostIds] = useState([])

  const getPosts = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const accessToken = Cookies.get('jwt_token')
    const postsUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {Authorization: `Bearer ${accessToken}`},
      method: 'GET',
    }

    try {
      const response = await fetch(postsUrl, options)
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
        setPostsList(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [])

  useEffect(() => {
    getPosts()
  }, [getPosts])

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

  const renderSuccessView = () => (
    <ul className="posts-list">
      {postsList.map(eachPost => (
        <Post
          key={eachPost.postId}
          postDetails={eachPost}
          isLiked={likedPostIds.includes(eachPost.postId)}
          onClickLike={onClickLike}
          onClickUnlike={onClickUnlike}
        />
      ))}
    </ul>
  )

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.inProgress:
        return <LoaderView />
      case apiStatusConstants.failure:
        return <FailureView onRetry={getPosts} />
      default:
        return null
    }
  }

  return <div className="posts-list-container">{renderView()}</div>
}

export default PostsList
