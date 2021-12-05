import React, { Component } from 'react';
import App from './App';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import NoMatch from './pages/NoMatch';
import NavigationBar from './NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function Root() {
  const routes = [
    { path: '/', name: 'Home', Component: App, exact: true },
    { path: '/about', name: 'About', Component: About, exact: false },
    { path: '/contact', name: 'Contant', Component: Contact, exact: false },
    { path: '/blog', name: 'Blog', Component: Blog, exact: true },
    {
      path: '/blog/:id',
      name: 'Blog Posts',
      Component: BlogPost,
      exact: false,
    },
    { path: '*', name: 'No Match', Component: NoMatch, exact: false },
  ];
  return (
    <Router>
      <div className="todo-app-container">
        <NavigationBar />
        <div className="content">
          <Routes>
            {routes.map(({ path, Component, exact }) => (
              <Route
                key={path}
                path={path}
                exact={exact}
                element={<Component />}
              />
            ))}
          </Routes>
          {/* Route Markup vs Mapping over array
            <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} exact />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
            */}
        </div>
      </div>
    </Router>
  );
}
