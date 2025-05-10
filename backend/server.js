const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Configurar almacenamiento con Multer

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "..", "frontend", "public", "images");
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

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
    "INSERT INTO `usuario` (`usu_nombre`, `usu_apellidoPaterno`, `usu_apellidoMaterno`, `usu_sexo`, `usu_telefono`, `usu_direccion`, `usu_rfc`, `usu_password`, `usu_rol`, `usu_idGerenteAlta`, `usu_nombreUsuario`) VALUES (?)";
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
    `${req.body.nombre}${req.body.ap}${req.body.am.slice(0, 2)}`,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("error");
    }
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const sql = "select * from `usuario` where (`usu_nombre` = (?) AND `usu_password` = (?)) ";
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
  const sql =
    "select u.usu_id, u.usu_nombre, u.usu_apellidoPaterno, u.usu_apellidoMaterno, u.usu_sexo," +
    " u.usu_telefono, u.usu_direccion,u.usu_rfc,u.usu_password,u.usu_rol, u.usu_estaActivo, v.usu_nombreUsuario as gerenteAlta," +
    "u.usu_fechaAlta, u.usu_nombreUsuario from usuario u left join usuario v on (u.usu_idGerenteAlta = v.usu_id);";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
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
  const sql =
    "select pro_id, pro_nombre, c.cat_nombre as pro_categoria, pro_categoria as cat_id, pro_precio, pro_stock," +
    " pro_estaActivo, pro_codigo, pro_marca, pro_descripcion, pro_stockMinimo from producto" +
    " inner join categoriaProductos c on (producto.pro_categoria = c.cat_id ); ";
  db.query(sql, (err, data) => {
    if (err) {
      console.log("hubo un error");

      return res.json(err);
    }
    console.log("todos");

    return res.json(data);
  });
});

app.post("/productos/actualizar", (req, res) => {
  const id = req.body.pro_id;
  const producto = [
    req.body.pro_nombre,
    req.body.pro_precio,
    req.body.pro_stock,
    req.body.pro_estaActivo,
    req.body.pro_marca,
    req.body.pro_descripcion,
    req.body.pro_stockMinimo,
  ];
  console.log(producto);
  const sql = `update producto set pro_nombre = ?, pro_precio = ?, pro_stock = ?, pro_estaActivo = ?, pro_marca = ?, pro_descripcion = ?, pro_stockMinimo = ? where pro_id = ${id}`;
  db.query(sql, [...producto], (err, data) => {
    if (err) return res.json(err);
    console.log(data);
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
    req.body.prove_estado,
  ];
  const sql =
    " update `proveedor` set `prove_nombre` = ?, `prove_correo` = ?,`prove_telefono` = ?,`prove_direccion` = ?, `prove_activo` = ?, `prove_estado` = ? where (`prove_id` = ?)";
  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      console.log("hubo un error");
      return res.json(err);
    }
    console.log("Acutalizado");
    return res.json(data);
  });
});

app.post("/productos/agregar", upload.single("imagen"), (req, res) => {
  console.log(req.file);
  const producto = JSON.parse(req.body.producto);

  const values = [
    producto.nombre,
    producto.categoria,
    producto.precio,
    producto.stock,
    producto.codigo,
    producto.marca,
    producto.descripcion,
    producto.stockMinimo,
  ];

  const sql =
    "INSERT INTO `producto`(`pro_nombre`, `pro_categoria`, `pro_precio`, `pro_stock`, `pro_codigo`, `pro_marca`, `pro_descripcion`, `pro_stockMinimo`) VALUES (?);";
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }

    return res.json(data);
  });
});

