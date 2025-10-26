'use client'

import { useEffect, useState } from "react";

interface User {
  id: number,
  name: string,
  age: string,
  email: string,
  password: string

}

export default function Home() {
  const [users, setUsers] = useState<User[] | null>(null)
  const getUsers = async () => {
    try {
      const res = await fetch("api/users");
      const data = await res.json();
      setUsers(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getUsers().then(data => console.log(data))
  }, [])  
  return (
    <div className="">
      Hi ,
      {
        users ? users?.map(user => <p key={user.id}>
          {user.name} is {user.age} years old
        </p>) : <p>Loading...</p>
      }
    </div>
  );
}
