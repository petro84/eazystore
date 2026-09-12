import { Outlet, useNavigation } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/footer/Footer";

function App() {
  const navigation = useNavigation();
  
  return (
    <>
      <Header />
      {navigation.state === "loading" ? (
        <div className="flex items-center justify-center min-h-213">
          <span className="text-4xl font-semibold text-primary dark:text-light">
            Loading...
          </span>
        </div>
      ) : (
        <Outlet />
      )}
      <Footer />
    </>
  );
}

export default App;
