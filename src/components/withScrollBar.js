import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const withScrollBar = (WrappedComponent) => {
  return (props) => {
    return (
      <Scrollbars key={props.key} autoHide>
        <WrappedComponent {...props} />
      </Scrollbars>
    )
  };
};

export default withScrollBar