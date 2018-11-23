import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import { sortPostsBy } from '../Actions/PostActions';

class SelectSorting extends React.Component {
  constructor() {
    super();

    this.state = {
      options: [
        {
          label: 'Date',
          value: 'timestamp'
        },
        {
          label: 'Votes',
          value: 'voteScore'
        }
      ]
    };
  }

  render() {
    const { options } = this.state;
    const { sorting } = this.props;
    //console.log('homero');
    //console.log(sorting);
    return (
      <FormControl>
        <InputLabel htmlFor="sorting">Sort by</InputLabel>
        <Select inputProps={{ name: 'sorting', id: 'sorting' }} onChange={evt => this.props.sortPostsBy(evt.target.value)} value={sorting}>
          {options.map(o =>
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          )}
        </Select>
      </FormControl>
    );
  }
}

const mapStateToProps = state => ({ sorting: state.posts.sorting });
const mapDispatchToProps = dispatch => bindActionCreators({ sortPostsBy }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SelectSorting)