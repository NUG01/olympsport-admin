import { React, useState, useEffect } from "react";
import checkAuth from "../../guards/checkAuth";
import BasicAxios from "../../helpers/axios/BasicAxios";
import BasicTable from "../../components/BasicTable"

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        BasicAxios.get("admin/users").then((res) =>{ 
         console.log(res.data.data)
         setUsers(res.data.data)
        });
    }, []);

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
              <BasicTable columns={Object.keys(users[0])} data={users} type={'users'} setState={setUsers}/>
            )}
        </div>
    );
}
