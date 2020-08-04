import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import PictureGrid from '../../../components/PictureGrid'
import useInitialize from '../../../utils/internal'
import withScrollBar from '../../../components/withScrollBar'

const TopList = ({ history, toplists, fetchTopLists, setList }) => {
  useInitialize(() => fetchTopLists());
  
  const toList = (data) => {
    setList(data);
    history.push('/playlist/' + data.id);
  };

  return (
    <div>
      <PictureGrid onClick={toList} data={toplists} />
    </div>
  )
};

const mapState = ({ toplist }) => {
  const { toplists } = toplist;
  return {
    toplists,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchTopLists() {
      dispatch({
        type: 'toplist/fetchTopLists'
      })
    },
    setList(data) {
      dispatch({
        type: 'playlist/saveData',
        payload: data,
      })
    },
  }
}

export default connect(mapState, mapDispatch)(withScrollBar(withRouter(TopList)));
