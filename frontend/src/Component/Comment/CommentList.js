import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';

import { Typography, Card, CardHeader, Avatar, CardContent } from '@material-ui/core';

class CommentList extends Component {
  render() { 
    const { comments: allComments, parentId } = this.props;
    const comments = allComments.filter(p => p.parentId === parentId);

    return (
      comments && (
        <div>
          {comments.map(comment => (
            <Card key={comment.id} className="CommentCard">
              <CardHeader
                avatar={<Avatar>{comment.author.charAt(0)}</Avatar>}
                title={comment.author}
                subheader={`On ${moment(comment.timestamp).format('LLL')}`}
              />
              <CardContent>
                <Typography>{comment.body}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    );

  }
}

const mapStateToProps = state => ({ categories: state.categories.categories, posts: state.posts.posts, comments: state.comment.comments })
export default connect(mapStateToProps)(CommentList);