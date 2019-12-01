import React from 'react';
import { connect } from 'dva';
import MusicListItem from './MusicListItem';
import styles from './MusicList.less'


const MusicList = ({ data, withRank, handleClick, highlight }) => {

  const renderItem = (item, index) => {
    return <MusicListItem rank={withRank && index + 1} highlight={withRank && highlight}
      onClick={() => handleClick(item)} key={item.id} data={item} />
  }

  return (
    <div className={styles.container}>
      {data.map(renderItem)}
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