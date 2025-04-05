const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let db = mysql.createConnection({
  host: "bigjjny1r1wlbffosqts-mysql.services.clever-cloud.com",
  user: "uqk5fmmotw3z2bcx",
  password: "umsLaR1I4Btg31Uoj06J",
  database: "bigjjny1r1wlbffosqts",
});

//Metodo post para agregar usuario en pantalla signup
app.post("/signup", (req, res) => {
  console.log(req.body);
  const sql =
    "INSERT INTO `usuario` (`usu_nombre`, `usu_apellidoPaterno`, `usu_apellidoMaterno`, `usu_sexo`, `usu_telefono`, `usu_direccion`, `usu_rfc`, `usu_password`, `usu_rol`, `usu_idGerenteAlta`) VALUES (?)";
  const values = [
    req.body.nombre,
    req.body.ap,
    req.body.am,
    req.body.sexo,
    req.body.telefono,
    req.body.direccion,
    req.body.rfc,
    req.body.password,
    req.body.rol,
    req.body.gerenteAlta,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("error");
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

app.post("/usuarios/usuario", (req, res) => {
  const sql =
    "update `usuario` set `usu_nombre` = ?, `usu_apellidoPaterno` = ?, `usu_apellidoMaterno` = ?, `usu_sexo` = ?, `usu_telefono` = ?, `usu_direccion` = ?, `usu_rfc` = ?, `usu_password` = ?, `usu_rol` = ?, `usu_estaActivo` = ? where (`usu_id` = ?)";

  const values = [
    req.body.usu_nombre,
    req.body.usu_apellidoPaterno,
    req.body.usu_apellidoMaterno,
    req.body.usu_sexo,
    req.body.usu_telefono,
    req.body.usu_direccion,
    req.body.usu_rfc,
    req.body.usu_password,
    req.body.usu_rol,
    req.body.usu_estaActivo,
    req.body.usu_id,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.log("error");

      return res.json(err);
    }

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

app.post("/proveedores/editar", (req, res) => {
  console.log(req.body);
  const id = req.body.prove_id;
  const values = [
    req.body.prove_nombre,
    req.body.prove_correo,
    req.body.prove_telefono,
    req.body.prove_direccion,
    req.body.prove_activo,
  ];
  const sql =
    " update `proveedor` set `prove_nombre` = ?, `prove_correo` = ?,`prove_telefono` = ?,`prove_direccion` = ?, `prove_activo` = ? where (`prove_id` = ?)";
  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      console.log("hubo un error");
      return res.json(err);
    }
    console.log("Acutalizado");
    return res.json(data);
  });
});

app.post("/productos/agregar", (req, res) => {
  const sql =
    "INSERT INTO `producto`(`pro_nombre`, `pro_categoria`, `pro_precio`, `pro_stock`, `pro_codigo`, `pro_marca`, `pro_descripcion`, `pro_stockMinimo`) VALUES (?);";
  const values = [
    req.body.nombre,
    req.body.categoria,
    req.body.precio,
    req.body.stock,
    req.body.codigo,
    req.body.marca,
    req.body.descripcion,
    req.body.stockMinimo,
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

//CATEGORIAS

app.post("/categorias", (req, res) => {
  const sql = "SELECT * FROM `categoriaProductos`";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    }

    return res.json(data);
  });
});

app.post("/categorias/agregar", (req, res) => {
  const sql = "INSERT INTO `categoriaProductos` (`cat_nombre`) VALUES (?);";
  console.log(req.body.nombre);
  const nombre = req.body.nombre;
  db.query(sql, nombre, (err, data) => {
    if (err) {
      return res.json(err);
    }

    return res.json(data);
  });
});

app.post("/logout", (req, res) => {
  db.end((err) => {
    if (err) return res.json(err);
    return res.json("conexion cerrada");
  });
});

app.post("/clientes", (req, res) => {
  const sql = "SELECT * FROM `cliente`;";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/clientes/agregar", (req, res) => {
  const sql =
    "INSERT INTO `cliente`(`cli_nombre`, `cli_correo`, `cli_rfc`, `cli_cp`) VALUES (?)";
  const values = Object.values(req.body);
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/clientes/editar", (req, res) => {
  const sql =
    "UPDATE `cliente` SET `cli_nombre`= ?,`cli_correo`= ? ,`cli_rfc`= ?,`cli_cp`= ?,`cli_estaActivo`= ? WHERE `cli_id` = ?";
  const id = req.body.cli_id;

  const values = [
    req.body.cli_nombre,
    req.body.cli_correo,
    req.body.cli_rfc,
    req.body.cli_cp,
    req.body.cli_estaActivo,
  ];

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log("listening");
});
