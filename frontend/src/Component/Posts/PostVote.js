import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CardActions, IconButton, Typography } from '@material-ui/core';
import UpVoteIcon from '@material-ui/icons/ThumbUp';
import DownVoteIcon from '@material-ui/icons/ThumbDown';

import { vote } from '../../Actions/RootActions';

class PostVote extends Component {
  vote(type) {
    const { post, posts } = this.props;
    //console.log(post);
    //console.log(posts);

    this.props.vote(post.id, type);
  }

  render() {
    const { post } = this.props;
    //console.log('PostVote.render');
    //console.log(this.props.posts);

    return (
      <CardActions disableActionSpacing>
        <IconButton onClick={() => this.vote('upVote')}>
          <UpVoteIcon />
        </IconButton>
        <IconButton onClick={() => this.vote('downVote')}>
          <DownVoteIcon />
        </IconButton>
        <Typography>({post.voteScore})</Typography>
      </CardActions>
    );
  }
}
 
//const mapStateToProps = state => ({ posts: state.root.posts });
const mapDispatchToProps = dispatch => bindActionCreators({ vote }, dispatch)
export default connect(null, mapDispatchToProps)(PostVote);