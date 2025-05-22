import { galleryImages } from "../../data/NewsFeedData";
import NewsFeedGalleryImage from "./components/NewsFeedGalleryImage";

function NewsFeedGallery() {
  return (
    <div className="gallery gy-3">
      <div className="row gap-3">
        {galleryImages.map((galleryImage) => {
          return (
            <NewsFeedGalleryImage
              key={galleryImage.id}
              imagePath={galleryImage.path}
              imageName={galleryImage.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default NewsFeedGallery;
