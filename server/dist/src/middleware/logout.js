export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(`Error => Failed to destroy the session during logout: ${err}`);
            return res.redirect("/");
        }
        console.log("Cerrada la sesion correctamente");
        res.redirect("/");
    });
};
