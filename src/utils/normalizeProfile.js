const normalizePosts = posts => {
  if (!Array.isArray(posts)) {
    return []
  }

  return posts.map(eachPost => ({
    id: eachPost.id ?? eachPost.post_id,
    image: eachPost.image ?? eachPost.image_url ?? eachPost.post_image,
  }))
}

const normalizeStories = stories => {
  if (!Array.isArray(stories)) {
    return []
  }

  return stories.map(eachStory => ({
    id: eachStory.id ?? eachStory.story_id,
    image: eachStory.image ?? eachStory.image_url ?? eachStory.story_url,
  }))
}

export const normalizeMyProfile = fetchedData => {
  const profile = fetchedData.profile ?? {}

  const posts = normalizePosts(profile.posts)

  return {
    id: profile.id,
    userId: profile.user_id,
    username: profile.user_name,
    profilePic: profile.profile_pic,
    followersCount: profile.followers_count,
    followingCount: profile.following_count,
    userBio: profile.user_bio,
    posts,
    postsCount: profile.posts_count ?? posts.length,
    stories: normalizeStories(profile.stories),
  }
}

export const normalizeUserProfile = fetchedData => {
  const userDetails = fetchedData.user_details ?? {}

  const posts = normalizePosts(userDetails.posts)

  return {
    id: userDetails.id,
    userId: userDetails.user_id,
    username: userDetails.user_name,
    profilePic: userDetails.profile_pic,
    followersCount: userDetails.followers_count,
    followingCount: userDetails.following_count,
    userBio: userDetails.user_bio,
    posts,
    postsCount: userDetails.posts_count ?? posts.length,
    stories: normalizeStories(userDetails.stories),
  }
}
