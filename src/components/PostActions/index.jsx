import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'

import './index.css'

const PostActions = props => {
  const {isLiked, onClickLike, onClickUnlike} = props

  return (
    <div className="post-actions-container">
      {isLiked ? (
        <button
          type="button"
          className="post-action-btn"
          onClick={onClickLike}
          data-testid="unLikeIcon"
        >
          <FcLike className="post-action-fc-like-icon" />
        </button>
      ) : (
        <button
          type="button"
          className="post-action-btn"
          onClick={onClickUnlike}
          data-testid="likeIcon"
        >
          <BsHeart className="post-action-bs-heart-icon" />
        </button>
      )}
      <FaRegComment className="post-action-comment-icon" />
      <BiShareAlt className="post-action-share-icon" />
    </div>
  )
}

export default PostActions
