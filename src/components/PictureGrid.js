import React from 'react';
import styles from './PictureGrid.less';
import ImageHolder from './ImageHolder';

const colCnt = 3;

const PictureGrid = ({ data, onClick }) => {
  const rowCnt = Math.floor(data.length / colCnt);
  const temp = Array.apply(null, { length: rowCnt })

  const renderRow = (rowIdx, colCnt) => {
    const temp = Array.apply(null, { length: colCnt })
    return (
      <div key={rowIdx} className={styles.row}>
        {temp.map((_, idx) => {
          const item = data[rowIdx * colCnt + idx];
          return (
            <div onClick={() => onClick(item)} key={item.id} className={styles.child}>
              <ImageHolder src={item.picUrl} className={styles.img} />
              <span className={styles.title}>{item.name}</span>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {temp.map((_, idx) => renderRow(idx, colCnt))}
    </div>
  )
};

export default PictureGrid