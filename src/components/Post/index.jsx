import {Link} from 'react-router-dom'

import PostActions from '../PostActions'
import CommentSection from '../CommentSection'

import './index.css'

const Post = props => {
  const {postDetails, isLiked, onClickLike, onClickUnlike} = props

  const {
    postId,
    userId,
    userName,
    profilePic,
    postDetails: postContent,
    likesCount = 0,
    comments = [],
    createdAt,
  } = postDetails

  const displayLikesCount = isLiked ? likesCount + 1 : likesCount

  return (
    <li className="post-item" data-testid="postItem">
      <div className="post-header">
        <img
          src={profilePic}
          alt="post author profile"
          className="post-author-profile-pic"
        />
        <Link to={`/users/${userId}`} className="post-username-link">
          <h1 className="post-username">{userName}</h1>
        </Link>
      </div>
      <img className="post-image" src={postContent.image_url} alt="post" />
      <div className="post-body">
        <PostActions
          isLiked={isLiked}
          onClickLike={() => onClickLike(postId)}
          onClickUnlike={() => onClickUnlike(postId)}
        />
        <p className="post-likes-count">{displayLikesCount} likes</p>
        <p className="post-caption">{postContent.caption}</p>
        <CommentSection comments={comments} />
        <p className="post-created-at">{createdAt}</p>
      </div>
    </li>
  )
}

export default Post
