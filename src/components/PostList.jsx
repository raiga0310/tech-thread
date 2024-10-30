import PropTypes from 'prop-types';

function PostList({ title, posts }) {
  return (
    <article className="posts">
        <h3>{title}</h3>
        <ul className="posts__list">
            {posts.map((post) => (
                <li key={post.id} className="posts__element">{post.post}</li>
            ))}
        </ul>
    </article>
  );
}

PostList.propTypes = {
    title: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired
};

export default PostList;
