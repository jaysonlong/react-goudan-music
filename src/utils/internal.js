import { useState, useEffect } from 'react';

export default function useInitialize(initFn) {
  const [init] = useState();
  useEffect(initFn, [init]);
}