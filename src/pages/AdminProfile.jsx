import { useEffect, useState } from "react";
import checkAuth from "../guards/checkAuth";
import { useParams } from "react-router-dom";
import AdminUpdateInput from "./users/Inputs/AdminEditInput";
import { useSelector } from "react-redux";
import BasicAxios from "../helpers/axios/BasicAxios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminProfile() {
  const [user, setUser] = useState([]);
  const [credentialsError, setCredentialsError] = useState(false);
  const [credentialsSuccess, setCredentialsSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [passwordValue, setPasswordValue] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  useEffect(() => {
    BasicAxios.get("user").then((res) => {
      setUser(res.data);
    });
  }, []);

  async function submitHandler(ev) {
    ev.preventDefault();
    try {
      await BasicAxios.post("admin/users/edit/" + user.id, user);
      setCredentialsSuccess(true);
      setTimeout(() => {
        setCredentialsSuccess(false);
      }, 3600);
    } catch (error) {
      setCredentialsError(true);
      setTimeout(() => {
        setCredentialsError(false);
      }, 3600);
    }
  }

  async function passwordFormHandler(ev) {
    ev.preventDefault();
    setPasswordErrors([]);

    try {
      await BasicAxios.post("admin/password/update", {
        current_password: passwordValue,
        password_confirmation: confirmPasswordValue,
        new_password: newPasswordValue,
      });
      setPasswordSuccess(true);
      setTimeout(() => {
        setPasswordSuccess(false);
      }, 3600);
    } catch (error) {
      setPasswordError(true);
      setPasswordErrors(error.response.data.errors);
      setTimeout(() => {
        setPasswordError(false);
      }, 3600);
    }
  }

  if (!user) return;
  return (
    <>
      <main>
        <div className="divide-y divide-white/5">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-500">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Update your personal information.
              </p>
            </div>

            <form onSubmit={submitHandler} className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <AdminUpdateInput
                  onChangeHandler={(key, value) =>
                    setUser({ ...user, first_name: value })
                  }
                  value={user.first_name}
                  name="first-name"
                >
                  First name
                </AdminUpdateInput>
                <AdminUpdateInput
                  onChangeHandler={(key, value) =>
                    setUser({ ...user, last_name: value })
                  }
                  value={user.last_name}
                  name="last-name"
                >
                  Last name
                </AdminUpdateInput>
                <AdminUpdateInput
                  onChangeHandler={(key, value) =>
                    setUser({ ...user, username: value })
                  }
                  value={user.username}
                  name="username"
                  style="col-span-full"
                >
                  Username
                </AdminUpdateInput>
              </div>

              <div className="mt-8 flex">
                <button
                  type="submit"
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                >
                  Save
                </button>
                <div className="flex items-center justify-center w-full h-full">
                  {credentialsError && (
                    <p className="text-[16px] font-[600] text-red-600 ">
                      Something went wrong!
                    </p>
                  )}

                  {credentialsSuccess && (
                    <p className="text-[16px] font-[600] text-green-600 ">
                      Updated successfully!
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-500">
                Change password
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Update your password associated with your account.
              </p>
            </div>

            <form onSubmit={passwordFormHandler} className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <AdminUpdateInput
                  onChangeHandler={(value) => setPasswordValue(value)}
                  value={passwordValue}
                  style="col-span-full"
                  name="current-password"
                >
                  Current password
                </AdminUpdateInput>
                <AdminUpdateInput
                  onChangeHandler={(value) => setNewPasswordValue(value)}
                  value={newPasswordValue}
                  style="col-span-full"
                  name="new-password"
                  type="password"
                >
                  New password
                </AdminUpdateInput>
                <AdminUpdateInput
                  onChangeHandler={(value) => setConfirmPasswordValue(value)}
                  value={confirmPasswordValue}
                  style="col-span-full"
                  name="confirm-password"
                  type="password"
                >
                  Confirm password
                </AdminUpdateInput>
              </div>

              <div className="mt-8 flex flex-col">
                <button
                  type="submit"
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                >
                  Save
                </button>
                <div className="flex flex-col items-center justify-center w-full h-full mt-[5px]">
                  {passwordError &&
                    passwordErrors &&
                    Object.keys(passwordErrors).map((key) => {
                      return (
                        <p
                          key={key}
                          className="text-[16px] font-[600] text-red-600 "
                        >
                          {passwordErrors[key][0]}
                        </p>
                      );
                    })}

                  {passwordSuccess && (
                    <p className="text-[16px] font-[600] text-green-600">
                      Updated successfully!
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
