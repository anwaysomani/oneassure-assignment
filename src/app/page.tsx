'use client';

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [pageNum, setPageNum] = useState(1);
  const router = useRouter();
  const [ageArr, setElementInAgeArr] = useState([]);
  const [inputAge, setInputAge] = useState();

  // add member to age array
  function addMember() {
    setElementInAgeArr([...ageArr, inputAge]);
    setInputAge(0);
  }

  function moveToNext() {
    setPageNum(pageNum + 1);
  }

  function recordData() {
    if(pageNum == 1) {
      // record count of adults & count of childrens
      moveToNext();
    } else if(pageNum == 2) {
      // record age of adults & childrens
      moveToNext();
    } else if(pageNum == 3) {
      // record sum, city tier and tenure
      moveToNext();
    }
  }

  useEffect(() => {
  })

  return (
    <main className="flex min-h-screen flex-col justify-between p-12">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          By OneAssure
        </p>
      </div>

      <div className="grid text-center lg:max-w-xl lg:mb-0 lg:text-left">
      
      { ageArr.length > 0 ?
        <blockquote className="p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
          <h1 className="text-2xl font-extrabold dark:text-white">
            <small className="font-semibold text-gray-500 dark:text-gray-400">Members</small>
          </h1>
          <hr className="w-48 h-1 my-2 bg-gray-100 border-0 rounded dark:bg-gray-700" />

          <p className="text-sm dark:text-white">Adults:</p>
          <p className="text-sm dark:text-white">Children: 1&nbsp;(12)</p>
        </blockquote> : <></> }

      { pageNum > 3 ?
        <blockquote className="p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
          <h1 className="text-2xl font-extrabold dark:text-white">
            <small className="font-semibold text-gray-500 dark:text-gray-400">Tenure Details</small>
          </h1>
          <hr className="w-48 h-1 my-2 bg-gray-100 border-0 rounded dark:bg-gray-700" />

          <p className="text-sm dark:text-white">Sum: 300000</p>
          <p className="text-sm dark:text-white">Tenure: 2</p>
          <p className="text-sm dark:text-white">City Tier: 1</p>
        </blockquote> : <></> }

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

        { pageNum == 1 ?
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <input type="number" min="0" max="100" id="user_age" value={inputAge}
                onChange={(e) => setInputAge(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter age" />
              <br/>
              <button type="button" className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={addMember}>
                Add Member
              </button>
            </div>
            <div>
              <label htmlFor="amt-300000" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Adult - 1</label><br/>
              <label htmlFor="amt-300000" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Children - 1</label>
            </div>
          </div> : pageNum == 3 ?
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="sum_insured" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sum</label>
              <div className="flex items-center mb-4">
                  <input id="amt-300000" type="radio" value="300000" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="amt-300000" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">&#8377;&nbsp;3,00,000</label>
              </div>
              <div className="flex items-center mb-4">
                  <input id="amt-400000" type="radio" value="400000" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="amt-400000" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">&#8377;&nbsp;4,00,000</label>
              </div>
              <div className="flex items-center mb-4">
                  <input id="amt-500000" type="radio" value="500000" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="amt-500000" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">&#8377;&nbsp;5,00,000</label>
              </div>
            </div>

            <div>
              <label htmlFor="tenure" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tenure</label>
              <div className="flex items-center mb-4">
                  <input id="tenure-1" type="radio" value="1" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="tenure-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">1-year</label>
              </div>
              <div className="flex items-center mb-4">
                  <input id="tenure-2" type="radio" value="2" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="tenure-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">2-years</label>
              </div>
              <div className="flex items-center mb-4">
                  <input id="tenure-3" type="radio" value="3" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="tenure-3" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">3-years</label>
              </div>
            </div>


            <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">City Tier</h3>
            <ul className="grid w-full gap-6 md:grid-cols-2">
                <li>
                    <input type="radio" id="hosting-small" name="hosting" value="hosting-small" className="hidden peer" required />
                    <label htmlFor="hosting-small" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Tier-1</div>
                            <div className="w-full">Good for small websites</div>
                        </div>
                        <svg className="w-5 h-5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </label>
                </li>
                <li>
                    <input type="radio" id="hosting-big" name="hosting" value="hosting-big" className="hidden peer" />
                    <label htmlFor="hosting-big" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Tier-2</div>
                            <div className="w-full">Good for large websites</div>
                        </div>
                        <svg className="w-5 h-5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </label>
                </li>
            </ul>

            
          </div> : <div></div>}


        {pageNum < 3 ? 
          <button onClick={moveToNext}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Continue({pageNum} / 3) &#8594;</button>
        : <button onClick={moveToNext}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Generate(3 / 3) &#8594;</button>
        }
      </div>
    </main>
  )
}
