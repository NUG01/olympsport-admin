import { useEffect, useState, useRef } from "react";
import checkAuth from "../../guards/checkAuth";
import axios from 'axios';
import BasicAxios from "../../helpers/axios/BasicAxios";
import { useParams } from "react-router-dom";

function CategoryEdit() {
  const params = useParams();
  const [curCat, setCurCat] = useState({})
  const [categories, setCategories] = useState([])
  const lastRequest = useRef(null)
  const catName = useRef()
  const catSearch = useRef()
  const catId = useRef()

  useEffect(() => {
    console.log(params.id);
    BasicAxios.get("admin/category/" + params.id).then((res) => {
      setCurCat(res.data.data)
      console.log(res.data.data);
    });
  }, []);

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
    catId.current.value = cat.id
    setCategories([])

  }

  function saveCategory(){
    console.log(catName.current.value);
    console.log(catId.current.value);
    if(catName.current.value.length != 0 && catId.current.value != 0){
      BasicAxios.post('admin/category/update'+params.id, {name: catName.current.value, id: catId.current.value})
      .then((res) => {
        console.log(res);
      });
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
              value={curCat.name}
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
              <input type="hidden" ref={catId}/>
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
export default CategoryEdit;
