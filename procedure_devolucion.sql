DELIMITER $$

DROP PROCEDURE IF EXISTS nuevaDevolucion$$

create procedure nuevaDevolucion (in datos JSON)
begin 
    DECLARE idDevolucion VARCHAR(30);
    DECLARE productosCantidadDevMayorVenta INT DEFAULT 0;
    DECLARE totalDevolucion DECIMAL(15,2);
    DECLARE idUsuario INT;
    DECLARE idVenta varchar(30);

    DROP TEMPORARY TABLE IF EXISTS devolucionTemporal;
    DROP TEMPORARY TABLE IF EXISTS productosComparativa;

    CREATE TEMPORARY TABLE devolucionTemporal (devolucion JSON);
    INSERT INTO devolucionTemporal values(datos);
    
    CREATE TEMPORARY TABLE productosComparativa
    select jt.pro_id,
            jt.prodev_cantidad,
            jt.prodev_motivo,
            jt.prodev_defectuoso,
            jt.proven_cantidad,
            (jt.proven_cantidad - jt.prodev_cantidad) as diferenciaStocks
    FROM devolucionTemporal
    JOIN JSON_TABLE(
        devolucionTemporal.devolucion,
        "$.productos[*]"
        COLUMNS(
            pro_id INT PATH "$.pro_id",
            prodev_cantidad INT PATH "$.prodev_cantidad",
            prodev_motivo TEXT PATH "$.prodev_motivo",
            prodev_defectuoso BOOLEAN PATH "$.prodev_defectuoso",
            proven_cantidad INT PATH "$.proven_cantidad"
        )
    ) AS jt;

    SELECT COUNT(*) into productosCantidadDevMayorVenta
    from productosComparativa
    where diferenciaStocks < 0;

    --SI CANTIDAD A DEVOLVER ES MAYOR AL A QUE SE VENDIO
    IF productosCantidadDevMayorVenta > 0 THEN  
        select pc.pro_id, p.pro_nombre, pc.proven_cantidad, pc.prodev_cantidad FROM productosComparativa pc 
        INNER JOIN producto p on (p.pro_id = pc.pro_id)
        where pc.proven_cantidad < pc.prodev_cantidad;

    ELSE
        SELECT devolucion ->>"$.dev_id" into idDevolucion from devolucionTemporal;
        SELECT devolucion ->>"$.dev_montoDevuelto" into totalDevolucion from devolucionTemporal;
        SELECT devolucion ->>"$.usu_id" into idUsuario from devolucionTemporal;
        SELECT devolucion ->>"$.ve_id" into idVenta from devolucionTemporal;

        --INSERTA DEVOLUCION
        INSERT into devolucion
        values (idDevolucion, idVenta, CURRENT_TIMESTAMP, totalDevolucion, idUsuario,false);

        --INSERTA PRODUCTOS-DEVOLUCION
        INSERT INTO productodevolucion(dev_id, pro_id, prodev_cantidad, prodev_defectuoso, prodev_motivo)
        SELECT idDevolucion, pro_id, prodev_cantidad, prodev_defectuoso, prodev_motivo
        from productosComparativa;

        insert into `entradasalidadinero` (`entsal_cantidad`, `entsal_fecha`, `usu_id`, `entsal_motivo`, `entsal_estaCancelada`, `entsal_tipo`, `entsal_EoS`))
        values (totalDevolucion, CURRENT_TIMESTAMP, idUsuario, 'devolucion', false, 'd', "s");

        --INSERTA Y RELACIONA VENTA-DEVOLUCION
        UPDATE venta
        SET dev_id = idDevolucion
    where (ve_id = idVenta);

        --ACTUALIZA STOCK SI NO ESTÁ DEFECTUSO
        UPDATE producto p
        JOIN productosComparativa pc on p.pro_id = pc.pro_id
        set p.pro_stock = (p.pro_stock + pc.prodev_cantidad)
        where (pc.prodev_defectuoso = false);

        select ("DEVOLUCION REGISTRADA") as mensaje;
    END IF;

    DROP TEMPORARY TABLE IF EXISTS devolucionTemporal;
    DROP TEMPORARY TABLE IF EXISTS productosComparativa;
END$$

DELIMITER;





