import { Link } from 'react-router-dom'
const Homepage = () => {
  return (
    <div className="h-screen w-full">
    <div className="flex flex-col justify-center items-start h-full bg-backgroundImage bg-cover bg-center">
        <h1 className='text-5xl font-bold text-gray-100 ml-16'>ZETA Finance Tracker</h1>
        <p className='ml-16 mt-6 text-xl w-1/3 leading-relaxed'>your go-to personal finance tracker! Simplify your finances, set and achieve your goals, and get insightful analytics on your spending habits. Start your journey to financial freedom with ZETA Finance Tracker today.</p>
        <Link to={'/register'}>
        <button className='bg-yellow-300 mt-10 ml-32 text-black pt-3 pb-3 pr-6 pl-6 rounded-md font-bold hover:bg-yellow-600'>
            Sign up &rarr;
        </button>
        </Link>
        </div>
        <p className='fixed bottom-0'>Wallpaper by <a href="https://unsplash.com">Unsplash.com</a></p>
    </div>
  )
}

export default Homepage
