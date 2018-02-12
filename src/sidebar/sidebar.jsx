import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import './sidebar.css';

export class Siderbar extends Component {
  render() {
    return (
     <ul className="sidebar">
      <li><NavLink to="/stories" activeClassName="active">Stories</NavLink></li>
      <li><NavLink to="/comments" activeClassName="active">Comments</NavLink></li>
      <li><NavLink to="/jobs" activeClassName="active">Jobs</NavLink></li>
      <li><NavLink to="askHn" activeClassName="active">Ask HN</NavLink></li>
     </ul>
    );
  }
}