import { createContext, useState } from "react";

const UserListsContext = createContext({
  lists: [],
  totalLists: 0,
  addList: (userList) => {},
  removeList: (listId) => {},
  listStatus: (listId) => {},
});

export function UserListsContextProvider(props) {

  const [userLists, setUserLists] = useState([]);
  
  const addListHandler = (userList) => {
    setUserListList((prevUserListList) => {
      return prevUserListList.concat(userList);
    });
  };
  const removeListHandler = (listId) => {
    setUserLists((prevUserLists) => {
      return prevUserLists.filter((list) => list.id !== listId);
    });
  };
  const listStatusHandler = (listId) => {
    return userLists.some((list) => list.id === listId);
  };

  const context = {
    lists: userLists,
    totalLists: userListList.length,
    addList: addListHandler,
    removeList: removeListHandler,
    listStatus: listStatusHandler,
  };

  return (
    <UserListsContext.Provider value={context}>
      {props.children}
    </UserListsContext.Provider>
  );
}

export default UserListsContext;