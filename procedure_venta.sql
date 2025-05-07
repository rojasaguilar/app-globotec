DELIMITER $$

DROP PROCEDURE IF EXISTS nuevaVenta$$

CREATE PROCEDURE nuevaVenta(IN datos JSON)
BEGIN
  DECLARE productosSinStockSuficiente INT default 0;
  DECLARE VentaID VARCHAR(30);
  DECLARE totalVenta DECIMAL(15,2);
  DECLARE ClienteID INT;
  DECLARE UsuarioID INT;
  DECLARE TipoPago VARCHAR(1);

  DROP TEMPORARY TABLE IF EXISTS ventaTemporal;
  DROP TEMPORARY TABLE IF EXISTS productosComparativa;

  CREATE TEMPORARY TABLE ventaTemporal (venta JSON);
  INSERT INTO ventaTemporal VALUES (datos);

  CREATE TEMPORARY TABLE productosComparativa
  SELECT jt.pro_id AS productoID,
         jt.pro_cantidad AS cantidadSolicitada,
         p.pro_stock,
         (p.pro_stock - jt.pro_cantidad) AS stockRestante
  FROM ventaTemporal
  JOIN JSON_TABLE (
    ventaTemporal.venta,
    "$.productos[*]"
    COLUMNS (
      pro_id INT PATH "$.pro_id",
      pro_cantidad INT PATH "$.pro_cantidad"
    )
  ) AS jt
  JOIN producto p ON jt.pro_id = p.pro_id;

  SELECT COUNT(*) INTO productosSinStockSuficiente
  FROM productosComparativa
  WHERE stockRestante < 0;

  IF productosSinStockSuficiente > 0 THEN
		    select pc.productoID, p.pro_nombre, pc.pro_stock, pc.cantidadSolicitada from productosComparativa pc
		    inner join producto p on (p.pro_id = pc.productoID) 
		    where pc.pro_stock < pc.cantidadSolicitada;
  ELSE
    SELECT venta->>"$.ve_id" INTO VentaID FROM ventaTemporal;
    SELECT venta->>"$.ve_total" INTO totalVenta FROM ventaTemporal;
    SELECT venta->>"$.cli_id" INTO ClienteID FROM ventaTemporal;
    SELECT venta->>"$.usu_id" INTO UsuarioID FROM ventaTemporal;
    SELECT venta->>"$.ve_tipoPago" INTO TipoPago FROM ventaTemporal;

    INSERT INTO venta (ve_id, ve_fecha, ve_total, cli_id, usu_id, ve_tipoPago)
    VALUES (VentaID, CURRENT_DATE, totalVenta, ClienteID, UsuarioID, TipoPago);

    INSERT INTO entradasalidadinero (
      entsal_cantidad,
      entsal_fecha,
      usu_id,
      entsal_motivo,
      entsal_tipo,
      entsal_EoS
    )
    VALUES (
      totalVenta,
      CURRENT_DATE,
      UsuarioID,
      "Venta",
      'v',
      'e'
    );

    INSERT INTO productoventa (ve_id, pro_id, proven_cantidad)
    SELECT VentaID, productoID, cantidadSolicitada
    FROM productosComparativa;

    UPDATE producto p
    JOIN productosComparativa c ON p.pro_id = c.productoID
    SET p.pro_stock = (p.pro_stock - c.cantidadSolicitada);
  END IF;
  
  select "venta realizada" as mensaje;

  DROP TEMPORARY TABLE IF EXISTS ventaTemporal;
  DROP TEMPORARY TABLE IF EXISTS productosComparativa;
END$$

DELIMITER ;

