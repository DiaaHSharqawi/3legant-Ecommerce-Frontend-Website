import { Link } from "react-router-dom";

function HeroButton() {
  return (
    <div className="shopeButton pb-5">
      <Link type="button" className="btn btn-dark btn-lg" to="/products">
        Shopping now
      </Link>
    </div>
  );
}

export default HeroButton;
