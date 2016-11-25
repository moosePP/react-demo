import React from 'react';
import { Link } from 'react-router';

function Nav(props) {
  return
    <div>
      <Link to="/users">users</Link>
      <Link to="/setting">settings</Link>
    </div>
}


export default Nav;