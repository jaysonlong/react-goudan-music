import React, { useState, useEffect } from 'react'
import { url2bgStyle } from '../../../utils/utils';

const defaultHolder = require('../../../assets/default_bg.jpg');

const BgHolder = ({ src, color, holder, className, children }) => {
  holder = holder || defaultHolder;

  const [done, setDone] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setDone(true);
    }
    return () => {
      img.onload = null;
    }
  }, [src]);

  // 若传入color值则以纯色背景作为holder
  if (color === undefined) {
    return (
      <div className={className} style={url2bgStyle(done ? src : holder)}>
        {children}
      </div>
    )
  } else {
    const colorStyle = { backgroundColor: color };
    return (
      <div className={className} style={done ? url2bgStyle(src) : colorStyle}>
        {children}
      </div>
    )
  }
}

export default BgHolder;