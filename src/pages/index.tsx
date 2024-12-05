import {useNavigate} from "@solidjs/router";
import {clearToken, getAuthorizationHeader, useAuthFetch} from "../utils/auth";
import {onMount} from "solid-js";

export default function Index() {
  const navigate = useNavigate();
  const authFetch = useAuthFetch();

  onMount(async () => {
    if (getAuthorizationHeader()) {
      const response = await authFetch("/me", { method: "GET" })
      if (response.ok) navigate("/panel", {replace: true})
    } else navigate("/login", {replace: true})
  })

  return <div>Checking authentication...</div>
}

