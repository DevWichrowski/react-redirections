import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="https://github.com/DevWichrowski">
                    <img
                        src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt=""
                    />
                    <span className="logo-text">DevWichrowski</span>
                </a>
                <span className="buttons-flex">
					<NavLink to="/">
						<button type="button" className="btn btn-info">
							Przekierowania 301
						</button>
						<span className="sr-only">(current)</span>
					</NavLink>
					<NavLink to="/narzedzia">
						<button type="button" className="btn btn-info">
							Narzedzia przekierowań
						</button>
					</NavLink>
					<NavLink to="/inne">
						<button type="button" className="btn btn-info">
							Inne
						</button>
					</NavLink>
				</span>
            </nav>
        </div>
    );
};

export default Header;
