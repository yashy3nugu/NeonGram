import React from 'react'

const ExplorePost = ({post,showPost}) => {
    return (
        <div className="explore__post h-72 rounded-lg overflow-hidden" onClick={() => showPost(post)}>
            <img src={post.postImage} alt={post.text} className="w-full h-72 object-cover"/>
        </div>
    )
}

export default ExplorePost
