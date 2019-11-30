import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import SearchTool from '../../components/Search/SearchTool'
import HotSearch from '../../components/Search/HotSearch';
import SearchHistory from '../../components/Search/SearchHistory';
import SearchSuggest from '../../components/Search/SearchSuggest';
import MusicList from '../../components/MusicList/MusicList';

const Search = (props) => {
  const [init] = useState();
  useEffect(() => {
    props.fetchHotSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init])

  let body = '';

  if (props.keyword === '') {
    body = (
      <>
        <HotSearch data={props.hotSearch} onClick={props.fetchResult} />
        <SearchHistory onRemove={props.removeHistoryItem}
          history={props.history} onClick={props.fetchResult} />
      </>
    );
  } else if (props.result.length === 0) {
    body = (
      <SearchSuggest onClick={props.fetchResult}
        data={props.suggest} keyword={props.keyword} />
    );
  } else {
    body = <MusicList data={props.result} />;
  }

  return (
    <div>
      <SearchTool
        keyword={props.keyword}
        onChange={props.setKeyword}
        onFocus={props.unsetResult}
        onSubmit={props.fetchResult}
        onSuggest={props.fetchSuggest} />
      {body}
    </div>
  )
};


const mapState = ({ search }) => {
  return {
    hotSearch: search.hotSearch,
    suggest: search.suggest,
    result: search.result,
    keyword: search.keyword,
    history: search.history,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchHotSearch() {
      dispatch({
        type: 'search/fetchHotSearch'
      })
    },
    fetchSuggest(keyword) {
      dispatch({
        type: 'search/fetchSuggest',
        payload: keyword,
      })
    },
    fetchResult(keyword) {
      dispatch({
        type: 'search/fetchResult',
        payload: keyword,
      })
    },
    unsetResult() {
      dispatch({
        type: 'search/saveData',
        payload: {
          result: [],
        },
      })
    },
    removeHistoryItem(item) {
      dispatch({
        type: 'search/removeHistoryItem',
        payload: item
      })
    },
    setKeyword(keyword) {
      dispatch({
        type: 'search/saveData',
        payload: { keyword }
      })
    }
  }
}

export default connect(mapState, mapDispatch)(Search);
