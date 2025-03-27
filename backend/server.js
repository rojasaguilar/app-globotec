const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//conexion con la base de datos
const db = mysql.createConnection({
  host: "bigjjny1r1wlbffosqts-mysql.services.clever-cloud.com",
  user: "uqk5fmmotw3z2bcx",
  password: "umsLaR1I4Btg31Uoj06J",
  database: "bigjjny1r1wlbffosqts",
});

//Metodo post para agregar usuario en pantalla signup
app.post("/signup", (req, res) => {
  const sql = "INSERT INTO `usuario` (`usu_nombre`, `usu_password`) VALUES (?)";
  const values = [req.body.usuario, req.body.password];
  console.log(values);
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const sql =
    "select * from `usuario` where (`usu_nombre` = (?) AND `usu_password` = (?)) ";
  const values = [req.body.usuario, req.body.password];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.log("error");
      return res.json(err);
    }
    if (data.length > 0) {
      console.log(data);
      return res.json(data[0]);
    } else {
      console.log("PASSWORD INCORRECTO");
      console.log(err);
      return res.json("CI");
    }
  });
});

app.post("/usuarios", (req, res) => {
  const sql = "select * from `usuario`";
  db.query(sql, (err, data) => {
    if (err) {
      console.log("hubo un error");
      return res.json(err);
    }
    console.log("todos");
    return res.json(data);
  });
});

app.post("/productos", (req, res) => {
  const sql = "select * from `producto`";
  db.query(sql, (err, data) => {
    if (err) {
      console.log("hubo un error");
      return res.json(err);
    }
    console.log("todos");
    return res.json(data);
  });
});

app.post("/proveedores", (req, res) => {
  const sql = "select * from `proveedor`";
  db.query(sql, (err, data) => {
    if (err) {
      console.log("hubo un error");
      return res.json(err);
    }
    console.log("todos");
    return res.json(data);
  });
});

app.post("/productos/agregar", (req, res) => {
  const sql =
    "INSERT INTO `producto` (`pro_nombre`, `pro_categoria`, `pro_precio`, `pro_stock`, `pro_codigo`) VALUES (?);";
  const values = [
    req.body.nombre,
    req.body.categoria,
    req.body.precio,
    req.body.stock,
    req.body.codigo,
  ];
  console.log(values);
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/proveedores/agregar", (req, res) => {
  const sql =
    "INSERT INTO `proveedor` (`prove_nombre`, `prove_correo`, `prove_telefono`, `prove_direccion`, `usu_id`) VALUES (?);";
  const values = [
    req.body.nombre,
    req.body.correo,
    req.body.telefono,
    req.body.direccion,
    req.body.usuario,
  ];
  console.log(values);
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log("listening");
});
