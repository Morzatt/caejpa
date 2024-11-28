import { base } from "$lib/index"

async function setPermission() {
    const res = await fetch(`${base}/login/render`, {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });
    return res
}

export default setPermission;