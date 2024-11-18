import Logo from "./Logo";
import {useNavigate} from "@solidjs/router";

export default function Nav() {
  const navigate = useNavigate();

  function logoutHandler() {
    if (confirm("Are you sure you wanna logout?")) {
      localStorage.removeItem("access_token")
      localStorage.removeItem("token_type")
      navigate("/", {replace: true})
    }
  }

  return (
    <div class="h-16 w-full bg-amber-300 flex items-center justify-between">
      <div class="flex mb-1 mx-6">
        <Logo />
      </div>
      <button class="mx-6 text-lg text-red-700" onClick={logoutHandler} type="button">
        Logout
      </button>
    </div>
  )
}