import React from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const LoadingView = () => (
  <div className="loading-container" data-testid="loader">
    <Loader type="TailSpin" color="#0b69ff" height={50} width={50} />
  </div>
)

export default LoadingView
