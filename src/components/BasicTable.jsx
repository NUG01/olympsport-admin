import { useState } from "react";
import { Link } from "react-router-dom";
import CustomSwitch from "./CustomSwitch";
import BasicAxios from "../helpers/axios/BasicAxios";
import AlertModal from "../components/AlertModal";

export default function Categories(props) {
  const [modalId, setModalId] = useState(null);
  const [modalBackdrop, setModalBackdrop] = useState(false);

  const data = props.data;
  const columns = props.columns;

  function setModalOpen(id) {
    if (document.getElementById("modal-" + id)) {
      setModalId(null);
      return null;
    }
    setModalBackdrop(true);
    setModalId(id);
    return id;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {props.type}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the {props.type.toLowerCase()} in your application.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
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
                    {columns.map((name) => (
                      <th
                        key={name}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        {name.replace("_", " ").toUpperCase()}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((item) => (
                    <tr key={item.id}>
                      {columns.map((key, i) => (
                        <td
                          key={i}
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >
                          {(key === 'verified' && props.type === 'users' &&

                            <CustomSwitch item={item} switchFunction={
                              (item)=>{
                                BasicAxios.post("admin/users/status", {id: item.id})
                                .then(res => {
                                  const newState = data.map((user) => {
                                    if(user.id === item.id){
                                      let verified = !user.verified
                                      return {...user, verified}
                                    }

                                    return user
                                  });
                                  props.setState(newState)
                                })      
                              }
                            }/>

                          )}

                          {item[key]}
                        </td>
                      ))}

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          to={`/dashboard/category/edit/${item.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {item.name}</span>
                        </Link>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <form action="#" method="post">
                          <button className="text-red-600 hover:text-red-900">
                            Delete<span className="sr-only">, {item.name}</span>
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
  );
}
