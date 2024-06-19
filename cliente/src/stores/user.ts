import { writable } from "svelte/store";
import setPermission from "../routes/permission";

export let userInfo = writable(null)

const getUser = async () => {
    const response = await setPermission()
    const userData = await response.json()
    userInfo.set(userData)
}
getUser()

export default userInfo
