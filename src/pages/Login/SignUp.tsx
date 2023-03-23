import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SingUpTry } from '../../components/Authentication/SignUp'
import { AppContext } from '../../context/dataProvider'
const Signup = () => {
  const { setMenuIsVisible } = useContext(AppContext)

  useEffect(() => {
    setMenuIsVisible(false)
  }, [])

  return (
    <div className=" w-full  ">
      <div className="h-[120px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <div className="h-full w-full bg-primary"></div>
      </div>
      <div className="mx-auto relative bottom-16  max-w-[20rem] md:max-w-[24rem] lg:max-w-[28rem] ">
        <div className="mb-8 border border-[#ddd] p-5 xl:p-8">
          <h3 className="mb-6 text-xl font-normal lg:text-2xl">
            Create Account
          </h3>
          <SingUpTry />
          <div className="mt-4 px-2 text-[10px] lg:mt-8 lg:text-xs">
            By continuing, you agree to GureShop's
            <a href="#sd" className="mx-1 text-blue-600">
              Conditions of Use
            </a>
            and Privacy Notice.
          </div>
          <div className="mt-2 text-sm lg:text-base">
            already have an account?
            <Link to="/login" className="ml-1 text-blue-600">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
