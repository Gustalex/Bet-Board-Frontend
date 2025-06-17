import styles from './HomeHeader.module.css';
import { FiTrendingUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const HomeHeader = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    }
    const handleRegisterClick = () => {
        navigate('/register');
    }
    const handleAboutClick = () => {
        navigate('/about');
    }
    const handleHelpClick = () => {
        navigate('/help');
    }
    const handlePremiumClick = () => {
        navigate('/premium');
    }
    const handleLogoClick = () => {
        navigate('/');
    }

    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top ${styles.homeHeader}`}>
            <div className="container-fluid px-3 px-lg-4 mx-5">
                <div className={`navbar-brand ${styles.homeHeaderTitle}`} onClick={handleLogoClick}>
                    <FiTrendingUp className={styles.logoIcon} />
                    BetBoard
                </div>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNavDropdown" 
                    aria-controls="navbarNavDropdown" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <div className="w-100 d-flex justify-content-between align-items-center">
                        <div className="flex-grow-1 d-flex justify-content-center">
                            <div className="d-flex flex-column flex-lg-row gap-2">
                                <button className={styles.premiumButton} onClick={handlePremiumClick}>Premium</button>
                                <button className={styles.helpButton} onClick={handleHelpClick}>Help</button>
                                <button className={styles.aboutUsButton} onClick={handleAboutClick}>About Us</button>
                            </div>
                        </div>
                        
                        <div className="d-flex gap-2 mt-2 mt-lg-0 ms-5">
                            <button className={styles.loginButton} onClick={handleLoginClick}>Login</button>
                            <button className={styles.registerButton} onClick={handleRegisterClick}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default HomeHeader;