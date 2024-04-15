import { Route, Routes } from "react-router-dom"
import Header from "./coomponent/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Chat from "./pages/Chat"
import NotFound from "./pages/NotFound"
import { useAuth } from "./context/AuthContext"

function App() {
  console.log(useAuth()?.isLoggedIn)
  return (
    <>
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Sign-up" element={<Signup/>} />
        <Route path="/Chat" element={<Chat/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </main>
    </>
  )
}

export default App
