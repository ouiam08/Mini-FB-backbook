import React from 'react';

function PostList({
  postList,
  handleDeletePost,
  handleAddPost,
  newPostData,
  handleInputChange,
  handleEditClick,
  handleUpdatePost,
  editPost,
  updatedPostData,
  setUpdatedPostData, handleDeconnexion
}) {
  return (
    <div>
        <button onClick={handleDeconnexion}>Deconnexion</button>
      <h1>Posts list</h1>
      <ul>
        {postList.map((post) => (
          <li key={post.id}>
            <h2>{post.photo}</h2>
            <p>{post.body}</p>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button><br />
            <button onClick={() => handleEditClick(post)}>Edit</button>
            {editPost && editPost.id === post.id && (
              <div>
                <input
                  type="file"
                  name="photo"
                  placeholder="photo"
                  value={updatedPostData.photo}
                  onChange={(e) =>
                    setUpdatedPostData({
                      ...updatedPostData,
                      photo: e.target.value,
                    })
                  }
                />
                <textarea
                  name="body"
                  placeholder="Body"
                  value={updatedPostData.body}
                  onChange={(e) =>
                    setUpdatedPostData({
                      ...updatedPostData,
                      body: e.target.value,
                    })
                  }
                />
                <br/>
                <button onClick={handleUpdatePost}>Update</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h1>Add New Post</h1>
      <br/>
      <div>
        <input
          type="file"
          name="photo"
          placeholder="photo"
          value={newPostData.photo}
          onChange={handleInputChange}
        />
        <textarea
          name="body"
          placeholder="Body"
          value={newPostData.body}
          onChange={handleInputChange}
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>
    </div>
  );
}

export default PostList;
