import './index.css'

const FailureView = props => {
  const {onRetry, failureImageUrl} = props

  return (
    <div className="failure-view-container">
      <img
        className="failure-view-image"
        src={
          failureImageUrl ||
          'https://res.cloudinary.com/dvbuzxcwn/image/upload/v1779547416/Group_7522_g0chkv.png'
        }
        alt="failure view"
      />
      <p className="failure-view-text">
        Something went wrong. Please try again
      </p>
      <button type="button" className="failure-view-button" onClick={onRetry}>
        Try again
      </button>
    </div>
  )
}

export default FailureView
