import React, { useRef, useState } from 'react'
import axios from 'axios';
import BasicAxios from "../../helpers/axios/BasicAxios";
import checkAuth from '../../guards/checkAuth'

function CategoryAdd() {
  const [categories, setCategories] = useState([])
  const lastRequest = useRef(null)
  const catName = useRef()
  const catSearch = useRef()
  const catSlug = useRef()

  function searchCategories(e){
    let cat_name = e.target.value

    if(cat_name.length > 2){

        if(lastRequest.current != null) lastRequest.current.cancel()

        lastRequest.current = axios.CancelToken.source()
        BasicAxios.post('admin/category/search', {name: cat_name}, {
            cancelToken: lastRequest.current.token, 
        }).then((res) => {
            setCategories(res.data.data)
        });
    }
  }

  function setCategory(cat){
    catSearch.current.value = cat.name
    catSlug.current.value = cat.slug
    setCategories([])

  }

  function saveCategory(){
    if(catName.current.value.length != 0 && catSlug.current.value != 0){
      console.log(catName.current.value);
      console.log(catSlug.current.value);
    }
  }

  return (
    <>
      <div className='flex flex-col content-center mt-8'>

        <div className='flex flex-col md:flex-row'>
          <label htmlFor="category" className="block text-sm align-center pt-4 px-2 font-medium leading-6 text-gray-900">
              Category
          </label>
          <div className="relative mt-2 rounded-md ">
              <input
              type="text"
              name="category"
              id="category"
              className="block w-[calc(100%-15px)] md:w-96 md:ml-[60px] ml-2 rounded-md border-0 py-1.5 pl-2 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Category name"
              aria-describedby="category"
              ref={catName}
              />
          </div>
        </div>

        <div className='flex md:flex-row flex-col mt-[40px] relative'>
          <label htmlFor="parent" className="block text-sm align-center pt-4 px-2 font-medium leading-6 text-gray-900">
              Parent Category
          </label>
          <div className="relative mt-2 rounded-md md:w-fit w-full">
              <input type="hidden" ref={catSlug}/>
              <input
              type="text"
              name="parent"
              id="parent"
              className="block w-[calc(100%-15px)] md:w-96 md:ml-4 ml-2 rounded-md border-0 py-1.5 pl-2 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Parent category name"
              aria-describedby="parent-category"
              onInput={(e)=> searchCategories(e)}
              ref={catSearch}
              />

              <div 
                className={`w-[calc(100%-15px)] max-h-[300px] overflow-y-auto bg-gray-100 flex flex-col divide-y divide-gray-400 absolute left-4 top-[calc(100%+5px)] 
                ${categories.length < 1 ? 'hidden' : ''}`}
              >
                {
                  categories.length > 0 && (
                    categories.map(cat => {
                      return (
                        <p 
                          className='text-[14px] py-3 px-2 cursor-pointer transition-[background] hover:bg-gray-400'
                          onClick={()=>setCategory(cat)}
                        >
                          {cat.name} - ({cat.slug})
                        </p>
                      )
                    })
                  )
                }
              </div>
          </div>
        </div>

        <div className="mt-16 flex ml-2">
          <button
              onClick={()=> saveCategory()}
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
          >
            Save
          </button>
        </div>
      </div>
    </>
  )

}

// export default checkAuth(MainPage)
export default CategoryAdd
