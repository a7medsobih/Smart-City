import { Link } from "react-router-dom";

function BackToHome() {
  return (
    <Link to="/" className="block p-4  hover:text-primary text-primary-dark">
      &larr; Back to home
    </Link>
  );
}

export default BackToHome;
