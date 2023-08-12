import React from 'react'
import PagesStart from "../component/PagesStart"

const ErrorPage = () => {
  return (
    <div>
      <PagesStart page={"Error"}/>
      <h1 className='text-center display-1 mt-5 mb-0'>404</h1>
      <p className='text-center' style={{color:"#eb3e32"}}>Page not found</p>
    </div>
  )
}

export default ErrorPage