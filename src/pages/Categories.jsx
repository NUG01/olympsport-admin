import React from 'react'
import checkAuth from '../guards/checkAuth'

const categories = [
  {id: 1, name: '1st category', number_of_products: 23, brands: 4},
  {id: 2, name: '2nd category', number_of_products: 0, brands: 65},
  {id: 3, name: '3rd category', number_of_products: 4, brands: 6},
  {id: 4, name: '4th category', number_of_products: 1, brands: 2},
  {id: 5, name: '5th category', number_of_products: 55, brands: 7},
]

export default function Categories() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Categories</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the categories and it's subcategories in your application.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      ID
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Number of Products
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Brands
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.id}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.number_of_products}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.brands}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {category.name}</span>
                        </a>
                      </td>
                        <td>
                        <form action='#' method='post'>
                        <button className="text-red-600 hover:text-red-900">
                          Delete<span className="sr-only">, {category.name}</span>
                        </button>
                        </form>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

