import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

const Profile = props => {
  const {
    profileData = {},
    isMobile,
    profilePicAlt,
    storyAlt,
    postAlt,
    showNoPostsView = false,
    profileType = 'my-profile',
  } = props

  const prefix = profileType

  const {
    userId = '',
    username = '',
    userBio = '',
    profilePic = '',
    postsCount = 0,
    followersCount = 0,
    followingCount = 0,
    stories = [],
    posts = [],
  } = profileData

  const postsList = Array.isArray(posts) ? posts : []
  const shouldShowPosts = postsList.length > 0

  return (
    <div className={`${prefix}-success-view`}>
      <div className={`${prefix}-success-view-profile-section`}>
        {isMobile ? (
          <div
            className={`${prefix}-success-view-profile-mobile-info-container`}
          >
            <h1
              className={`${prefix}-success-view-profile-mobile-info-username`}
            >
              {username}
            </h1>
            <div
              className={`${prefix}-success-view-profile-mobile-info-stats-container`}
            >
              <img
                src={profilePic}
                alt={profilePicAlt}
                className={`${prefix}-success-view-profile-mobile-info-profile-pic`}
              />
              <div
                className={`${prefix}-success-view-profile-mobile-info-stats`}
              >
                <p
                  className={`${prefix}-success-view-profile-mobile-info-stats-count`}
                >
                  {postsCount}
                </p>
                <p
                  className={`${prefix}-success-view-profile-mobile-info-stats-type`}
                >
                  posts
                </p>
              </div>
              <div
                className={`${prefix}-success-view-profile-mobile-info-stats`}
              >
                <p
                  className={`${prefix}-success-view-profile-mobile-info-stats-count`}
                >
                  {followersCount}
                </p>
                <p
                  className={`${prefix}-success-view-profile-mobile-info-stats-type`}
                >
                  followers
                </p>
              </div>
              <div
                className={`${prefix}-success-view-profile-mobile-info-stats`}
              >
                <p
                  className={`${prefix}-success-view-profile-mobile-info-stats-count`}
                >
                  {followingCount}
                </p>
                <p
                  className={`${prefix}-success-view-profile-mobile-info-stats-type`}
                >
                  following
                </p>
              </div>
            </div>
            <div
              className={`${prefix}-success-view-profile-mobile-info-bio-container`}
            >
              <p
                className={`${prefix}-success-view-profile-mobile-info-bio-userId`}
              >
                {userId}
              </p>
              <p
                className={`${prefix}-success-view-profile-mobile-info-bio-description`}
              >
                {userBio}
              </p>
            </div>
          </div>
        ) : (
          <div
            className={`${prefix}-success-view-profile-desktop-info-container`}
          >
            <img
              src={profilePic}
              alt={profilePicAlt}
              className={`${prefix}-success-view-profile-desktop-info-profile-pic`}
            />
            <div
              className={`${prefix}-success-view-profile-desktop-info-stats-container`}
            >
              <h1
                className={`${prefix}-success-view-profile-desktop-info-stats-username`}
              >
                {username}
              </h1>
              <div
                className={`${prefix}-success-view-profile-desktop-info-stats-details-container`}
              >
                <p
                  className={`${prefix}-success-view-profile-desktop-info-stats-details-type`}
                >
                  <span
                    className={`${prefix}-success-view-profile-desktop-info-stats-details-count`}
                  >
                    {postsCount}
                  </span>{' '}
                  posts
                </p>
                <p
                  className={`${prefix}-success-view-profile-desktop-info-stats-details-type`}
                >
                  <span
                    className={`${prefix}-success-view-profile-desktop-info-stats-details-count`}
                  >
                    {followersCount}
                  </span>{' '}
                  followers
                </p>
                <p
                  className={`${prefix}-success-view-profile-desktop-info-stats-details-type`}
                >
                  <span
                    className={`${prefix}-success-view-profile-desktop-info-stats-details-count`}
                  >
                    {followingCount}
                  </span>{' '}
                  following
                </p>
              </div>
              <div
                className={`${prefix}-success-view-profile-desktop-info-bio-container`}
              >
                <p
                  className={`${prefix}-success-view-profile-desktop-info-bio-userId`}
                >
                  {userId}
                </p>
                <p
                  className={`${prefix}-success-view-profile-desktop-info-bio-description`}
                >
                  {userBio}
                </p>
              </div>
            </div>
          </div>
        )}

        <ul className={`${prefix}-success-view-stories-list-container`}>
          {stories.map(eachStory => (
            <li
              key={eachStory.id}
              className={`${prefix}-success-view-story-item`}
            >
              <img
                src={eachStory.image}
                alt={storyAlt}
                className={`${prefix}-success-view-story-item-image`}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className={`${prefix}-success-view-posts-section`}>
        <div className={`${prefix}-success-view-posts-icon-container`}>
          <BsGrid3X3 className={`${prefix}-success-view-posts-icon`} />
          <h1 className={`${prefix}-success-view-posts-icon-heading`}>Posts</h1>
        </div>
        {shouldShowPosts ? (
          <ul className={`${prefix}-success-view-posts-list-container`}>
            {postsList.map(eachPost => (
              <li
                key={eachPost.id}
                className={`${prefix}-success-view-posts-list-item`}
              >
                <img
                  src={eachPost.image}
                  alt={postAlt}
                  className={`${prefix}-success-view-posts-list-item-image`}
                />
              </li>
            ))}
          </ul>
        ) : (
          showNoPostsView && (
            <div className={`${prefix}-success-view-no-posts-container`}>
              <div
                className={`${prefix}-success-view-no-posts-icon-container`}
              >
                <BiCamera />
              </div>
              <h1 className={`${prefix}-success-view-no-posts-heading`}>
                No Posts
              </h1>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Profile
