import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from 'react-router';

import * as moment from 'moment';
import { Card, ListItem, CardHeader, Avatar, CardContent, Typography, CardActions, IconButton, Button } from '@material-ui/core';

import PostVote from './PostVote';

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.goToDetail = this.goToDetail.bind(this);
  }

  goToDetail() {
    //this.setState({ ...this.state, redirect: true });
    const { post } = this.props;
    this.props.history.push(`/posts/${post.id}`);
  }

  render() {
    const { post } = this.props;
    //console.log('PostListItem.render');
    //console.log(this.props.posts);

    return (
      (
        <ListItem className="PostListItem">
          <Card className="CardPost">
            <CardHeader
              avatar={<Avatar>{post.title.charAt(0)}</Avatar>}
              title={post.title}
              subheader={`By: ${post.author} on ${moment(post.timestamp).format('LLL')}`}
            />
            <CardContent>
              <Typography>
                {post.body > 150 ? `${post.body.substr(0, 147)}...` : post.body}
              </Typography>
            </CardContent>
            <PostVote post={post}></PostVote>
            <CardActions>
              <Button color="secondary" fullWidth onClick={() => this.goToDetail()}>
                Read More
              </Button>
            </CardActions>
          </Card>
        </ListItem>
      )
    );
  }
}

// const mapStateToProps = state => {
//   //console.log('PostListItem.mapStateToProps');
//   //console.log(state);
  
//   return { posts: state.root.posts }
// }
// export default withRouter(connect(mapStateToProps)(PostListItem));
export default withRouter(PostList);