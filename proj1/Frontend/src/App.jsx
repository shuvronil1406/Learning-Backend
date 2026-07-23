import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'

const App = () => {
  return (
    <Router> {/* Enables routing in the React app */}
      <Routes> {/* Container for all route definitions */}

        {/* Route for post creation page */}
        <Route path = "/create-post" element= {<CreatePost />} />

        {/* Route for feed page that shows all posts */}
        <Route path = "/feed" element= {<Feed/>} />
      </Routes>
    </Router>
  )
}

export default App // Main component exported to index.jsx/main.jsx