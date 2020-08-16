import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from 'react-redux';
import { headersConfig } from '../components/Config';
export default function (ComposedClass, reload, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth(headersConfig)).then(async (response) => {
        if (await !response.payload.isAuth) {
          if (reload) {
            props.history.push('/login');
            window.location.reload(false);
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push('/login');
            window.location.reload(false);
          } else {
            if (reload === false) {
              props.history.push('/');
              window.location.reload(false);
            }
          }
        }
      });
    }, [dispatch, props.history, user.googleAuth]);

    return <ComposedClass {...props} user={user} />;
  }
  return AuthenticationCheck;
}
