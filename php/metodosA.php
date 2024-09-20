<?php
require_once "config.php";
header('Content-Type: application/json; charset=utf-8');
date_default_timezone_set('America/Mexico_City'); 


$valido['success']=array('success'=>false,'mensaje'=>"");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    switch ($action) {

        case "guardar":

            $a = $_POST['nombrep'] ?? '';
            $b = $_POST['descripcion'] ?? '';
            $c = $_POST['precio'] ?? 0;
            $d = $_POST['talla'] ?? '';
            $e = $_POST['cantidadp'] ?? 0;
            $h = $_POST['idc'] ?? '';
            $usuario = $_POST['usuario'] ?? ''; 

            $fileName = $_FILES['fotop']['name'];
            $fileTmpName = $_FILES['fotop']['tmp_name'];
            $uploadDirectory = '../assets/img_prendas/';

            if (!is_dir($uploadDirectory)) {
                mkdir($uploadDirectory, 0755, true);
            }

            $filePath = $uploadDirectory . basename($fileName);

            if (move_uploaded_file($fileTmpName, $filePath)) {
                $sqlUsuario = "SELECT id_u FROM usuarios WHERE usuario = ?";
                $stmtUsuario = $cx->prepare($sqlUsuario);
                $stmtUsuario->bind_param("s", $usuario);
                $stmtUsuario->execute();
                $resultadoUsuario = $stmtUsuario->get_result();

                if ($resultadoUsuario->num_rows > 0) {
                    $rowUsuario = $resultadoUsuario->fetch_assoc();
                    $id_u = $rowUsuario['id_u'];

                    $sqlInsertPrenda = "INSERT INTO prendas (nombrep, descripcion, precio, talla, cantidadp, fotop, id_c) 
                                        VALUES ('$a', '$b', $c, '$d', $e, '$filePath', $h)";

                    if ($cx->query($sqlInsertPrenda)) {

                        $id_p = $cx->insert_id;

                        $fechaHora = date("Y-m-d H:i:s");
                        $sqlInsertMovimiento = "INSERT INTO movimientos (fecha, tipomov, id_p, id_u, cant) 
                                               VALUES ('$fechaHora', 'compra', $id_p, $id_u, $e)";

                        if ($cx->query($sqlInsertMovimiento)) {
                            $valido['success'] = true;
                            $valido['mensaje'] = "Articulo y movimiento de compra registrados correctamente";
                        } else {
                            $valido['mensaje'] = "Error al registrar el movimiento de compra en la base de datos: " . $cx->error;
                        }
                    } else {
                        $valido['mensaje'] = "Error al guardar el articulo en la base de datos: " . $cx->error;
                    }
                } else {
                    $valido['mensaje'] = "No se encontró el usuario '$usuario'";
                }
            } else {
                $valido['mensaje'] = "Error al subir la imagen de la prenda";
            }

            echo json_encode($valido);
            break;
        


            case "selectAll":

                $sql="SELECT * FROM prendas";
                $registros=array('data'=>array());
                $res=$cx->query($sql);
                if($res->num_rows>0){
                    while($row=$res->fetch_array()){
                        $registros['data'][]=array($row[0],$row[1],$row[2],$row[3],$row[4],$row[5],$row[6],$row[7]);
                    }
                }
                
                echo json_encode($registros);
            
            break;

            $idp = $_POST['idp'];

            $valido = array(
                'success' => false,
                'mensaje' => 'Error al procesar la solicitud'
            );

            if (!is_numeric($idp)) {
                $valido['mensaje'] = "ID de prenda no válido";
            } else {

                $sql = "DELETE FROM prendas WHERE id_p = ?";
                $stmt = $cx->prepare($sql);
                $stmt->bind_param("i", $idp);

                if ($stmt->execute()) {
                    $valido['success'] = true;
                    $valido['mensaje'] = "Se eliminó el articulo correctamente";
                } else {
                    $valido['mensaje'] = "Error al eliminar el articulo: " . $stmt->error;
                }
            }

            echo json_encode($valido);

            case "select":
            
                $valido['success']=array('success'=>false,
            'mensaje'=>"",
            'idp'=>"",
            'nombrep'=>"",
            'descripcion'=>"",
            'precio'=>"",
            'talla'=>"",
            'cantidadp'=>"",
            'idc'=>"",);
            
            $idp=$_POST['idp'];
                $sql="SELECT * FROM prendas WHERE id_p=$idp";
            
                $res=$cx->query($sql);
                $row=$res->fetch_array();
                
                $valido['success']==true;
                $valido['mensaje']="SE ENCONTRÓ PRODUCTO";
            
                $valido['idp']=$row[0];
                $valido['nombrep']=$row[1];
                $valido['descripcion']=$row[2];
                $valido['precio']=$row[3];
                $valido['talla']=$row[4];
                $valido['cantidadp']=$row[5];
                $valido['fotop']=$row[6];
                $valido['idc']=$row[7];
            
            echo json_encode($valido);
            
            break;

            
case "update":

    $idp=$_POST['idp'];
    $a=$_POST['nombrep'];
    $b=$_POST['descripcion'];
    $c=$_POST['precio'];
    $d=$_POST['talla'];
    $e=$_POST['cantidadp'];
    $h=$_POST['idc'];

    $fileName = $_FILES['fotop']['name'];
    $fileTmpName = $_FILES['fotop']['tmp_name'];
    $uploadDirectory = '../assets/img_prendas/'; 
    
    if (!is_dir($uploadDirectory)) {
        mkdir($uploadDirectory, 0755, true);
    }
    
    $filePath = $uploadDirectory . basename($fileName);
    
    if (move_uploaded_file($fileTmpName, $filePath)) {

    $sql="UPDATE prendas SET nombrep='$a',
    descripcion='$b',
    precio='$c',
    talla='$d',
    cantidadp='$e',
    fotop='$filePath',
    id_c='$h'
    WHERE id_p=$idp";

    if($cx->query($sql)){
       $valido['success']=true;
       $valido['mensaje']="SE ACTUALIZÓ CORRECTAMENTE EL PRODUCTO";
    }else{
        $valido['success']=false;
       $valido['mensaje']="ERROR AL ACTUALIZAR EN BD"; 
    }

    
} else {
    $valido['mensaje'] = "ERROR AL ACTUALIZAR IMAGEN";
}

    echo json_encode($valido);
   break;

   case "guardarCa":
    $nombre_categoria = $_POST['nombrec'];

    $sql = "INSERT INTO categorias (categoria) VALUES ('$nombre_categoria')";

    if ($cx->query($sql)) {
        $id_categoria = $cx->insert_id;

        $valido['success'] = true;
        $valido['mensaje'] = "CATEGORÍA SE GUARDÓ CORRECTAMENTE";

        $sql2 = "INSERT INTO orden (id_c) VALUES ('$id_categoria')";

        if ($cx->query($sql2)) {
            $id_orden = $cx->insert_id;

            $valido2['success'] = true;
            $valido2['mensaje'] = "LA ORDEN SE GUARDÓ CORRECTAMENTE";

            $sql3 = "INSERT INTO d_orden (ido, idorden) VALUES (null, '$id_orden')";

            if ($cx->query($sql3)) {
                $valido3['success'] = true;
                $valido3['mensaje'] = "LA DETALLE DE ORDEN SE GUARDÓ CORRECTAMENTE";
            } else {
                $valido3['success'] = false;
                $valido3['mensaje'] = "ERROR AL GUARDAR DETALLE DE ORDEN EN BD";
            }
            echo json_encode($valido3);
        } else {
            $valido2['success'] = false;
            $valido2['mensaje'] = "ERROR AL GUARDAR ORDEN EN BD";
            echo json_encode($valido2);
        }
    } else {
        $valido['success'] = false;
        $valido['mensaje'] = "ERROR AL GUARDAR CATEGORÍA EN BD";
        echo json_encode($valido);
    }
    break;



   case "selectCa":
            
    $valido['success']=array('success'=>false,'mensaje'=>"",'idc'=>"",'nombrec'=>"");

    $idc=$_POST['idc'];
    $sql="SELECT * FROM categorias WHERE id_c=$idc";

    $res=$cx->query($sql);
    $row=$res->fetch_array();
    
    $valido['success']==true;
    $valido['mensaje']="SE ENCONTRÓ CATEGORÍA";

    $valido['idc']=$row[0];
    $valido['nombrec']=$row[1];

echo json_encode($valido);

break;


case "selectAllCa":

    $sql="SELECT * FROM categorias";
    $registros=array('data'=>array());
    $res=$cx->query($sql);
    if($res->num_rows>0){
        while($row=$res->fetch_array()){
            $registros['data'][]=array($row[0],$row[1]);
        }
    }
    
    echo json_encode($registros);

break;

    case "updateCa":

        $idc=$_POST['idc'];
        $a=$_POST['nombrec'];
    
        $sql="UPDATE categorias SET categoria='$a' WHERE id_c=$idc";
    
        if($cx->query($sql)){
           $valido['success']=true;
           $valido['mensaje']="SE ACTUALIZÓ CORRECTAMENTE LA CATEGORIA";
        }else{
            $valido['success']=false;
           $valido['mensaje']="ERROR AL ACTUALIZAR EN BD"; 
        }
    
        echo json_encode($valido);
        break;
        
    
        case "delete":
            $idp = $_POST['idp'];
        
            $sql_movimientos = "DELETE FROM movimientos WHERE id_p = $idp";
            if ($cx->query($sql_movimientos)) {
                
                $sql_prendas = "DELETE FROM prendas WHERE id_p = $idp";
                if ($cx->query($sql_prendas)) {
                    $valido['success'] = true;
                    $valido['mensaje'] = "SE ELIMINÓ CORRECTAMENTE";
                } else {
                    $valido['success'] = false;
                    $valido['mensaje'] = "ERROR AL ELIMINAR EN BD (TABLA PRENDAS)";
                }
        
            } else {
                $valido['success'] = false;
                $valido['mensaje'] = "ERROR AL ELIMINAR EN BD (TABLA MOVIMIENTOS)";
            }
            echo json_encode($valido);
            break;
        

        case "deleteCa":
            if (isset($_POST['idc'])) {
                $idc = $_POST['idc'];
        
                // Primero verifica si hay registros relacionados en la tabla 'orden'
                $sqlCheck = "SELECT COUNT(*) AS total FROM orden WHERE id_c = ?";
                $stmtCheck = $cx->prepare($sqlCheck);
                $stmtCheck->bind_param("i", $idc);
                $stmtCheck->execute();
                $stmtCheck->bind_result($total);
                $stmtCheck->fetch();
                $stmtCheck->close();
        
                if ($total > 0) {
                    $sqlDeleteDOrden = "DELETE FROM d_orden WHERE idorden IN (SELECT idorden FROM orden WHERE id_c = ?)";
                    $stmtDeleteDOrden = $cx->prepare($sqlDeleteDOrden);
                    $stmtDeleteDOrden->bind_param("i", $idc);
                    $stmtDeleteDOrden->execute();
                    $stmtDeleteDOrden->close();
        
                    $sqlDeleteOrden = "DELETE FROM orden WHERE id_c = ?";
                    $stmtDeleteOrden = $cx->prepare($sqlDeleteOrden);
                    $stmtDeleteOrden->bind_param("i", $idc);
                    $stmtDeleteOrden->execute();
                    $stmtDeleteOrden->close();
                }
        
                $sqlDeleteCategoria = "DELETE FROM categorias WHERE id_c = ?";
                $stmtDeleteCategoria = $cx->prepare($sqlDeleteCategoria);
                $stmtDeleteCategoria->bind_param("i", $idc);
        
                if ($stmtDeleteCategoria->execute()) {
                    $valido['success'] = true;
                    $valido['mensaje'] = "SE ELIMINÓ CORRECTAMENTE";
                } else {
                    $valido['success'] = false;
                    $valido['mensaje'] = "ERROR AL ELIMINAR EN BD: " . $stmtDeleteCategoria->error;
                }
                $stmtDeleteCategoria->close();
            } else {
                $valido['success'] = false;
                $valido['mensaje'] = "ID de categoría no proporcionado";
            }
        
            echo json_encode($valido);
            break;
        


            case "selectAllUsu":

                $sql="SELECT * FROM usuarios";
                $registros=array('data'=>array());
                $res=$cx->query($sql);
                if($res->num_rows>0){
                    while($row=$res->fetch_array()){
                        $registros['data'][]=array($row[0],$row[1],$row[2],$row[3],$row[5]);
                    }
                }
                
                echo json_encode($registros);
            
            break;

            case "selectMov":

           $sql="SELECT u.nombre AS nombre,
                m.tipomov AS tipomov,
                pr.nombrep AS nombrep,
                m.cant AS cantidad,
                pr.talla AS talla,
                m.fecha AS fecha
         FROM usuarios u 
         JOIN movimientos m ON u.id_u = m.id_u
         JOIN prendas pr ON m.id_p = pr.id_p";
         
            
                $registros = array();
            
                $res = $cx->query($sql);
                if ($res && $res->num_rows > 0) {
                    while ($row = $res->fetch_assoc()) {
                        $tipomov = $row['tipomov'];
            
                        $sqlInsertDOrden = "INSERT INTO d_orden (tipomov) VALUES (?)";
                        $stmtInsertDOrden = $cx->prepare($sqlInsertDOrden);
                        $stmtInsertDOrden->bind_param("s", $tipomov); 
            
                        if ($stmtInsertDOrden->execute()) {
                            $registros['data'][] = array(
                                'nombre' => $row['nombre'],
                                'tipomov' => $row['tipomov'],
                                'nombrep' => $row['nombrep'],
                                'cantidad' => $row['cantidad'],
                                'talla' => $row['talla'],
                                'fecha' => $row['fecha']
                            );
                        } else {
                            $valido['success'] = false;
                            $valido['mensaje'] = "Error al insertar en d_orden: " . $stmtInsertDOrden->error;
                            echo json_encode($valido);
                            break;
                        }
                    }
                    $valido['success'] = true;
                    $valido['mensaje'] = "Consulta y registro en d_orden exitoso";
                    $valido['data'] = $registros['data'];
                } else {
                    $valido['success'] = false;
                    $valido['mensaje'] = "No se encontraron registros";
                }
            
                echo json_encode($valido);
                break;
            


 case "graficasMov":
    $sql = "SELECT m.fecha AS fecha, m.tipomov AS tipomov FROM movimientos m";
    $registros = array();

    $res = $cx->query($sql);
    if ($res && $res->num_rows > 0) {
        while ($row = $res->fetch_assoc()) {
            $fecha = substr($row['fecha'], 0, 10);


            if (!isset($registros[$fecha])) {
                $registros[$fecha] = array('ventas' => 0, 'compras' => 0);
            }

            if ($row['tipomov'] == 'venta') {
                $registros[$fecha]['ventas']++;
            } else if ($row['tipomov'] == 'compra') {
                $registros[$fecha]['compras']++;
            }
        }
        $valido['success'] = true;
        $valido['mensaje'] = "Consulta exitosa";
        $valido['data'] = $registros;
    } else {
        $valido['success'] = false;
        $valido['mensaje'] = "No se encontraron registros";
    }

    echo json_encode($valido);
    break;


            
                default:
                    echo json_encode(["error" => "Acción no válida"]);
                    break;
        }
    } else {
        echo json_encode(["error" => "Método no permitido"]);
    }
?>