import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './routes/Home';
import Navigation from './components/common/Navigation';
import PostListPage from './routes/PostListPage';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import WritePage from './routes/WritePage';
import PostPage from './routes/PostPage';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from './containers/common/HeaderContainer';

const App = () => {
  return (
    <>
      <Helmet>
        <title>BEST MOVIES</title>
      </Helmet>
      
      <HeaderContainer />
      <Navigation />
      <Route component={Home} path="/" exact={true} />  
      <Route component={PostListPage} path={['/@:username', '/post']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:username/:postId" />
    </>
  );
};
export default App;
