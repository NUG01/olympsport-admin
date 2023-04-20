import React from 'react'
import checkAuth from '../guards/checkAuth'

function MainPage() {
  return <h1 style={{backgroundColor: 'red'}}>home</h1>

}

// export default checkAuth(MainPage)
export default MainPage
