import React from 'react';
import { connect } from 'dva';
import SearchTool from './components/SearchTool'
import HotSearch from './components/HotSearch';
import SearchHistory from './components/SearchHistory';
import SearchSuggest from './components/SearchSuggest';
import MusicList from '../../../components/MusicList';
import useInitialize from '../../../utils/internal'
import withScrollBar from '../../../components/withScrollBar'

const Search = (props) => {
  useInitialize(() => props.fetchHotSearch());

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

export default connect(mapState, mapDispatch)(withScrollBar(Search));
