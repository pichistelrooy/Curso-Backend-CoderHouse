const postlogin = (req, res) => {
  console.log("logueado");
  res.redirect("/register");
};

const getErrorLogin = (req, res) => {
  res.render("errorLogin");
};

const getErrorRegister = (req, res) => {
  res.render("errorRegister");
};

export default { postlogin, getErrorLogin, getErrorRegister };
