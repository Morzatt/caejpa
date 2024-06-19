async function setPermission() {
    const res = await fetch("http://localhost:2606/login/render", {
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