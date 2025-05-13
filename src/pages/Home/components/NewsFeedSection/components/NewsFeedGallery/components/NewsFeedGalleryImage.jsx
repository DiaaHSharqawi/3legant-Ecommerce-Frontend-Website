import PropTypes from "prop-types";

function NewsFeedGalleryImage({ imageName, imagePath }) {
  return (
    <div className="col d-flex justify-content-center">
      <div className="image">
        <img
          src={imagePath}
          alt={imageName}
          className="img-fluid"
          loading="lazy"
        />
      </div>
    </div>
  );
}

NewsFeedGalleryImage.propTypes = {
  imageName: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
};

export default NewsFeedGalleryImage;
