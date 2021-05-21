import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../../../Context/Context";
import { UserInterface } from "../../../Interface/UserInterface";

export default function AdminPage() {
  const ctx = useContext(myContext);

  const [allUsers, setAllUsers]         = useState<UserInterface[]>();
  const [selectedUser, setSelectedUser] = useState<string>();
  
  useEffect(() => {
    axios
      .get("http://localhost:4000/allUsers", {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        setAllUsers(
          res.data.filter((el: UserInterface) => {
            return el.username !== ctx.username;
          }))
      });
  }, [ctx]);
  if (!allUsers) {
    return null;
  }

  const deleteUser = () => {
    let userId: string;
    allUsers.forEach((el: UserInterface) => {
      if (el.username === selectedUser) {
        userId = el.id;
      }
    });
    axios
    .post("http://localhost:4000/deleteUser",
        {
          id: userId!,
        },
        {
          withCredentials: true,
        },
      )
  };
  return (
    <div>
      <h1>Admin</h1>
      <select
        onChange={(e) => setSelectedUser(e.target.value)}
        name="selectedUser"
        id="selectedUser"
      >
        <option id="Select a user">Select A User</option>
        {allUsers.map((el: UserInterface) => {
          return (
            <option key={el.username} id={el.username}>
              {el.username}
            </option>
          );
        })}
      </select>
      <button onClick={deleteUser}>⚠️ Delete this User</button>
    </div>
  );
}
