import BackButton from "../BackButton";
import "../styles/interview.css";

const Interview = () => {
  return (
    <div className="interview-bg">
      <div className="interview-card">
        <BackButton />

        <h2>Interview Preparation</h2>
        <ul>
          <li>Explain your React project architecture</li>
          <li>What challenges did you face?</li>
          <li>How did you manage state?</li>
          <li>How did you handle API errors?</li>
          <li>Explain JWT authentication flow</li>
        </ul>
      </div>
    </div>
  );
};

export default Interview;
