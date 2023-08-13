import React, {FC} from 'react';

const Nav: FC = () => {
    return (
        <nav>
            <div className="nav-wrapper deep-orange ">
                <a href="#" className="brand-logo right">The true and only Task Manager</a>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">JavaScript</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;