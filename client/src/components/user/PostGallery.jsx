import React, {useState} from "react";
import PostModal from "./PostModal";

const PostGallery = ({posts}) => {

    const [clickedPost, setClickedPost] = useState(null);

    const onClose = () => {
        setClickedPost(null);
        document.body.style.overflow = 'unset';
    }

    return (
        <div className="max-w-4xl text-center grid grid-cols-3 gap-6 mx-auto w-full mb-6">
        {posts && posts.map(post => (
            <div className="h-72">
                <img src={`../${post.postImage}`} alt={post.text} key={post._id} className="object-cover h-72 w-full" onClick={() => setClickedPost(post)}/>
            </div>
            

        ))}
        
        {clickedPost && <PostModal post={clickedPost} onClose={onClose}/>}

        </div>
    )
}

export default PostGallery;