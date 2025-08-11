import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import AuthMain from './components/auth/AuthMain';
import { useGetMyProfileQuery } from './service/user/userService';
import { useEffect } from 'react';
import { setAuth } from './redux/auth/authSlice';
import AppLayout from './AppLayout';
import AppLoading from './components/loading/AppLoading';

function App() {
  const { data, isLoading, isError } = useGetMyProfileQuery();
  const auth = useSelector(state => state.auth.user);
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setAuth(data?.user))
    }
  }, [data, dispatch])

  if (isLoading) {
    return <AppLoading/>
  }


  if (!auth && !isLoading) {
    return <AuthMain />
  }

  if (isError && !isLoading && !auth) {
    return <h1>Error</h1>
  }

  return <AppLayout/>
}

export default App;
