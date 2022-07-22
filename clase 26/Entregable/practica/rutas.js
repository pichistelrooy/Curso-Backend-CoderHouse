const getlogin = (req, res) => {
  console.log('bienvenido');
  res.render("login", {});
};

const postlogin = (req, res) => {
  console.log('logueado');
  //res.send("Bienvenido!");
  res.redirect("/register");
};

const getErrorLogin = (req, res)=>{
  res.render('error')
};

const register = (req, res) => {
  res.send("Registrado Correctamente!");
};

module.exports = {
  getlogin,
  register,
  getErrorLogin,
  postlogin
};
