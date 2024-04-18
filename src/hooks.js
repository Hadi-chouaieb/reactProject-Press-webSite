import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home/home';
import NavBar from './components/navbar/navbar';
import News from './components/news/new';
import Dashboard from './components/admin/Dashboard/Dashboard';
import Login from './components/admin/login/login';
import YouTubeCard from './components/cardJornal/cardYoutube/vedios';
import PageNotFound from './components/NotFound/notfound';
import RequiredAuth from './auth'
import More from './components/MoreArticle/More';
const Routers = () => {
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <>
      {currentRoute.substring(0, 5) !== "/Dash" && <NavBar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/news' element={<News />} />
        <Route path="/vdlive" element={<YouTubeCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/more/:article" element={<More />} />
        <Route path='*' element={<PageNotFound />} />
        <Route element={<RequiredAuth /> || <Login/>}>
          <Route path="/DashBoardAdmin/:template" element={<Dashboard />} />
        </Route>
      </Routes>

    </>
  );
};

export default Routers;