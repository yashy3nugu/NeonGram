import React, { useState } from "react";
import GridIcon from "../Icons/GridIcon";
import PostModal from "../Modals/PostModal";

const PostGallery = ({ posts }) => {

    const [clickedPost, setClickedPost] = useState(null);

    const onClose = () => {
        setClickedPost(null);
        document.body.style.overflow = 'unset';
    }

    return (
        <div className="max-w-4xl px-3 mx-auto text-center">
            <hr className="border-gray-600 my-10"/>
            
            
            <div className="text-center grid grid-cols-2 sm:grid-cols-3 gap-6 mx-auto w-full mb-6">
                {posts && posts.map(post => (
                    <div className="">
                        <img src={post.postImage} alt={post.text} key={post._id} className="object-cover h-48 sm:h-56 md:h-72 w-full" onClick={() => setClickedPost(post)} />
                    </div>


                ))}

                {clickedPost && <PostModal post={clickedPost} onClose={onClose} />}

            </div>
        </div>
    )
}

export default PostGallery;