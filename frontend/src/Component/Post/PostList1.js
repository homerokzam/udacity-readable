import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import { Card, CardHeader, CardContent, CardActions, CardActionArea, IconButton, Typography, Divider, Menu, MenuItem } from '@material-ui/core';
import Comment from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';

import PostVote from './PostVote';
import { deletePost } from '../../Actions/PostActions';

const styles = theme => ({
  card: {
    width: '100%',
    maxWidth: 380,
    margin: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    ...theme.link,
    outline: 0,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  actionIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  footer: {
    marginTop: 'auto',
    paddingRight: theme.spacing.unit,
  }
});

class PostList1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  handleMenuClick = (event) => {
    event.preventDefault();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDeletePost = () =>{
    const { deletePost, post } = this.props;

    const toastrConfirmOptions = {
      onOk: () => deletePost(post.id),
      onCancel: () => console.log('CANCEL: clicked')
    };
    toastr.confirm(`Deseja excluir o post '${post.title}'?`, toastrConfirmOptions);

    this.handleMenuClose();
  }

  handleGoToDetail() {
    //this.setState({ ...this.state, redirect: true });
    const { post } = this.props;
    this.props.history.push(`/posts/${post.id}`);
  }

  render() {
    const { post, classes } = this.props;
    const { author, category, body, commentCount, id, timestamp, title, voteScore } = post;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    //console.log(post);

    return (
      <Card className={`${classes.card} post`}>
        <Menu id="long-menu" anchorEl={anchorEl} open={open} onClose={this.handleMenuClose} >
          <Link className={classes.link} to={`/edit/${id}`} >
            <MenuItem onClick={this.handleMenuClose}>Editar</MenuItem>
          </Link>
          <MenuItem onClick={this.handleDeletePost}>
            Excluir
          </MenuItem>
        </Menu>
        <Link to={`/${category}/${id}`} className={classes.link}>
          <CardHeader action={
              <IconButton aria-label="More" aria-owns={open ? 'long-menu' : null} aria-haspopup="true" onClick={this.handleMenuClick} >
                <MoreVertIcon />
              </IconButton>
            }
            title={title}
            subheader={`by ${author} ${timestamp} ${category}`} />
          <CardContent>
            <Typography component="p">
              {/* {`${body.substring(0,160)}...`} */}
              {`${body}...`}
            </Typography>
          </CardContent>
        </Link>
        <div className={classes.footer}>
          <Divider />
          <CardActions className={classes.actions} disableActionSpacing>
            <div className={classes.actionIcon} style={{flexGrow: 1}}>
              <PostVote post={post}></PostVote>
            </div>
            <div className={classes.actionIcon} >
              {/* <FavoriteControl
                id={id}
              /> */}
              <IconButton aria-label="Comments" onClick={() => this.handleGoToDetail()} >
                <Comment />
              </IconButton>
              <Typography component="p">
                {commentCount}
              </Typography>
            </div>
          </CardActions>
        </div>
      </Card>
    )
  }
}

const mapStateToProps = state => ({ posts: state.posts.posts })
const mapDispatchToProps = dispatch => bindActionCreators({ deletePost }, dispatch)
export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList1)));