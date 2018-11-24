import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PostForm from './PostForm';
import { updatePost } from '../../Actions/PostActions';

class PostEdit extends Component {
  render() {
    const { posts, history, updatePost } = this.props;
    //console.log(this.props);
    const { id } = this.props.match.params;
    const post = posts.find(p => p.id === id);
    //console.log(post);

    return (
      <div>
        <PostForm post={post} onSubmit={ (post) => {
            updatePost(post)
            history.push('/')
          }}
        />
      </div>      
    );
  }
}
 
const mapStateToProps = state => ({ posts: state.posts.posts })
const mapDispatchToProps = dispatch => bindActionCreators({ updatePost }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);