import React from "react";

const ExplorePost = ({ post, showPost }) => {
  return (
    <div
      className="explore__post rounded-lg overflow-hidden"
      onClick={() => showPost(post)}
    >
      <img
        src={post.postImage}
        alt={post.text}
        className="w-full object-cover h-52 md:h-60 lg:h-60 xl:h-72"
      />
    </div>
  );
};

export default ExplorePost;
