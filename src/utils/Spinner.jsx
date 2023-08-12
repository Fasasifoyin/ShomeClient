import { ThreeCircles } from 'react-loader-spinner'

export default function Spinner() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
        <ThreeCircles
  height="40"
  width="40"
  color="white"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel="three-circles-rotating"
  outerCircleColor=""
  innerCircleColor=""
  middleCircleColor=""
/>
    </div>
  )
}