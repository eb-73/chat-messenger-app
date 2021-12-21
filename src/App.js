import Home from "./component/Home";
import EnterPage from "./component/loginForm/EnterPage";
import { Route, Navigate, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { authAction } from "./store/slices/Auth";
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.Auth.isLogin);
  //listen to auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUserState) => {
      if (newUserState) {
        dispatch(authAction.setInitial(newUserState.uid));
      } else {
        dispatch(authAction.setInitial(null));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      {isAuth && (
        <Routes>
          <Route path="*" element={<Navigate to="/main" />} />
          <Route path="/main" element={<Home />} />
        </Routes>
      )}

      {!isAuth && (
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<EnterPage />} />
        </Routes>
      )}

      <Toaster />
    </>
  );
}

export default App;
