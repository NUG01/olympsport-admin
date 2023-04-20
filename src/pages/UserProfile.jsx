import { React, useState } from 'react'
import checkAuth from '../guards/checkAuth'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserProfile() {

  return (
    <>
        <main>
        <div className="divide-y divide-white/5">
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
                <h2 className="text-base font-semibold leading-7 text-gray-500">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                Update your personal information.
                </p>
            </div>

            <form className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-500">
                    First name
                    </label>
                    <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-500">
                    Last name
                    </label>
                    <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="sm:col-span-6">
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-500">
                    Username
                    </label>
                    <div className="mt-2 flex rounded-md shadow-sm">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block w-full min-w-0 flex-1 rounded-md border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
                </div>

                <div className="mt-8 flex">
                <button
                    type="button"
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                >
                    Save
                </button>
                </div>
            </form>
            </div>

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
                <h2 className="text-base font-semibold leading-7 text-gray-500">Change password</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                Update your password associated with your account.
                </p>
            </div>

            <form className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                    <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-gray-500">
                    Current password
                    </label>
                    <div className="mt-2">
                    <input
                        id="current-password"
                        name="current_password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full min-w-0 flex-1 rounded-md border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="col-span-full">
                    <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-500">
                    New password
                    </label>
                    <div className="mt-2">
                    <input
                        id="new-password"
                        name="new_password"
                        type="password"
                        autoComplete="new-password"
                        className="block w-full min-w-0 flex-1 rounded-md border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div className="col-span-full">
                    <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-500">
                    Confirm password
                    </label>
                    <div className="mt-2">
                    <input
                        id="confirm-password"
                        name="confirm_password"
                        type="password"
                        autoComplete="new-password"
                        className="block w-full min-w-0 flex-1 rounded-md border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6"
                   />
                    </div>
                </div>
                </div>

                <div className="mt-8 flex">
                <button
                    type="button"
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                >
                    Save
                </button>
                </div>
            </form>
            </div>
        </div>
        </main>
    </>
  )
}

