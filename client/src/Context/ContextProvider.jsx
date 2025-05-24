import { createContext, useState } from "react";

export const Context = createContext({
  user: {
    username: "",
    email: "",
    profileImg: "",
    fName: "",
    lName: "",
    phone: null,
  },
  setUser: () => {},
});

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    fName: "",
    lName: "",
    phone: null,
    profileImg:
      "https://imgs.search.brave.com/L8g0q2VTDqc0PX3hfAVBBNx6gKLd9JE0Gld8jH4BjvQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjE5/NDAwODEwL3Bob3Rv/L21yLXdoby5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9aGFy/VHhXX0lSbDA2Q25o/LTRrbkNudHh3WWlx/V282eWlBeEpUcld5/U0ppRT0",
  });

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
