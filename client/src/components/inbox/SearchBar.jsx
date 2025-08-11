import React from 'react';

const SearchBar = () => {
    return (
        <div className='w-full h-10 rounded-full overflow-x-hidden bg-pink-200 px-8 '>
            <input placeholder='Search' type='text' className='w-full h-full focus:outline-none'/>
        </div>
    );
};

export default SearchBar;