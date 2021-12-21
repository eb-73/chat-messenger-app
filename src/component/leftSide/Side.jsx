import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import style from "./Side.module.css";
import Nav from "./Nav";
import Search from "./Search";
import { useSelector } from "react-redux";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
let listOfContact;
function Side() {
  const [users, setUsers] = useState([]);
  //listen to users collection for change state of user(typing mode, online mode, remove or add user, ...)
  useEffect(() => {
    const ref = collection(db, "users");
    const q = query(ref, where("uID", "not-in", [auth.currentUser.uid]));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("typing");
      const contacts = [];
      querySnapshot.forEach((doc) => {
        contacts.push(doc.data());
      });
      listOfContact = contacts;
      setUsers(contacts);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const onSearchHandler = (word) => {
    const filtredList = listOfContact.filter((contact) =>
      contact.name.toLowerCase().includes(word)
    );
    setUsers(filtredList);
  };
  return (
    <aside className={`${style.mainSide}`}>
      <Nav />
      <Search searchFor={onSearchHandler} />
      <div className={style.contactWrapper}>
        {users.map((user) => (
          <Contact
            key={user.uID}
            id={user.uID}
            typing={user.typing}
            name={user.name}
            isOnline={user.isOnline}
            picUrl={user.profileUrl}
          />
        ))}
      </div>
    </aside>
  );
}

export default Side;
