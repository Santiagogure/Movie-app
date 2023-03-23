import { Route, Routes } from 'react-router-dom'

import { Catalog } from '../pages/Catalog/catalog'
import { Film } from '../pages/Films/film'
import { Home } from '../pages/Home/home'
import { Season } from '../pages/Season/season'
import Login from '../pages/Login/Login'
import Signup from '../pages/Login/SignUp'
import Account from '../pages/Account/Account.jsx'
import PrivateProfile from '../helper/privateRoutes/privateAccount'

export const Body = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/users/:username/username"
        element={
          <PrivateProfile>
            <Account />
          </PrivateProfile>
        }
      />
      <Route path="/movies" element={<Catalog type="movie" />}></Route>
      <Route path="/tv" element={<Catalog type="tv" />}></Route>
      <Route path="/search" element={<Catalog type="search" />}></Route>
      <Route path="/list/:listTitle" element={<Catalog type="list" />}></Route>
      <Route path="/movie/:id" element={<Film mediaType="movie" />}></Route>
      <Route path="/tv/:id" element={<Film mediaType="tv" />}></Route>
      <Route path="/tv/:id/season/:seasonNumber" element={<Season />}></Route>
    </Routes>
  )
}
