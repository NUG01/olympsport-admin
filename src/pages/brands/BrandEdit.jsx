import { useEffect, useState, Fragment } from "react";
import checkAuth from "../../guards/checkAuth";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import BasicAxios from "../../helpers/axios/BasicAxios";

const brands = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Brands() {
  const [selected, setSelected] = useState(brands[3]);
  const [brand, setBrand] = useState(null);
  const [categories, setCategories] = useState(null);
  const [searchCategories, setSearchCategories] = useState([]);
  const [searchedCategory, setSearchedCategory] = useState([]);
  const [searchActivated, setSearchActivated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const params = useParams();

  useEffect(() => {
    BasicAxios.get("admin/brand/" + params.id).then((res) => {
      setBrand(res.data.data);
      setCategories(res.data.data.categories);
    });
  }, []);
  if (!brand) return;

  function handleCategorySearch() {
    if (!searchedCategory.name) {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 3600);
      return;
    }
    BasicAxios.post("admin/brand/category_list/" + params.id, {
      name: searchedCategory.name,
    }).then((res) => {
      setSearchedCategory(res.data);
      setSearchActivated(true);
      if (res.data.length == 0) {
        setTimeout(() => {
          setSearchActivated(false);
        }, 3600);
      }
    });
  }

  function submitHandler(ev) {
    ev.preventDefault();
    const form = new FormData();
    form.append("name", brand.name);
    if (searchedCategory) form.append("category_id", searchedCategory.id);
    form.append("_method", "PATCH");
    BasicAxios.post("admin/brand/update/" + params.id, form).then((res) => {
      if (searchedCategory) {
        setCategories((oldArray) => [searchedCategory, ...oldArray]);
      }
      setSearchActivated(false);
      setSearchedCategory([]);
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3600);
    });
  }

  function deleteHandler(ev, id) {
    ev.preventDefault();
    BasicAxios.delete(
      "admin/brand/remove_category/" + params.id + "/" + id
    ).then(() => {
      setCategories(categories.filter((x) => x.id != id));
    });
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Editing brandname
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={submitHandler}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="brand_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand Name
              </label>
              <div className="mt-2">
                <input
                  id="brand_name"
                  name="brand_name"
                  type="text"
                  value={brand.name}
                  onChange={(ev) =>
                    setBrand({ ...brand, name: ev.target.value })
                  }
                  className="block w-full px-[5px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={searchedCategory?.name || ""}
                  onChange={(ev) =>
                    setSearchedCategory({
                      ...searchedCategory,
                      name: ev.target.value,
                    })
                  }
                  className="block w-full px-[5px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div
                className="cursor-pointer inline-block bg-gray-200 rounded-[7px] mt-[7px] hover:bg-gray-300"
                onClick={handleCategorySearch}
              >
                <p className="px-[10px] py-[6px]">Search</p>
              </div>
              {searchActivated && searchedCategory.length > 0 && (
                <div className="absolute right-0 top-[70%] w-[75%] border-[2px] rounded-[5px] max-h-[200px] overflow-y-scroll bg-gray-100">
                  {searchedCategory.map((cat) => {
                    return (
                      <p
                        key={cat.id}
                        onClick={() => {
                          setSearchActivated(false);
                          setSearchedCategory(cat);
                        }}
                        className="block hover:bg-gray-200 cursor-pointer px-[3px] overflow-x-hidden"
                      >
                        {`${cat.name}  (${cat.slug})`}
                      </p>
                    );
                  })}
                </div>
              )}
              {searchActivated && searchedCategory.length == 0 && (
                <div>No categories found with this name!</div>
              )}
              {errorMessage && <div>Can't find an empty category!</div>}
            </div>

            <div>
              {successMessage && (
                <div className="text-green-400 text-center text-[18px] mb-[10px]">
                  Successfully updated!
                </div>
              )}
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </form>

          <div className="sm:mx-auto sm:w-full mt-10 mb-10 sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Categories
            </h2>
            <p>This is the list of categories that has this specific brand.</p>
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {categories &&
              categories.map((category) => (
                <li
                  key={category.id}
                  className="flex items-center justify-between gap-x-4 py-5"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {category.name}
                    </p>
                  </div>
                  <form
                    onSubmit={(ev) => deleteHandler(ev, category.id)}
                    className="ml-60"
                  >
                    <button className="text-red-600 hover:text-red-900">
                      Delete<span className="sr-only">, {category.slug}</span>
                    </button>
                  </form>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
