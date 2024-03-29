import checkAuth from '../guards/checkAuth';
import { React, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BasicAxios from "../helpers/axios/BasicAxios";
import { Load, RemoveLoader } from "../hooks/Loader";
import { data } from 'autoprefixer';

export default function TermsAndConditions() {
  const [errorMessage, setErrorMessage] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  
  const [termsValue, setTermsValue] = useState('');

  const options = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] },],
    [{ 'align': [] }],
    ['clean']
  ];

  useEffect(() => {
    Load()
    BasicAxios.get("admin/terms_and_conditions").then((res) => {
      RemoveLoader();
      setTermsValue(res.data.data[0].text);
      setSuccessMessage(res.data.message);
      console.log(res);
    });
  }, []);

  const modules = {
    toolbar: options
  }
  
  function recordTerms(){
    setErrorMessage("");

    const payload = {
      website_text: termsValue
    }
    
    Load()
    BasicAxios.patch("admin/update/website_assets/1", payload)
      .then((res) => {
        RemoveLoader();
        setSuccessMessage('Updated successfully!');
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((err) => {
        RemoveLoader()
      });
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 flex flex-col gap-[30px]">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-4 text-gray-900">Terms and Conditions</h1>
        </div>
      </div>

      <ReactQuill modules={modules} value={termsValue} theme="snow" onChange={setTermsValue} className='text-black terms-editor'/>

      {errorMessage &&
        Object.keys(errorMessage).map((key) => {
          return (
            <p
              key={key}
              className="text-[16px] font-[600] mt-[1rem] text-red-600"
            >
              {errorMessage[key]}
            </p>
          );
        })}

        {successMessage && (
          <p className="text-[16px] font-[600] mt-[1rem] text-green-600">
            {successMessage}
          </p>
        )}

      <button
          onClick={()=> recordTerms()}
          className="max-w-fit inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
      </button>
    </div>
  )
}


