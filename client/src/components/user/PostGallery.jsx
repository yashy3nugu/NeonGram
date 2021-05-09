import React from "react";

const PostGallery = ({posts}) => {

    return (
        <div className="max-w-4xl text-center grid grid-cols-3 gap-6 mx-auto w-full mb-6">
        {posts && posts.map(post => (
            <div className="h-72">
                <img src={post.postImage} alt={post.text} key={post._id} className="object-cover h-72 w-full"/>
            </div>
            

        ))}
            
        </div>
    )
}

export default PostGallery;