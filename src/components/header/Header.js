import React from 'react';
import './header.css';

const Header = () => {
	return (
		<div className="header">
        <nav className="navbar navbar-light bg-light">
  <a className="navbar-brand" href="https://github.com/DevWichrowski">
    <img src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" width="30" height="30" className="d-inline-block align-top" alt="" />
    <span className="logo-text">
    DevWichrowski
    </span>
  </a>
      <span className='buttons-flex'>
      <a href="https://github.com/DevWichrowski"><button type="button" className="btn btn-info">Przekierowania 301</button><span className="sr-only">(current)</span></a>
      <a href="https://github.com/DevWichrowski"><button type="button" className="btn btn-info">Inne przekierowania</button></a>
      </span>
</nav>
		</div>
	);
};

export default Header;
