import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./homeCategoriesSwiper.css";

import CustomLoader from "../../../../components/loader/CustomLoader";
import CustomSlider from "../../../../components/slider/CustomSlider";
import useCategories from "./../../../../hooks/useCategories/useCategories";
import HomeCategory from "./components/HomeCategory/HomeCategory";

function HomeCategories() {
  const API_URL = import.meta.env.VITE_API_URL;
  console.log(API_URL);

  const { categories, loader: isLoading } = useCategories();

  console.log(categories);

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <>
      <section className="Home-Categories-Section container my-5">
        <div className="container">
          <h2 className="text-capitalize fw-bold mx-3">browse by category</h2>
          <div className="slider-container my-5">
            <div className="products row">
              <CustomSlider>
                {categories &&
                  categories.map((category) => {
                    return (
                      <HomeCategory category={category} key={category.id} />
                    );
                  })}
              </CustomSlider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeCategories;
