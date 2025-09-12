import "../Styles/HomePage.css";

const HomePage = ({ onLogout }) => {
  return (
    <div className="home-container">
      <h1 className="home-title">
        🔐 Home Page (User Portal)
      </h1>
      <button
        onClick={onLogout}
        className="logout-button"
      >
        Sign Out
      </button>
    </div>
  );
};

export default HomePage;
