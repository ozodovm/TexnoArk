import LoginRoutes from "./routes/LoginRoutes";
import { Dashboard } from "./pages";

const App = () => {
  const token = localStorage.getItem("access_token");
  return token ? <Dashboard /> : <LoginRoutes />;
};

export default App;
