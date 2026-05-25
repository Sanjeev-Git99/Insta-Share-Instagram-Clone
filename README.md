# 📸 Insta-Share (Instagram Clone)

**Insta-Share** is a pixel-perfect, highly responsive Instagram clone built from scratch using the modern React ecosystem. The application demonstrates state-of-the-art frontend development practices, including secure JWT token-based cookie authentication, dynamic client-side routing, custom slider integrations, interactive liking, responsive layouts, and robust API error-handling.

---

## 🚀 Live Demo & Repository
- **Live Demo Link:** https://insta-share-instagram-clone.vercel.app 

---

## ✨ Features

- **🔐 Secure Authentication & Authorization**
  - Interactive login form with comprehensive field validation.
  - Session persistence using JWT tokens stored securely inside cookies (`js-cookie`).
  - Middleware-based route protection (`ProtectedRoute`) blocking unauthorized access.

- **📖 Dynamic User Stories**
  - Interactive stories slider component built with `react-slick`.
  - Gradient ring visual indicators matching active/visited story states.

- **🔥 Interactive Home Feed**
  - Renders a clean posts feed containing user details, captions, tags, and timestamps.
  - Optimistic client-side UI updates for **Liking/Unliking** posts via REST APIs.
  - Fully integrated comment sections per post.

- **🔍 Global Search Functionality**
  - Interactive search bar nested inside a responsive navbar.
  - Dynamically fetches, updates, and displays filtered posts with search-state loaders.
  - Beautiful empty/no-results states and retry boundaries on search failures.

- **👤 User & My Profiles**
  - Dynamic user profiling using React Router's `useParams` for `/users/:id` and a dedicated `/my-profile` path.
  - Grid and list views of user posts, follower/following metrics, highlight stories, and bio metadata.

- **🎨 Premium Responsive Vanilla CSS**
  - Built entirely using custom, fluid **Flexbox** and **Grid** layouts.
  - Standardized media queries ensuring fluid responsiveness on Mobile, Tablet, and Desktop screens.
  - Harmonious color scheme, smooth gradients, hover micro-animations, and glassmorphism headers.

- **🛡️ Resilience & Error Handling**
  - Interactive failure states with "Retry" triggers across all major modules (Feed, Stories, Search, Profile).
  - Clean "Not Found" error route boundaries.

---

## 🛠️ Technology Stack

- **Framework/Build:** [React 18] + [Vite 6]
- **Routing:** [React Router v7](Declarative Client-side routing
- **State & Lifecycle Management:** React Hooks (`useState`, `useEffect`, `useParams`, `useNavigate`)
- **Authentication:** `js-cookie` (secure, persistent JWT token handling)
- **Styling:** Vanilla CSS3 (CSS Variables, Flexbox, CSS Grids, Media Queries)
- **Carousels:** `react-slick` & `slick-carousel`
- **Icons & Loaders:** `react-icons`, `react-loader-spinner`

---

## 📂 Project Structure


src/
├── components/                # Reusable presentation components
│   ├── CommentSection/        # Renders comments for a post
│   ├── FailureView/           # Global retry view for API failures
│   ├── Header/                # Responsive navigation header & search bar
│   ├── LoginForm/             # Secured login handler
│   ├── MyProfile/             # Logged-in user's profile view
│   ├── NotFound/              # 404 boundary component
│   ├── Post/                  # Single post container
│   ├── PostActions/           # Likes, Comments & action triggers
│   ├── PostsList/             # Lists and maps feed posts
│   ├── Profile/               # Profile template structure
│   ├── ProtectedRoute/        # Authentication route wrapper
│   ├── UserDetails/           # Dynamic profile view for external users
│   ├── UserStories/           # Carousel stories feed
│   └── UserStory/             # Single story card bubble
├── App.jsx                    # Application Routes & entry layout
├── index.css                  # CSS Reset, variables, and typography
└── main.jsx                   # Vite bundle runner





🚀 Getting Started
To run this project locally, follow these steps:

1. Clone the repository
bash


git clone https://github.com/YOUR_USERNAME/insta-share.git
cd insta-share
2. Install dependencies
bash




3. Run the development server
bash


npm run dev
The server will start running at http://localhost:3000/ and automatically open in your default browser.

4. Build for production
bash


npm run build
🔑 Test Credentials
To preview and test the authenticated routes, use any of the credentials below:

Username	Password
rahul	rahul@2021
praneetha	praneetha@2021
