import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as moment from 'moment';

import { Typography, Card, CardHeader, Avatar, CardContent } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

import { deleteComment } from '../../Actions/CommentActions';

const styles = theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      width: '100%',
    },
  },
  post: {
    flex: '0 1 70%',
  },
  detail: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  side: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flex: '0 1 30%',
  },
  headline: {
    marginTop: theme.spacing.unit,
  },
  headlineItems: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  body: {
    marginTop: theme.spacing.unit * 6,
  },
  divider: {
    marginTop: theme.spacing.unit * 6,
  },
  action: {
    display: 'flex',
  },
  vote: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  link: {
    ...theme.link
  },
});

class CommentList extends Component {
  handleDelete = (comment) => {
    const alertConfirmation = window.confirm(
      `Deseja excluir o comentário ${comment.author}?`
    )

    if (alertConfirmation) {
      const { posts } = this.props;
      const post = posts.find(p => p.id === comment.parentId);
        this.props.deleteComment(post, comment.id, comment.parentId);
    }
  }
  
  render() { 
    const { classes, comments: allComments, parentId } = this.props;
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
              <div>
                <IconButton aria-label="Like" onClick={() => {}}>
                  <Link to={`/commentEdit/${comment.id}`} className={classes.link}>
                    <Edit />
                  </Link>
                </IconButton>
                <IconButton aria-label="Like" onClick={() => this.handleDelete(comment)}>
                  <Delete />
                </IconButton>
              </div>
            </Card>
          ))}
        </div>
      )
    );

  }
}

const mapStateToProps = state => ({ categories: state.categories.categories, posts: state.posts.posts, comments: state.comments.comments })
const mapDispatchToProps = dispatch => bindActionCreators({ deleteComment }, dispatch)
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CommentList));