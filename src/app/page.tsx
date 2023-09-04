'use client';

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [pageNum, setPageNum] = useState(1);
  const router = useRouter();
  const [ageArr, setElementInAgeArr] = useState([]);
  const [inputAge, setInputAge] = useState("");
  const api = 'http://127.0.0.1:5000/details';
  const [insuredSum, setInsuredSum] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [cityTier, setCityTier] = useState(0);
  const [elements, setElements] = useState([]);
  const [finalAmount, setFinalAmount] = useState(0);

  // add member to age array
  function addMember() {
    const age = parseInt(inputAge)
    if(age > 0 && age < 91) {
      setElementInAgeArr([...ageArr, age]);
      setInputAge("");  
    }
  }

  // proceed to next pagge
  function moveToNext() {
    setPageNum(pageNum + 1);
  }

  const fetchData = async () => {
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'tierid': parseInt(cityTier.target.value),
          'age': ageArr,
          'sum': parseInt(insuredSum.target.value),
          'tenure': parseInt(tenure.target.value),
        }),
      });
      const data = await response.json();
      setElements(data['data']);
      setFinalAmount(data['amount']);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <main className="flex">
      <div className="fixed top-0 h-full overflow-y-scroll overflow-x-hidden w-1/4 p-4 shadow-md flex min-h-screen flex-col justify-between p-8 w-2/5 break-normal">
        <div className="z-10 max-w-5xl w-half items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            By OneAssure
          </p>
        </div>

        <blockquote className="p-4 my-4 border-l-4 border-gray-300 dark:border-gray-500">
          <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
            Greetings!<br/>
            <small>Customize your insuarance plan based on your needs with our user-friendly input tool...</small>
          </p>
        </blockquote>

        <div className="grid text-center lg:max-w-xl lg:mb-0 lg:text-left">
          { ageArr.length > 0 ?
            <blockquote className="p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800 w-100 overflow-x-scroll">
              <h1 className="text-2xl font-extrabold dark:text-white">
                <small className="font-semibold text-gray-500 dark:text-gray-400">Members&nbsp;</small>
              </h1>
              <hr className="w-48 h-1 my-2 bg-gray-100 border-0 rounded dark:bg-gray-700" />

              { ageArr.filter(x => x > 18).length > 0 ?
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  Adults:&nbsp;{
                    ageArr.filter(x => x > 18).map( (age, index) => 
                      <span key={ index }>
                        <span className="font-semibold text-gray-900 underline dark:text-white decoration-blue-500">{ age }</span>
                        { index < ageArr.filter(x => x > 18).length - 1 ? 
                            <span>,&nbsp;</span> : <></> }
                      </span>
                      )
                  }
                </p> : <></> 
              }

              { ageArr.filter(x => x < 19).length > 0 ?
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  Children:&nbsp;{
                    ageArr.filter(x => x < 19).map( (age, index) => 
                      <span key={index}>
                        <span className="font-semibold text-gray-900 underline dark:text-white decoration-blue-500">{ age }</span>
                        { index < ageArr.filter(x => x < 19).length - 1 ? 
                          <span>,&nbsp;</span> : <></> }
                      </span>
                      )
                  }
                </p> : <></> 
              }
            </blockquote> : <></> }

          { pageNum == 1 ?
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <input type="number" min="0" max="90" id="user_age" value={ inputAge }
                  onChange={ (e) => setInputAge(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={ ageArr.length > 0 ? 'Enter age of another member' : 'Enter age of member' } />
                <br/>
              </div>
              <div>
                <button className="text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={ addMember }>
                  Add Member&nbsp;+
                </button>
              </div>
            </div> : pageNum == 2 ?
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="sum_insured" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sum</label>
                <div className="flex items-center mb-4">
                    <input id="amt-300000" type="radio" value="300000" name="sum-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={ setInsuredSum } />
                    <label htmlFor="amt-300000" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">&#8377;&nbsp;3,00,000</label>
                </div>
                <div className="flex items-center mb-4">
                    <input id="amt-400000" type="radio" value="400000" name="sum-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={ setInsuredSum } />
                    <label htmlFor="amt-400000" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">&#8377;&nbsp;4,00,000</label>
                </div>
                <div className="flex items-center mb-4">
                    <input id="amt-500000" type="radio" value="500000" name="sum-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={ setInsuredSum } />
                    <label htmlFor="amt-500000" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">&#8377;&nbsp;5,00,000</label>
                </div>
              </div>

              <div>
                <label htmlFor="tenure" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tenure</label>
                <div className="flex items-center mb-4">
                    <input id="tenure-1" type="radio" value="1" name="tenure-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={ setTenure } />
                    <label htmlFor="tenure-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">1-year</label>
                </div>
                <div className="flex items-center mb-4">
                    <input id="tenure-2" type="radio" value="2" name="tenure-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={ setTenure } />
                    <label htmlFor="tenure-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">2-years</label>
                </div>
                <div className="flex items-center mb-4">
                    <input id="tenure-3" type="radio" value="3" name="tenure-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={ setTenure } />
                    <label htmlFor="tenure-3" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">3-years</label>
                </div>
              </div>

              <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">City Tier</h3>
              <ul className="grid w-full gap-6 md:grid-cols-2">
                  <li key="ct1">
                      <input type="radio" id="tier-1" name="hosting" value="1" className="hidden peer" onChange={ setCityTier } required />
                      <label htmlFor="tier-1" className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                          <div className="block">
                              <div className="w-full text-lg font-semibold">Tier-1</div>
                              <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                              <div className="w-full text-sm text-gray-500">&#8593;1 Lakh</div>
                          </div>
                      </label>
                  </li>
                  <li key="ct2">
                    <input type="radio" id="tier-2" name="hosting" value="2" className="hidden peer" onChange={ setCityTier } />
                    <label htmlFor="tier-2" className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Tier-2</div>
                            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                            <div className="w-full text-sm text-gray-500">&#8595;1 Lakh</div>
                        </div>
                    </label>
                  </li>
              </ul>
            </div> : <div></div>}

          { pageNum < 2 && ageArr.length > 0 ?
            <button onClick={moveToNext}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >Continue({ pageNum } / 2) &#8594;</button>
            : <></> }
          
          { pageNum > 1 && insuredSum?.target?.value > 0 && cityTier?.target?.value > 0 && tenure?.target?.value > 0 ? 
            <button onClick={ fetchData }
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Generate&nbsp;&#8594;</button> : <div className="mb-8"></div> }
        </div>
      </div>
      { elements.length > 0 ?
        <div className="fixed top-0 right-0 overflow-y-scroll h-full w-1/4 p-4 shadow-md right-0 flex min-h-screen flex-col justify-between pt-12 pb-12 pl-4 pr-4 w-3/5">
        <div href="#" className="block max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-4">
          <p className="font-normal text-gray-700 dark:text-gray-400">Total Amount</p>
          <hr className="h-px mt-2 mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">&#8377;&nbsp;{ finalAmount.toLocaleString('en-IN') }/-</h5>
        </div>

        <div className="grid grid-cols-3 gap-4">
          { elements.map((elem, index) => (
              <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">{ elem.name }</p>
                  <p className="text-gray-500 dark:text-gray-400">age&nbsp;-&nbsp;<strong className="font-semibold text-gray-900 dark:text-white">{ elem.age }</strong></p>
                </div>
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                      <li key={ "base-rate-" + index } className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                              <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                      Base Rate
                                  </p>
                              </div>
                              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                  &#8377;&nbsp;{ elem.final_amt.toLocaleString('en-IN') }
                              </div>
                          </div>
                      </li>
                      <li key={"floater-discount-" + index} className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                              <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                      Floater Discount
                                  </p>
                              </div>
                              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                  { elem.disc }%
                              </div>
                          </div>
                      </li>
                      <li key={ "discounted-rate-" + index } className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                              <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                      Discounted Rate
                                  </p>
                              </div>
                              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                  &#8377;&nbsp;{ elem.final_amt.toLocaleString('en-IN') }
                              </div>
                          </div>
                      </li>
                  </ul>
             </div>
            </div>
          ))}
          </div>
        </div>
        : 
        <div className="fixed top-0 right-0 overflow-y-scroll h-full w-1/4 p-4 shadow-md right-0 flex min-h-screen flex-col justify-between pt-12 pb-12 pl-4 pr-4 w-3/5 border-l-4">
          <div className="flex items-center justify-center h-screen">
            <img className="rounded-lg" src="https://i.ibb.co/L1CxZcQ/vector-1.jpg" width="512" height="512" alt="vector-1" border="0" />
          </div>
        </div>
        }
    </main>
  )
}
