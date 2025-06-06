import styles from './Landing.module.css';
import { useNavigate } from 'react-router-dom';
import HomeHeader from '../../components/homeHeader/HomeHeader';


const Landing = () => {

    const navigate = useNavigate();
    
    const handleLoginClick = () => {
        navigate('/login');
    };
    
    const handleRegisterClick = () => {
        navigate('/register');
    };
    
    return (
        <div className={styles.landingContainer}>
            <HomeHeader />
        </div>
    );
}

export default Landing;