import Nav from "../components/Nav";
import {createEffect, createResource, createSignal, For, onMount, Show} from "solid-js";
import TelegramLogo from "../vectors/TelegramLogo";
import blockVector from "../vectors/block.svg";
import {useAuthFetch} from "../utils/auth";
import {createStore} from "solid-js/store";

type User = {
  id: number
  name: string
  telegram_id: number
  flags: number
  telegram_activated: boolean
  users_blocked: number[]
}

async function fetchUsers(): Promise<User[]> {
  const authFetch = useAuthFetch();

  const response = await authFetch("/api/users", {method: "get"})
  return response.json()
}

export default function Panel() {
  // const [usersResource] = createResource(fetchUsers);
  const [users, setUsers] = createStore<User[]>([]);
  const [getChosenUser, setChosenUser] = createSignal<number>(-1)
  const [isUserChosen, setUserChosen] = createSignal<boolean>(false)

  onMount(() => {
    fetchUsers().then(
      (data) => {
        setUsers(data)
      }
    )
  })

  createEffect(() => {
    console.log(users)
  })


  return (
    <>
      <Nav/>
      <div class="flex mt-4">
        <div class="flex flex-col gap-1 ml-4">
          <For each={users}>
            {(user, index) => (
              <div class="flex gap-2">
                <div class="px-2 py-1 rounded w-[470px] shadow flex items-center justify-between green green-950"
                     classList={{"opacity-50": isUserChosen() && getChosenUser() !== index()}}>
                  <span class="flex items-center gap-2">
                    <TelegramLogo pathClass={user.telegram_activated ? "fill-green-600" : "fill-red-600"}/>
                    {user.name}
                  </span>
                  <span class="flex items-center gap-1 text-sm select-none cursor-pointer"
                        onClick={() => getChosenUser() === index() && isUserChosen() ? setUserChosen(false) : (setChosenUser(index()), setUserChosen(true))}>
                    <Show when={user.users_blocked.length > 0} fallback={
                      <span class="text-green-600">No restricts</span>
                    }>
                      <span class="text-stone-600">{user.users_blocked.length} blocked</span>
                    </Show>
                    <img src={blockVector} alt="block users"/>
                  </span>
                </div>
                <Show when={isUserChosen() && getChosenUser() !== index()}
                      fallback={
                        <span class="w-[400px]" onClick={() => setUserChosen(false)}/>
                      }>
                  <Show when={users[getChosenUser()].users_blocked.includes(user.id)} fallback={
                    <div
                      class="px-2 py-1 rounded w-[400px] shadow flex items-center justify-between hover:animate-none cursor-pointer select-none"
                      classList={{"animate-wiggle": index() % 2 == 0, "animate-wiggle-invert": index() % 2 == 1}}
                      onClick={() => setUsers(getChosenUser(), "users_blocked", users[getChosenUser()].users_blocked.concat([user.id]))}
                    >
                      <span>{user.name}</span>
                      <span class="text-green-500 font-medium">Allowed</span>
                    </div>
                  }>
                    <div
                      class="px-2 py-1 rounded w-[400px] shadow flex items-center justify-between bg-red-50 cursor-pointer select-none"
                      onClick={() => setUsers(getChosenUser(), "users_blocked", users[getChosenUser()].users_blocked.filter((userID: number) => userID !== user.id))}
                    >
                      <span>{user.name}</span>
                      <span class="text-red-500 font-medium">Blocked</span>
                    </div>
                  </Show>
                </Show>
              </div>
            )}
          </For>
        </div>
      </div>
    </>
  )
}