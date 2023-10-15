import { createContext, useState } from "react";
import { useParams } from "react-router-dom";

export const UserContext = createContext();
function UserData({ children }) {
  const [currentQuizId, setCurrentQuizId] = useState(null);
  // const { quizId } = useParams();

  function updateCurrentQuiz(id) {
    setCurrentQuizId(id);
  }

  return <UserContext.Provider value={{ updateCurrentQuiz, currentQuizId }}>{children}</UserContext.Provider>;
}

export default UserData;
