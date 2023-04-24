import { React, useState, useEffect } from "react";
import checkAuth from "../../guards/checkAuth";
import { Switch } from "@headlessui/react";
import BasicAxios from "../../helpers/axios/BasicAxios";
import BasicTable from "../../components/BasicTable"

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        BasicAxios.get("admin/users").then((res) =>{ 
         console.log(res.data.data)
         setUsers(res.data.data)
        });
    }, []);

    function changeVerified(person) {
      BasicAxios.post("admin/users/status", {id: person.id})
      .then(res => {
        console.log(res)
        const newState = users.map((user) => {
          if(user.id === person.id){
            let verified = !user.verified
            return {...user, verified}
          }

          return user
        });
        setUsers(newState)
      })      

    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Users
                    </h1>
                </div>
            </div>
            {users.length > 0 && (
              <BasicTable columns={Object.keys(users[0])} data={users} />
            )}
        </div>
    );
}
