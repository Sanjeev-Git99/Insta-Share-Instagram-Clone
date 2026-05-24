import {FaSearch} from 'react-icons/fa'

import apiStatusConstants from '../../constants/apiStatus'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import Post from '../Post'

import './index.css'

const SearchResults = props => {
  const {
    apiStatus,
    searchResultsList,
    likedPostIds,
    onClickLike,
    onClickUnlike,
    getSearchResults,
    onChangeSearchInput,
    onSearchInputKeyDown,
    searchInput,
  } = props

  const renderInitialView = () => (
    <div className="search-results-initial-view-container">
      <img
        className="search-results-initial-view-search-icon-img"
        src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1684479910/1623738902553_qpxiqe.png"
        alt="search-icon"
      />
      <p className="search-results-initial-view-description">
        Search Results will be appear here
      </p>
    </div>
  )

  const renderSuccessView = () => {
    const showSearchResults = searchResultsList.length > 0

    return (
      <div className="search-results-success-view">
        {showSearchResults ? (
          <>
            <h1 className="search-results-success-view-heading">
              Search Results
            </h1>
            <ul className="search-results-list-container">
              {searchResultsList.map(eachPost => (
                <Post
                  key={eachPost.postId}
                  postDetails={eachPost}
                  isLiked={likedPostIds.includes(eachPost.postId)}
                  onClickLike={onClickLike}
                  onClickUnlike={onClickUnlike}
                />
              ))}
            </ul>
          </>
        ) : (
          <div className="search-results-success-view-search-not-found">
            <img
              className="search-results-success-view-search-not-found-image"
              src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1684481635/Groupsearch-notfound-img_x7hs6m.png"
              alt="search not found"
            />
            <h1 className="search-results-success-view-search-not-found-heading">
              Search Not Found
            </h1>
            <p className="search-results-success-view-search-not-found-description">
              Try different keyword or search again
            </p>
          </div>
        )}
      </div>
    )
  }

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return renderInitialView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.inProgress:
        return <LoaderView />
      case apiStatusConstants.failure:
        return (
          <FailureView
            onRetry={getSearchResults}
            failureImageUrl="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1683130740/Group_7522something-went-wrong-image_hjsfjr.png"
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <div className="search-results-mobile-search-input-container">
        <input
          type="search"
          value={searchInput}
          className="search-results-mobile-search-input"
          onChange={onChangeSearchInput}
          onKeyDown={onSearchInputKeyDown}
          placeholder="Search Caption"
        />
        <button
          type="button"
          className="search-results-mobile-search-icon-btn"
          onClick={getSearchResults}
        >
          <FaSearch className="search-results-mobile-search-icon" />
        </button>
      </div>
      {renderView()}
    </>
  )
}

export default SearchResults
