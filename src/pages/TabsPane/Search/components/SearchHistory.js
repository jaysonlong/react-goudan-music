import React from 'react';
import SearchHistoryItem from './SearchHistoryItem'


const SearchHistory = ({ history, onClick, onRemove }) => {
  return (
    <div>
      {history.map((item, idx) => (
        <SearchHistoryItem key={idx} onRemove={() => onRemove(item)}
          onClick={() => onClick(item)} content={item} />
      ))}
    </div>
  );
}

export default SearchHistory;