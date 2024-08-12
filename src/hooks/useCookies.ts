import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useCookies = (cookieKey: string) => {
  const initialCookie = Cookies.get(cookieKey);
  const [cookie, setCookieState] = useState<string|null|undefined>(initialCookie);

  const setCookie = (value: string) => {
    Cookies.set(cookieKey, value, { expires: 1 / 3 });
    setCookieState(value);
  };

  const removeCookie = () => {
    Cookies.remove(cookieKey);
    setCookieState(null);
  };

  useEffect(() => {
    const actualCookie = Cookies.get(cookieKey);
    if (actualCookie !== cookie) {
      setCookieState(actualCookie);
    }
  }, [cookie, cookieKey]);

  return {
    value: cookie, 
    setValue: setCookie, 
    removeValue: removeCookie
  };
};

export default useCookies;
