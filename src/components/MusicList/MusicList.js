import React from 'react';
import { connect } from 'dva';
import ReactList from 'react-list';
import MusicListItem from './MusicListItem';
import styles from './MusicList.less'


const MusicList = ({ data, withRank, handleClick, highlight }) => {

  const renderItem = (index, key) => {
    const item = data[index];
    return <MusicListItem rank={withRank && index + 1} highlight={withRank && highlight}
      onClick={() => handleClick(item)} key={key} data={item} />
  }

  return (
    <div className={styles.container}>
      <ReactList
        itemRenderer={renderItem}
        length={data.length}
        type='uniform'
        pageSize={10}
      />
    </div>
  )
};

const mapDispatch = (dispatch) => {
  return {
    handleClick(data) {
      dispatch({
        type: 'player/playSong',
        payload: data
      })
    }
  }
};

export default connect(null, mapDispatch)(MusicList)