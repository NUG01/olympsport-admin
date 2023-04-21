import {React, useState} from 'react';
import checkAuth from '../../guards/checkAuth';
import { Switch } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


const people = [
    {
      id:1, 
      name: 'Lindsay Walton',
      phone_number: '+995 555 123 456', 
      email: 'lindsay.walton@example.com', 
      plan: 'Cheap', 
      status: 'Not active',
      verified: true,},
    {
      id:2, 
      name: 'Lindsay Walton',
      phone_number: '+995 555 123 456', 
      email: 'lindsay.walton@example.com', 
      plan: 'Cheap', 
      status: 'Not active',
      verified: false,},
    {
      id:3, 
      name: 'Lindsay Walton',
      phone_number: '+995 555 123 456', 
      email: 'lindsay.walton@example.com', 
      plan: 'Cheap', 
      status: 'Not active',
      verified: false,},
  ]
  
  export default function Users() {
    const [enabled, setEnabled] = useState(false)
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                      ID
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Phone Number
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Plan
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Verified
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {people.map((person, personIdx) => (
                    <tr key={person.email} className={personIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{person.id}</td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{person.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.phone_number}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.plan}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={person.verified 
                            ? "bg-green-50 ring-green-600/20 text-green-700 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset" 
                            : "bg-red-50 ring-red-600/20 text-red-700 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset" }>
                          {person.verified ? "Verified" : "Not Verified"}
                        </span>
                        </td>
                        <td>

                        <Switch
                                checked={enabled}
                                  onChange={setEnabled}
                                  className={classNames(
                                    enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                  )}
                                >
                                  <span className="sr-only">Use setting</span>
                                  <span
                                    className={classNames(
                                      enabled ? 'translate-x-5' : 'translate-x-0',
                                      'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                    )}
                                  >
                                    <span
                                      className={classNames(
                                        enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                                      )}
                                      aria-hidden="true"
                                    >
                                      <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                        <path
                                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                          stroke="currentColor"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </span>
                                    <span
                                      className={classNames(
                                        enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                                      )}
                                      aria-hidden="true"
                                    >
                                <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                </svg>
                              </span>
                            </span>
                          </Switch>

                        </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                        <a href={"user/edit/"+person.id} className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {person.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }  
