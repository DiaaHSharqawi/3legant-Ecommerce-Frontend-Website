import { Oval } from "react-loader-spinner";

function CustomLoader() {
  return (
    <div className="loader mx-auto my-5 d-flex justify-content-center">
      <Oval
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="oval-loading"
      />
    </div>
  );
}

export default CustomLoader;
