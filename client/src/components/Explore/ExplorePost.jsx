import React from 'react'

const ExplorePost = ({post}) => {
    return (
        <div className="h-72">
            <img src={post.postImage} alt={post.text} className="w-full h-72 object-cover"/>
        </div>
    )
}

export default ExplorePost
