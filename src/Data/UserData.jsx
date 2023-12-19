import axios from "axios";
import { createContext, useState } from "react";
import siteConfig from "../../public/site-config";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
export const UserContext = createContext();

function UserData({ children }) {
  const [currentQuizId, setCurrentQuizId] = useState(null);
  const [userBalance, setUserBalance] = useState(50);
  const [loggedUser, setLoggedUser] = useState(null);
  const userToken = Cookies.get("userToken");

  // const verifyToken = (token, secretKey) => {
  //   try {
  //     const decoded = jwt.verify(token, secretKey);
  //     return decoded;
  //   } catch (error) {
  //     return null; // Return null if the token is not valid
  //   }
  // };

  // const decoded = verifyToken("token", "secretKey");

  // if (decoded) {
  //   // Token is valid
  //   console.log("Decoded JWT:", decoded);
  //   // You can access the token claims like decoded.userId, decoded.email, etc.
  // } else {
  //   // Token is not valid
  //   console.log("Invalid JWT");
  // }

  let userId = "";
  let userData = "";
  let userImages = "";
  let userDate = "";
  let user = "";

  if (userToken) {
    userId = jwtDecode(userToken).id;
    // Use the userId or perform other actions with the token.
  } else {
    // Handle the case where the token is not found.
    console.log("Token not found");
  }

  async function getLoggedInUserData() {
    try {
      const { data } = await axios(`${siteConfig.ApiUrl}/users/${userId}`);
      console.log(data.result);
      setUserBalance(data.result.balance);
      setLoggedUser(data.result);
    } catch (e) {
      console.log(e);
    }
  }
  async function clearUserData() {
    setLoggedUser(null);
  }

  function updateCurrentQuiz(id) {
    setCurrentQuizId(id);
  }

  return (
    <UserContext.Provider value={{ updateCurrentQuiz, currentQuizId, userBalance, getLoggedInUserData, loggedUser, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserData;
