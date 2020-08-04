import React, { useState } from 'react';
import { SearchBar } from 'antd-mobile';

const SearchTool = ({ keyword, onChange, onSuggest, onSubmit, onFocus }) => {

  const [timer, setTimer] = useState(null);

  const debOnChange = (val) => {
    onChange(val);
    if (timer !== null) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(() => {
      onSuggest(val);
    }, 500))
  }

  return (
    <SearchBar
      placeholder="搜索歌曲、歌手、专辑"
      value={keyword}
      onChange={debOnChange}
      onSubmit={onSubmit}
      onFocus={onFocus}
    />
  );
}

export default SearchTool;
