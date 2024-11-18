import Nav from "../components/Nav";
import telegramLogo from "../vectors/telegramLogo.svg?raw"
import {createResource, For} from "solid-js";
import TelegramLogo from "../components/TelegramLogo";
import {useNavigate} from "@solidjs/router";

type User = {
  id: number
  name: string
  telegram_id: number
  flags: number
  telegram_activated: boolean
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch("/api/users", {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Authorization': `${localStorage.getItem("token_type")} ${localStorage.getItem("access_token")}`
      }
    }
  )
  if (response.status === 401) {
    localStorage.removeItem("token_type")
    localStorage.removeItem("access_token")
    // useNavigate()("/login", {replace: true}) // Error: <A> and 'use' router primitives can be only used inside a Route.
  }
  return response.json()
}

export default function Panel() {
  const [users] = createResource(fetchUsers);

  return (
    <>
      <Nav/>
      <div class="flex mt-4">
        <div class={"flex flex-col gap-1 ml-4"}>
          <For each={users()}>
            {(user, index) => (
              <div class="px-2 py-1 rounded w-96 shadow flex items-center justify-between green green-950">
                <span>{user.name}</span>
                <TelegramLogo pathClass={user.telegram_activated ? "fill-green-600" : "fill-red-600"} />
              </div>
            )}
          </For>
        </div>
      </div>
    </>
  )
}