import {UsersListProps} from "~/utils/userTypes";
import {setToken, useAuthFetch} from "~/utils/auth";

export default function (props: UsersListProps) {

  const authFetch = useAuthFetch()

  const handleSubmit = (event: Event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget as HTMLFormElement).entries())
    console.log(data)
    authFetch("/users", { method: "post", json: data } )
      .then(response => response.json())
      .then(data => props.setUsers(props.users.length, { users_blocked: [], ...data }))
  };

  return (
    <form class="flex flex-col w-fit ml-4 gap-2 items-center"
          onSubmit={handleSubmit}>
      <input class="w-80 px-4 py-1 rounded rounded-t-lg shadow-md" type="text" name="name" placeholder="Full name"
             required minlength="3"/>
      <div class="flex w-full justify-between">
        <input class="w-44 px-4 py-1 rounded rounded-bl-lg rounded-t shadow-md" type="text" name="telegram_id"
               placeholder="Telegram ID" required minlength="8"/>
        <input class="px-9 w-fit rounded rounded-br-lg shadow-md cursor-pointer bg-amber-300 text-amber-900 font-bold hover:text-amber-300 hover:bg-amber-900 transition-colors"
               type="submit" value="Add user"/>
      </div>
    </form>
  )
}