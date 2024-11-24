

const About = () => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-opacity-80 bg-gray-900 z-10'> 
        <div className='w-4/6 h-4/6 bg-gray-600 flex flex-col gap-10 m-auto rounded-lg shadow-2xl p-10'>
            <h1 className='text-5xl text-green-500 font-normal'>ZETA FT</h1>
            <p className='text-2xl text-green-400 font-light leading-relaxed'>ZETA FT is a Finance Tracker to help you Visualize and track your Expenses which are
                divided into 4 Categories, namely: Housing and Utilities, Transportation, Food and Groceries, and Miscellaneous.It can also track your Remaining
                Income and Total Expenses Accumulated in a Month.
            </p>
            <button className='absolute bottom-40 right-80 bg-green-400 px-8 py-2 rounded-lg hover:bg-green-500 text-black font-bold'>Close</button>
        </div>
    </div>
  );
};

export default About;
