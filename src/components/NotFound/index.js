import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <img
      className="notfound-image"
      src="https://res.cloudinary.com/dfxtnqgcz/image/upload/v1721197020/Group_7519_1_uuqbt5.png"
      alt="page not found"
    />
    <h1 className="notfound-heading">PAGE NOT FOUND</h1>
    <p className="notfound-text">
      we are sorry, the page you requested could not be found <br />
      Please go back to the homepage.
    </p>
    <Link to="/">
      <button type="button" className="goback-button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
