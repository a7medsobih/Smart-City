import { Link } from "react-router-dom";
import Background from "../components/Background";

const Home = () => {
  return (
    <>
      <Background />
      <div>hello</div>
      <Link
        className="block bg-gradient-red p-2 m-3 rounded-2xl w-fit"
        to="/login"
      >
        Get Started
      </Link>
    </>
  );
};

export default Home;
