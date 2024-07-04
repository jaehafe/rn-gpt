import {useState, useCallback} from 'react';

export const useBooleanState = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const open = useCallback(() => setIsVisible(true), [setIsVisible]);

  const close = useCallback(() => setIsVisible(false), [setIsVisible]);

  const toggle = useCallback(() => setIsVisible(prev => !prev), [setIsVisible]);

  return {isVisible, open, close, toggle};
};
