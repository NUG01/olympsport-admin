import { useState } from "react";
import BasicAxios from "../../../helpers/axios/BasicAxios";

function CityInput(props) {
  const [showCities, setShowCities] = useState(false);
  const [location, setLocation] = useState(props.data.city);
  const [cities, setCities] = useState([]);

  function cityHandler(ev) {
    console.log(location, ev.target.value);
    setLocation({
      city: ev.target.value,
    });
  }

  function citiesHandler() {
    setShowCities(true);
    console.log(location, props.data.location);
    BasicAxios.post("cities", {
      city_name: location?.city,
      country_code: props.data?.location?.country_code,
    })
      .then((res) => {
        setCities(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function chooseCity(ev) {
    console.log(ev.target.getAttribute("value"));
    setLocation({
      city: ev.target.getAttribute("value"),
    });
    setShowCities(false);
  }

  const citiesMapper = () => (
    <div className="absolute w-[100%] h-[15rem] bg-gray-100 top-[3rem] left-0 rounded-[6px] overflow-x-hidden overflow-y-scroll">
      {cities.map((result) => {
        return (
          <div
            key={result}
            value={result.city_name}
            onClick={chooseCity}
            className="w-[100%] p-[3px] pl-[7px] text-[#000] bg-gray-100 border-b-[1.5px] border-b-[dark-gray] text-[13px] cursor-pointer hover:bg-gray-200"
          >
            {result.city_name}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <label
        htmlFor="search"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Quick search
      </label>
      <div className="relative mt-2 flex items-center relative">
        {cities != [] && cities.length > 0 && showCities && citiesMapper()}

        <input
          onChange={cityHandler}
          type="text"
          name="search"
          id="search"
          value={location?.city ? location.city : props.data?.location?.city}
          className="px-[6px] block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>
      <div className="text-[14px] text-[#000] h-full flex items-center jutify-center ">
        <span onClick={citiesHandler} className="cursor-pointer">
          Search
        </span>
      </div>
    </div>
  );
}

export default CityInput;
