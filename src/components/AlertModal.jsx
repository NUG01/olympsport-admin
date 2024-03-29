import { Fragment, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import BasicAxios from "../helpers/axios/BasicAxios";
import {
  ExclamationTriangleIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

export default function Example(props) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  function deleteHandler() {
    props.close();
    if (props.type == "Categories") {
      BasicAxios.delete("admin/category/delete/" + props.item.slug).then(
        (res) => {
          props.deleteAction(
            props.data.filter((x) => x.slug != props.item.slug)
          );
        }
      );
    } else {
      let parts = pathname.split("/");
      let url = parts[parts.length - 1];
      BasicAxios.delete("admin/" + url + "/delete/" + props.id).then((res) => {
        props.deleteAction(props.data.filter((x) => x.id != id));
      });
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => props.close()}>
        <div className="fixed inset-0 z-10 overflow-y-auto modal-backdrop">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child as={Fragment}>
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Alert
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to continue with this action? This
                        action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={deleteHandler}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => props.close()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
