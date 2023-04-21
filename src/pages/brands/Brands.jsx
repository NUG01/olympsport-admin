import React from 'react'
import { Link } from 'react-router-dom'
import checkAuth from '../../guards/checkAuth'

const brands = [
  {id: 1, name: '1st brand', number_of_products: 23, category_count: 4},
  {id: 2, name: '2nd brand', number_of_products: 0, category_count: 65},
  {id: 3, name: '3rd brand', number_of_products: 4, category_count: 6},
  {id: 4, name: '4th brand', number_of_products: 1, category_count: 2},
  {id: 5, name: '5th brand', number_of_products: 55, category_count: 7},
]

export default function Brands() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Brands</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the Brands and it's categories that they belong in your application.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to={'/dashboard/brand/add'}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            end
          >
            Add Brand
          </Link>
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
                      Number of categories
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
                  {brands.map((brand) => (
                    <tr key={brand.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{brand.id}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{brand.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{brand.number_of_products}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{brand.category_count}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to={'/dashboard/brand/edit/1'} href="#" className="text-indigo-600 hover:text-indigo-900" end>
                          Edit<span className="sr-only">, {brand.name}</span>
                        </Link>
                      </td>
                        <td>
                        <form action='#' method='post'>
                        <button className="text-red-600 hover:text-red-900">
                          Delete<span className="sr-only">, {brand.name}</span>
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
