import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Content from './components/content';
import { useState } from 'react';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark-mode');
    };

    return (
        <div className={`page ${darkMode ? 'dark-mode' : ''}`}>
            <div className='nav-head'>
                <Header darkMode={darkMode} />
            </div>
            <Content darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Footer darkMode={darkMode} />
        </div>
    );
}

export default App;
