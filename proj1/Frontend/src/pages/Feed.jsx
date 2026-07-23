import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Feed = () => {
    // State to store all posts fetched from backend
    // Default one sample post is shown before real data loads
    const [posts, setPosts] = useState([{
        _id: 1,
        image : "https://ik.imagekit.io/wqczxlbte/image_tbZl2BnvL.jpg",
        caption : "beautiful picture"
    }])

    useEffect(() => {
        // Runs once when component loads (because dependency array is [])
        // Fetch all posts from backend API
        axios.get('http://localhost:3000/posts')
        .then((res) => {
            // Store fetched posts in state, which re-renders UI
            setPosts(res.data.post)
            // console.log(res.data.post)
        })
    },[])

    return (
        <section className='feed-section'>
        {
            // If posts exist, show list. If empty, show fallback message.
            posts.length > 0 ? (
                posts.map((post) =>(
                    <div key = {post._id} className = 'post-card'>
                        {/* Show uploaded image */}
                        <img src={post.image} alt = {post.caption} />

                        {/* Show caption below image */}
                        <p>{post.caption}</p>
                    </div>
                ))
            ) : (
                    <h1>No Posts Found</h1>
                )
        }
        </section>
    )
}

export default Feed // Export page for routing