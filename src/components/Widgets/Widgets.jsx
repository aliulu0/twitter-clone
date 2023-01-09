import React from 'react'
import { FiSearch } from 'react-icons/fi'
import TrendingList from './TrendingList/TrendingList'

function Widgets() {
  return (
    <div className='hidden lg:block w-[350px] mt-2 ml-4'>
        <div className='bg-gray-100 flex gap-2 rounded-full py-2 px-4 items-center text-[20px] sticky top-1 z-10'>
                <FiSearch />
                <input className='bg-transparent w-[100%] outline-none' type="text" placeholder='Search Twitter' />
            </div>

        <div className='bg-gray-100 rounded-[20px] mt-4'>
            <h1 className='text-[20px] font-medium p-4'>Trends for you</h1>
            <TrendingList about="Technology" hashtag="Apple" tweetsCount="72.7 K"/>
            <TrendingList about="Sports" hashtag="Ronaldo" tweetsCount="55.9 K"/>
            <TrendingList about="Movie" hashtag="Titanic" tweetsCount="100,2 K"/>
            <TrendingList about="Business & finance" hashtag="DowJones" tweetsCount="8,225"/>
            <TrendingList about="Sports" hashtag="Messi" tweetsCount="54.7 K"/>
        </div>
    </div>
  )
}

export default Widgets