import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button, Typography, Paper, Divider } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

import * as moment from 'moment';

import PostList from './PostList';
import PostVote from './PostVote';
import CommentList from '../Comment/CommentList';
import CommentNew from '../Comment/CommentNew';
import NotFound from '../NotFound';
import { getComments } from '../../Actions/CommentActions';
import { deletePost, getPost } from '../../Actions/PostActions';

class PostDetail extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   post: null
    // };
    this.handleBack = this.handleBack.bind(this);
  }

  async componentDidMount() {
    const { id: parentId } = this.props.match.params;
    //console.log('PostDetail.componentDidMount');
    //console.log(parentId);

    this.props.getComments(parentId);

    // var post = await getPost(parentId);
    // console.log(post);
    // this.setState({ post: post });
  }

  handleAddComment = () => {
    const { id: parentId } = this.props.match.params;
    this.props.history.push(`/commentAdd/${parentId}`);
  }

  handleBack = () => {
    //console.log(this.props);
    //console.log(this.props.history);
    this.props.history.goBack();
  }

  handleDelete = () => {
    const { removePost, history } = this.props;
    const { posts } = this.props;
    const { id: parentId } = this.props.match.params;
    const post = posts.find(p => p.id === parentId);

    const alertConfirmation = window.confirm(
      `Deseja excluir o post ${post.title}?`
    )

    if (alertConfirmation){
      this.props.deletePost(post.id)
        .then(() => { history.push('/') })
    }
  }
  
  render() { 
    const { classes, deletePost, history, votePost } = this.props;
    const { posts } = this.props;
    const { id: parentId } = this.props.match.params;
    const post = posts.find(p => p.id === parentId);
    //var post = this.state.post;
    //console.log('PostDetail.render');
    //console.log(parentId);
    //console.log(post);

    return (
      !post
      ? <NotFound />
      : <React.Fragment>
          <div className={classes.root}>
            <div className={classes.post}>
              <Paper className={classes.detail} elevation={1}>
                <Typography variant="h5" color="default">
                  {post.title}
                </Typography>
                <Typography variant="body1" color="default" className={classes.headline}>
                  by <strong>{post.author}</strong><span className={classes.headlineItems}>{moment(post.timestamp).format('LLL')}</span><strong>{post.category}</strong>
                </Typography>
                <Typography variant="body1" color="default" className={classes.body}>
                  {post.body}
                </Typography>

                <Divider className={classes.divider} />

                <Typography variant="body1" color="default" className={classes.body}>
                  Comentários: {post.commentCount}
                </Typography>
                <Divider className={classes.divider} />

                <div className={classes.action}>
                  <div className={classes.vote}>
                    <PostVote post={post} />
                  </div>
                  <div>
                    <IconButton aria-label="Like" onClick={() => {}}>
                      <Link to={`/edit/${post.id}`} className={classes.link}>
                        <Edit />
                      </Link>
                    </IconButton>
                    <IconButton aria-label="Like" onClick={this.handleDelete}>
                      <Delete />
                    </IconButton>
                  </div>
                </div>
              </Paper>
              <Paper className={classes.detail} elevation={1}>
                {/* <CommentList postId={post.id}/> */}
                <CommentList parentId={parentId} />
              </Paper>
              {/* <Paper className={classes.detail} elevation={1}>
                <CommentNew post={post} parentId={post.id} />
              </Paper> */}
            </div>
            
            <div>
              <Button variant="fab" color="primary" aria-label="Add" className={classes.button} onClick={() => this.handleAddComment()} >
                <AddIcon />
              </Button>
              
              <Button variant="fab" color="default" aria-label="Back" className={classes.button} onClick={() => this.handleBack()} >
                <ArrowBackIcon />
              </Button>
            </div>
          </div> 
        </React.Fragment>
    );
  }
}

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

const mapStateToProps = state => ({ posts: state.posts.posts })
const mapDispatchToProps = dispatch => bindActionCreators({ getComments, deletePost }, dispatch)
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PostDetail));