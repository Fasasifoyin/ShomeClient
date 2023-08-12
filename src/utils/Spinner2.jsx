import { ThreeCircles } from "react-loader-spinner";

export default function Spinner2() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <ThreeCircles
        height="100"
        width="100"
        color="#eb3e32"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
}
