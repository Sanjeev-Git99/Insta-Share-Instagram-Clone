import './index.css'

const UserStory = props => {
  const {storyDetails} = props
  const {userName, storyUrl} = storyDetails

  return (
    <li className="user-story-item">
      <img src={storyUrl} alt="user story" className="user-story-image" />
      <h1 className="user-story-name">{userName}</h1>
    </li>
  )
}

export default UserStory
