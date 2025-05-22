import PropTypes from "prop-types";
import Slider from "react-slick";
import { customSliderSettings } from "./customSliderSettings";

function CustomSlider({ children }) {
  return <Slider {...customSliderSettings}>{children}</Slider>;
}

CustomSlider.propTypes = {
  children: PropTypes.node,
};

export default CustomSlider;
