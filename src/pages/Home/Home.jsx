import HeroSection from "./components/Hero/Hero";
import HomeCategories from "./components/HomeCategories/HomeCategories";
import HomeKeyFeatures from "./components/KeyFeaturesSection/HomeKeyFeatures";
import NewsFeedSection from "./components/NewsFeedSection/NewsFeedSection";
function Home() {
  return (
    <>
      <HeroSection />
      <HomeCategories />
      <div className="my-5">
        <HomeKeyFeatures />
      </div>

      <div className="my-5">
        <NewsFeedSection />
      </div>
    </>
  );
}

export default Home;
