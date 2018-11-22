import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import * as moment from 'moment';

import PostVote from './PostVote';
import CommentNew from '../Comment/CommentNew';
import CommentList from '../Comment/CommentList';
import { getComments } from '../../Actions/CommentActions';

class Posts extends Component {

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    this.props.getComments(this.props.match.params.id);
  }

  handleBack = () => {
    //console.log(this.props);
    //console.log(this.props.history);
    this.props.history.push('/');
  }

  render() {
    const { posts } = this.props;
    const { id: parentId } = this.props.match.params;
    const post = posts.find(p => p.id === parentId);

    return(

      <div className="Container">
        <header>
          {post && (
            <div>
              <h1> {post.title}</h1>
            </div>
          )}
        </header>

        <main>{post && post.body && <Typography>{post.body}</Typography>}</main>

        <hr />
        {post && (
          <Typography variant="caption">
            Summary: The post has the total score of {post.voteScore} and{' '}
            {post.commentCount} comments.
          </Typography>
        )}
        <hr />
        {post && (
          <Typography variant="caption">
            By: {post.author} on {moment(post.timestamp).format('LLL')}
          </Typography>
        )}
        <hr />
        {post && <PostVote post={post} />}
        <hr />
        <Typography>Comments</Typography>
        { post && <CommentNew post={post} parentId={post.id} /> }
        { <CommentList parentId={parentId} /> }
        <Button variant="fab" color="primary" aria-label="Back" className="AddButton" onClick={() => this.handleBack()} >
          <ArrowBackIcon />
        </Button>
      </div>

    )
  }
}

const mapStateToProps = state => ({ posts: state.root.posts })
const mapDispatchToProps = dispatch => bindActionCreators({ getComments }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Posts);