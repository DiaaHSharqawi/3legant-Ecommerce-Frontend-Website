import "./assets/css/newsFeed.css";
import NewsFeedGallery from "./components/NewsFeedGallery/NewsFeedGallery";

import NewsFeedHeader from "./components/NewsFeedHeader";

function NewsFeedSection() {
  return (
    <>
      <div className="News-Feed-Section">
        <div className="container">
          <div className="row flex-column gap-3  text-center">
            <NewsFeedHeader />
            <NewsFeedGallery />
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsFeedSection;
