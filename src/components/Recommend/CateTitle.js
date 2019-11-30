import React from 'react';
import PropTypes from 'prop-types'

const CateTitle = ({ title }) => (
  <div style={{ fontSize: '15px', margin: '15px 0', paddingLeft: '8px', borderLeft: '#d33a31 solid 2px' }}>
    {title}
  </div>
);

CateTitle.propTypes = {
  title: PropTypes.string
}

export default CateTitle