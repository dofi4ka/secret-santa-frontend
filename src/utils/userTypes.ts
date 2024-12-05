import {SetStoreFunction} from "solid-js/store";

export type User = {
  id: number
  name: string
  telegram_id: number
  flags: number
  telegram_activated: boolean
  users_blocked: number[]
}

export interface UsersListProps {
  users: User[]
  setUsers: SetStoreFunction<User[]>
}