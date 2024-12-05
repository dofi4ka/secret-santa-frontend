import Nav from "~/components/Nav";
import {createEffect, createResource, createSignal, For, onMount, Show} from "solid-js";
import TelegramLogo from "../vectors/TelegramLogo";
import blockVector from "../vectors/block.svg";
import {useAuthFetch} from "~/utils/auth";
import {createStore} from "solid-js/store";
import UsersList from "~/components/UsersList";
import {User} from "~/utils/userTypes";
import Divider from "~/components/Divider";
import UsersAdding from "~/components/UsersAdding";

export default function Panel() {
  const [users, setUsers] = createStore<User[]>([]);
  const authFetch = useAuthFetch()

  function updateUsers() {
    authFetch("/users", { method: "get" })
      .then(response => response.json())
      .then(data => setUsers(data))
  }

  onMount(() => {
    updateUsers()
  })

  return (
    <>
      <Nav/>
      <Divider title="Users list"/>
      <UsersList users={users} setUsers={setUsers}/>
      <Divider title="Adding a user"/>
      <UsersAdding users={users} setUsers={setUsers}/>
      <Divider title="Start"/>
      <button
        class="ml-4 px-6 py-1 w-fit rounded rounded-br-lg shadow-md cursor-pointer bg-amber-300 text-amber-900 font-bold hover:text-amber-300 hover:bg-amber-900 transition-colors"
        onClick={async () => {
          if (!confirm("Are you sure?")) return;
          if (!confirm("Are you sure? (double check)")) return;
          if (!confirm("Are you sure? (triple check)")) return;

          await authFetch("/distribute", { method: "post" })
        }}
      >
        Start
      </button>
    </>
  )
}