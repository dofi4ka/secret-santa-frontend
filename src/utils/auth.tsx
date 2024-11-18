import {useNavigate} from "@solidjs/router";

export function setToken(tokenType: string, accessToken: string) {
  localStorage.setItem("token_type", tokenType);
  localStorage.setItem("access_token", accessToken);
}

export function clearToken() {
  localStorage.removeItem("token_type");
  localStorage.removeItem("access_token");
}

export function getToken() {
  return {
    tokenType: localStorage.getItem("token_type"),
    accessToken: localStorage.getItem("access_token"),
  };
}

export function getAuthorizationHeader(): string | null {
  const tokenType = localStorage.getItem("token_type");
  const accessToken = localStorage.getItem("access_token");

  if (tokenType && accessToken) {
    return `${tokenType} ${accessToken}`;
  }
  return null;
}

export function useAuthFetch() {
  const navigate = useNavigate();

  return async function authFetch(url: string, options: RequestInit = {}) {
    const authHeader = getAuthorizationHeader()

    const headers = new Headers(options.headers || {})
    if (typeof authHeader === "string") {
      headers.set("Authorization", authHeader)
    }
    headers.set("Accept", "application/json")

    const response = await fetch(url, { ...options, headers })
    if (response.status === 401) {
      clearToken()
      navigate("/login", { replace: true })
    }

    return response;
  };
}
