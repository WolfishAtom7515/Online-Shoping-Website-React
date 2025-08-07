import './footer.css';

interface FooterProps {
    darkMode: boolean;
}

function Footer({ darkMode }: FooterProps) {
    return (
        <footer className={darkMode ? 'footer dark-mode' : 'footer light-mode'}>
            <div className="footer-content">
                <p>&copy; 2024 Bob's Company. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
