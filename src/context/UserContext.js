// src/context/UserContext.js

import React from 'react'

const UserContext = React.createContext({
  username: '',
  changeUsername: () => {},
})

export default UserContext
