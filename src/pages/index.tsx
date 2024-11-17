import {useNavigate} from "@solidjs/router";

export default function Index() {
  const navigate = useNavigate();
  if (localStorage.getItem("access_token") && localStorage.getItem("token_type")) {
    fetch("/api/me", {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Authorization': `${localStorage.getItem("token_type")} ${localStorage.getItem("access_token")}`
      },
    }).then((response) => {
      response.json().then(data => {
        if (!response.ok) {
          navigate("/login", {replace: true})
        }
      });
    });
    navigate("/panel", {replace: true})
  } else {
    localStorage.removeItem("access_token")
    localStorage.removeItem("token_type")
    navigate("/login", {replace: true})
  }

  return <></>
}