app.post("/productos/pocostock", (req, res) => {
  const sql = "SELECT * FROM `producto` WHERE `pro_stock` <= `pro_stockMinimo`";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/proveedores/agregar", (req, res) => {
  const sql =
    "INSERT INTO `proveedor` (`prove_nombre`, `prove_correo`, `prove_telefono`, `prove_direccion`, `usu_id`, `prove_estado`) VALUES (?);";
  const values = [
    req.body.nombre,
    req.body.correo,
    req.body.telefono,
    req.body.direccion,
    req.body.usuario,
    req.body.estado,
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
  const sql = "INSERT INTO `cliente`(`cli_nombre`, `cli_correo`, `cli_rfc`, `cli_cp`) VALUES (?)";
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

  const values = [req.body.cli_nombre, req.body.cli_correo, req.body.cli_rfc, req.body.cli_cp, req.body.cli_estaActivo];

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/entradassalidas", (req, res) => {
  const sql =
    "select `entsal_tipo`, e.entsal_cantidad,e.entsal_motivo,u.usu_nombreUsuario,e.entsal_fecha,e.entsal_estaCancelada, e.entsal_EoS from entradasalidadinero e INNER join usuario u on (u.usu_id = e.usu_id)";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/entradassalidas/agregar", (req, res) => {
  const date = new Date().toJSON().slice(0, 10);
  let data = req.body;
  if (data.entsal_tipo === "v" || data.entsal_tipo === "i") {
    data = { ...data, entsal_EoS: "e" };
  } else {
    data = { ...data, entsal_EoS: "s" };
  }
  data = {...data, }
  const sql =
    "insert into entradasalidadinero (entsal_cantidad, usu_id, entsal_motivo, entsal_tipo, entsal_EoS) values (?)";
  db.query(sql, [Object.values(data)], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/venta/agregar", (req, res) => {
  let data = req.body;
  console.log(data);
  data = JSON.stringify(data);
  const sql = "call nuevaVenta(?)";
  db.query(sql, data, (err, data) => {
    if (err) {
      console.log(err)
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/ventas", (req, res) => {
  const sql =
    "select v.ve_id, v.ve_fecha, v.ve_total, c.cli_nombre, u.usu_nombreUsuario, v.ve_tipoPago, v.ve_estaCancelada, v.dev_id, " +
    "v.ve_motivoCancelacion from venta v inner join cliente c on (c.cli_id = v.cli_id)inner join usuario u on (u.usu_id = v.usu_id);";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/ventas/venta", (req, res) => {
  const ve_id = req.body.ve_id;
  const sql =
    "select pv.pro_id, p.pro_nombre, p.pro_marca, p.pro_codigo, pv.proven_cantidad, p.pro_precio as costoUnitario, (p.pro_precio * pv.proven_cantidad) as total " +
    "from productoventa pv inner join producto p on (p.pro_id = pv.pro_id)" +
    " where ve_id = (?);";

  const sql2 =
    `select v.ve_id, v.ve_fecha, v.ve_total, v.ve_tipoPago, c.cli_nombre, u.usu_nombreUsuario, v.dev_id from venta v inner join cliente c on (c.cli_id = v.cli_id)` +
    ` inner join usuario u on (u.usu_id = v.usu_id) where v.ve_id = (?)`;

  db.query(sql2, ve_id, (err, data1) => {
    if (err) return res.json(err);

    db.query(sql, ve_id, (err, data2) => {
      if (err) return res.json(err);

      return res.json({
        productos: data2,
        venta: data1[0],
      });
    });
  });
});

app.post("/ventas/hoy", (req, res) => {
  const date = req.body.date;
  const sql = "select sum(ve_total) as total from venta where ve_fecha like ?";
  db.query(sql, `${date}%`, (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
});

app.post("/devoluciones", (req, res) => {
  const sql = "select d.dev_id, d.ve_id, d.dev_fecha, d.dev_montoDevuleto, u.usu_nombre as usuarioResponsable"
   + " from devolucion d inner join usuario u on (u.usu_id = d.usu_id)";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/devoluciones/devolucion',(req,res) => {
  const idDevolucion = req.body.dev_id;
  // const sql1 = "select * from devolucion where (dev_id = ?) "
  // const sql2 = "select p.pro_nombre, p.pro_codigo, pd.prodev_cantidad, pd.prodev_defectuoso, p.pro_precio from productodevolucion pd" 
  // + " inner join producto p on (p.pro_id = pd.pro_id)"
  // + " where pd.dev_id = ?"

  // db.query(sql2,idDevolucion, (err,data) => {
  //   if(err) return res.json(err)
  //     return res.json(data)
  // })

  const sql1 = "select * from devolucion where (dev_id = ?)"
   const sql2 = "select p.pro_nombre, p.pro_codigo, pd.prodev_cantidad, pd.prodev_defectuoso, p.pro_precio from productodevolucion pd" 
  + " inner join producto p on (p.pro_id = pd.pro_id)"
  + " where pd.dev_id = ?"

  db.query(sql1, idDevolucion, (err,data) => {
    db.query(sql2, idDevolucion, (err,data2) => {
      const response = {...data[0], productos: data2}
      return res.json(response);
    })
  })
})

app.post('/devoluciones/nueva', (req,res) => {
  const data = req.body
  console.log(JSON.stringify(data))
  const sql = 'call nuevaDevolucion(?)'
  db.query(sql,JSON.stringify(data),(err,data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
});

app.listen(8081, () => {
  console.log("listening");
});
