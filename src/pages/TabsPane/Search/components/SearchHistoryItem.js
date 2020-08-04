import React from 'react';
import styles from './SearchHistoryItem.less'

const historyIcon = require('../../../../assets/icons/history.svg');
const deleteIcon = require('../../../../assets/icons/delete.svg');

const SearchHistory = ({ content, onClick, onRemove }) => {
  const handleRemove = (ev) => {
    ev.stopPropagation();
    onRemove();
  }
  return (
    <div className={styles.item} onClick={onClick}>
      <span className={styles.history}>
        <img src={historyIcon} alt="" />
      </span>
      <span className={styles.content}>{content}</span>
      <span className={styles.delete}>
        <img src={deleteIcon} alt="" onClick={handleRemove} />
      </span>
    </div>
  );

}

export default SearchHistory;