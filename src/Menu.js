import { Link, useNavigate } from 'react-router-dom'
import { contexteLogin } from './constantes'
import { useContext } from 'react'

export function Menu() {

    const context = useContext(contexteLogin);
    const navigate = useNavigate();

    function deleteToken(event) {
      event.preventDefault();
      context.setAccessToken(null)
      navigate("/")
    }

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/" className="navbar-item">Home</Link>
                </div>
                {
                  <div className="navbar-end">
                    <Link to="/search" className="navbar-item">Search</Link>
                    {context.accessToken === null ?
                      <Link to="/login" className="navbar-item">Login</Link> :
                      <Link to="/subscriptions" className="navbar-item">Subscriptions</Link>
                    }
                    {context.accessToken === null ?
                      <Link to="/" className="navbar-item">SignUp</Link>:
                      <Link to="/home" className="navbar-item" onClick={deleteToken}>Logout</Link>
                    }
                    <Link to="/" className="navbar-item">About</Link>:
                  </div>
                }
            </div>
        </nav>
    );
}
