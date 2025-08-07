import './header.css';
import logo from '../assets/Hackademy_Logo.png';

interface HeaderProps {
    darkMode: boolean; 
}

function Header({ darkMode }: HeaderProps) { 
    return (
        <div className={`header ${darkMode ? 'dark-mode' : ''}`}> 
            <div className='header-menu'>
                <h1>Home</h1>
                <h1>About us</h1>
                <img className='head-logo' src={logo} alt="logo" />
                <h1>My Account</h1>
                <h1>Contact</h1>
            </div>
            <div className='header-search'>
                <input placeholder="   ...Searching anything?"></input>
            </div>
        </div>
    );
}

export default Header;
