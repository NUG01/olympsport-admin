import { useEffect, useState } from "react";
import checkAuth from "../../guards/checkAuth";
import UserSaveModal from "../../components/users/UserSaveModal";
import UserDeleteModal from "../../components/users/UserDeleteModal";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import UserInput from "./Inputs/UserInput";
import { useSelector } from "react-redux";
import BasicAxios from "../../helpers/axios/BasicAxios";
import CityInput from "./Inputs/CityInput";
import { useParams } from "react-router-dom";

const tiers = [
  {
    name: "Freelancer",
    id: "74",
    href: "#",
    price: 14,
    bought: "2023-10-12",
    next_billing: "2023-11-12",
    duration: "Monthly",
    cta: "Cancel subscription",
  },
];

const boosted = [
  {
    id: 1,
    start_date: "20203-04-20: 12:00",
    end_date: "20203-04-20: 12:00",
    price: 5,
    status: "Active",
    product: "Shorts",
  },
  {
    id: 2,
    start_date: "20203-04-20: 12:00",
    end_date: "20203-04-20: 12:00",
    price: 4,
    status: "Not active",
    product: "Shirts",
  },
  {
    id: 3,
    start_date: "20203-04-20: 12:00",
    end_date: "20203-04-20: 12:00",
    price: 51,
    product: "Jacket",
    status: "Active",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserEdit() {
  const [modal, setModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const params = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    BasicAxios.get("admin/users/" + params.id).then((res) => {
      setUser(res.data);
    });
  }, []);

  function closeDeleteModal() {
    setModal(false);
  }

  function closeSaveModal() {
    setSaveModal(false);
  }

  function updateCityValue(cityId) {
    setUser({ ...user, city: cityId });
  }

  async function submitHandler() {
    try {
      const res = await BasicAxios.post("admin/users/edit/" + user.id, user);
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3600);
    } catch (error) {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 3600);
    }
  }

  if (!user) return;
  return (
    <>
      {modal && <UserDeleteModal close={closeDeleteModal} />}

      {saveModal && (
        <UserSaveModal submitSave={submitHandler} close={closeSaveModal} />
      )}
      <form onSubmit={submitHandler}>
        <div className="space-y-12">
          <h2 className="text-base font-semibold leading-7 text-black-900">
            User profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information belongs to the client so be careful what you share.
          </p>
          {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Avatar
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon
                  className="h-36 w-36 text-gray-300"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>
          </div> */}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-gray-900/10 pb-12">
            <UserInput
              updateValue={(value) => {
                setUser({ ...user, first_name: value });
              }}
              value={user.first_name}
              type="text"
              name="first-name"
              label="First name"
            />
            <UserInput
              updateValue={(value) => {
                setUser({ ...user, last_name: value });
              }}
              value={user.last_name}
              type="text"
              name="last-name"
              label="Last name"
            />
            <UserInput
              updateValue={(value) => {
                setUser({ ...user, username: value });
              }}
              value={user.username}
              type="text"
              name="username"
              label="Username"
            />

            <UserInput
              updateValue={(value) => {
                setUser({ ...user, address: value });
              }}
              value={user.address}
              type="text"
              name="address"
              label="Address"
            />
            <UserInput
              updateValue={(value) => {
                setUser({ ...user, phone_number: value });
              }}
              value={user.phone_number}
              type="text"
              name="phone-number"
              label="Phone Number"
            />
            <CityInput cityValue={updateCityValue} city={user.city}></CityInput>
          </div>

          <div className="border-b border-gray-900/10 pb-12 flex flex-col md:flex-row">
            <h2 className="text-base font-semibold leading-4 text-gray-900">
              Billing
            </h2>

            <div className="mt-16 ml-10 w-[25%] px-6 lg:px-8">
              <div className="isolate lg:mx-0 lg:max-w-none lg:grid-cols-3 overflow-hidden rounded-md border border-gray-300 bg-white">
                <ul
                  role="list"
                  className="divide-y divide-gray-300 text-center"
                >
                  {tiers.map((item) => (
                    <>
                      <li key={item.id} className="px-6 py-4">
                        {item.name}
                      </li>
                      <li key={item.id} className="px-6 py-4">
                        {item.duration}
                      </li>
                      <li key={item.id} className="px-6 py-4">
                        {item.price + "$"}
                      </li>
                      <li key={item.id} className="px-6 py-4">
                        {item.bought}
                      </li>
                      <li key={item.id} className="px-6 py-4">
                        {item.next_billing}
                      </li>
                      <li key={item.id} className="px-6 py-4">
                        <a
                          href={item.href}
                          aria-describedby={item.id}
                          className={classNames(
                            "bg-red-600 text-gray-50 shadow-sm hover:bg-red-500 focus-visible:outline-red-600",
                            " block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                          )}
                        >
                          {item.cta}
                        </a>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 ml-24 w-[55%]">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-3"
                        >
                          Start date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          End date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          Product
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-center">
                      {boosted.map((boost, boostIdx) => (
                        <tr
                          key={boost.owner}
                          className={
                            boostIdx % 2 === 0 ? undefined : "bg-gray-50"
                          }
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                            {boost.start_date}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {boost.end_date}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {boost.price}
                          </td>
                          <td
                            className={
                              boost.status === "Active"
                                ? "mt-3 bg-green-50 ring-green-600/20 text-green-700 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                                : "mt-3 bg-red-50 ring-red-600/20 text-red-700 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inse"
                            }
                          >
                            {boost.status}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {boost.product}
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

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <div className="flex items-center justify-center w-full h-full">
            {errorMessage && (
              <p className="text-[16px] font-[600] mt-[1rem] text-red-600 ">
                Something went wrong!
              </p>
            )}

            {successMessage && (
              <p className="text-[16px] font-[600] mt-[1rem] text-green-600 ">
                Updated successfully!
              </p>
            )}
          </div>
          <button
            onClick={() => setSaveModal(true)}
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
