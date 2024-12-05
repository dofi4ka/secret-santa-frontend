import {createSignal, For, Show} from "solid-js";
import {useAuthFetch} from "~/utils/auth";
import TelegramLogo from "~/vectors/TelegramLogo";
import blockVector from "~/vectors/block.svg";
import deleteVector from "~/vectors/delete.svg";
import {UsersListProps} from "~/utils/userTypes";

export default function (props: UsersListProps) {
  const [getChosenUser, setChosenUser] = createSignal<number>(-1)
  const [isUserChosen, setUserChosen] = createSignal<boolean>(false)
  const authFetch = useAuthFetch()

  const blockUser = async (id: number) => {
    if (!isUserChosen()) return;
    const response = await authFetch(`/users/${props.users[getChosenUser()].id}/blocks/${id}`, { method: "post" })
    if (response.ok) props.setUsers(getChosenUser(), "users_blocked", props.users[getChosenUser()].users_blocked.concat([id]))
  }
  const unblockUser = async (id: number) => {
    if (!isUserChosen()) return;
    const response = await authFetch(`/users/${props.users[getChosenUser()].id}/blocks/${id}`, { method: "delete" })
    if (response.ok) props.setUsers(getChosenUser(), "users_blocked", props.users[getChosenUser()].users_blocked.filter((userID: number) => userID !== id))
  }
  const deleteUser = async (index: number, id: number) => {
    if (!confirm(`Are you sure you want to delete ${props.users[index].name}`)) return;
    const response = await authFetch(`/users/${id}`, { method: "delete" })
    if (response.ok) props.setUsers(users => users.filter((_, i) => i !== index))
  }

  return (
    <div class="flex flex-col gap-1 ml-4">
      <For each={props.users}>
        {(user, index) => (
          <div class="flex gap-2">
            <img src={deleteVector} alt="delete user" width={18} onClick={() => deleteUser(index(), user.id)}
                 class="opacity-50 hover:opacity-100 transition-[opacity] cursor-pointer"/>
            <div class="px-2 py-1 rounded w-[470px] shadow flex items-center justify-between green green-950"
                 classList={{"opacity-50": isUserChosen() && getChosenUser() !== index()}}>
              <span class="flex items-center gap-2">
                <span class="cursor-pointer" title={`${user.telegram_id} (click to copy)`}
                      onClick={async () => await navigator.clipboard.writeText(`${user.telegram_id}`)}>
                  <TelegramLogo pathClass={user.telegram_activated ? "fill-green-600" : "fill-red-600"}/>
                </span>
                {user.name}
              </span>
              <span class="flex items-center gap-1 text-sm select-none cursor-pointer"
                    onClick={() => getChosenUser() === index() && isUserChosen() ? setUserChosen(false) : (setChosenUser(index()), setUserChosen(true))}>
                <Show when={user.users_blocked.length > 0} fallback={
                  <span class="text-green-600">No restricts</span>
                }>
                  <span class="text-stone-600">{user.users_blocked.length} blocked</span>
                </Show>
                <img src={blockVector} alt="block users" width={18}/>
              </span>
            </div>
            <Show when={isUserChosen() && getChosenUser() !== index()}
                  fallback={
                    <span class="w-[400px]" onClick={() => setUserChosen(false)}/>
                  }>
              <Show when={props.users[getChosenUser()].users_blocked.includes(user.id)} fallback={
                <div
                  class="px-2 py-1 rounded w-[400px] shadow flex items-center justify-between hover:animate-none cursor-pointer select-none"
                  classList={{"animate-wiggle": index() % 2 == 0, "animate-wiggle-invert": index() % 2 == 1}}
                  onClick={() => blockUser(user.id)}
                >
                  <span>{user.name}</span>
                  <span class="text-green-500 font-medium">Allowed</span>
                </div>
              }>
                <div
                  class="px-2 py-1 rounded w-[400px] shadow flex items-center justify-between bg-red-50 cursor-pointer select-none"
                  onClick={() => unblockUser(user.id)}
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
  )
}