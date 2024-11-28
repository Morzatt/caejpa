// Utilities to supply a permission to visualize the content of the pages in the client only if the user's logged.
export async function newRenderPermission(req, res) {
    const session = req.session;
    if (session.userInfo) {
        res.status(200).send(session.userInfo);
    }
    else {
        res.status(400).send("No hay permiso");
    }
}
