import Login from "./components/login/Login";
import useAuth from "./hooks/useAuth";
import Products from "./pages/Products";

function App() {
  const { signedIn } = useAuth();
  return (
    <div className='app'>
      <div className='main'>{signedIn ? <Products /> : <Login />}</div>
    </div>
  );
}

export default App;
