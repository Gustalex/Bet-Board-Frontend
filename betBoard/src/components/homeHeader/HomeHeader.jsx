import styles from './HomeHeader.module.css';
import { FiTrendingUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const HomeHeader = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.homeHeader}>
            <div className={styles.homeHeaderTitle}>
                <FiTrendingUp size={42} color="#fff" style={{ verticalAlign: 'middle', marginRight: '12px' }} />
                BetBoard
            </div>
            <div className={styles.headerActions}>
                <button
                    className={styles.loginButton}
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
                <button
                    className={styles.registerButton}
                    onClick={() => navigate('/register')}
                >
                    Register
                </button>
            </div>
        </div>
    );
}

export default HomeHeader;