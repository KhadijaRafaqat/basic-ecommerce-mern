import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <nav>
           <h2>E-Commerce</h2>

           <ul>
            <li>
                <Link to='/'>Products</Link>
            </li>

            <li>
                <Link to='/add'>Add Products</Link>
            </li>

            <li>
                <Link to='/update/123'>Update</Link>
            </li>

            <li>
                <Link to='/profile'>Profile</Link>
            </li>

            <li>
                <Link to='/register'>Register</Link>
            </li>

            <li>
                <Link to='/login'>Login</Link>
            </li>
           </ul>
        </nav>
    );
}

export default Navbar;