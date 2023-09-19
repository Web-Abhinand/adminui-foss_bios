import styles from './Header.module.css'
// eslint-disable-next-line react/prop-types
const Header = ({ handleLogout }) => {
    return (
      <header className={styles.header}>
        <div className={styles.logo}>Logo</div>
        <div className={styles.logoutButtonContainer}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
    );
  };
export default Header