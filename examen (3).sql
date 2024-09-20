-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-09-2024 a las 04:34:43
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `examen`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id_carrito` int(3) NOT NULL,
  `id_p` int(3) NOT NULL,
  `fotop` varchar(100) DEFAULT NULL,
  `nombrep` varchar(100) NOT NULL,
  `talla` varchar(100) DEFAULT NULL,
  `precio` int(3) NOT NULL,
  `cantidad` int(3) NOT NULL,
  `id_u` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_c` int(3) NOT NULL,
  `categoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_c`, `categoria`) VALUES
(6, 'Sudadera'),
(9, 'Playera'),
(10, 'Vinilo'),
(11, 'Gorra'),
(12, 'Kit'),
(13, 'Pijamas'),
(17, 'Los estadios'),
(19, 'Balas Perdidas'),
(20, 'ADQA'),
(31, 'MORAT'),
(32, 'Malta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `d_orden`
--

CREATE TABLE `d_orden` (
  `idO` int(11) NOT NULL,
  `idorden` int(11) DEFAULT NULL,
  `tipomov` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `d_orden`
--

INSERT INTO `d_orden` (`idO`, `idorden`, `tipomov`) VALUES
(1312, NULL, 'venta'),
(1313, NULL, 'venta'),
(1314, NULL, 'venta'),
(1315, NULL, 'venta'),
(1316, NULL, 'venta'),
(1317, NULL, 'venta'),
(1318, NULL, 'venta'),
(1319, NULL, 'venta'),
(1320, NULL, 'venta'),
(1321, NULL, 'venta'),
(1322, NULL, 'venta'),
(1323, NULL, 'venta'),
(1324, NULL, 'venta'),
(1325, NULL, 'venta'),
(1326, NULL, 'venta'),
(1327, NULL, 'venta'),
(1328, NULL, 'venta'),
(1329, NULL, 'venta'),
(1330, NULL, 'venta'),
(1331, NULL, 'venta'),
(1332, NULL, 'venta'),
(1333, NULL, 'venta'),
(1334, NULL, 'venta'),
(1335, NULL, 'venta'),
(1336, NULL, 'venta'),
(1337, NULL, 'venta'),
(1338, NULL, 'venta'),
(1339, NULL, 'venta'),
(1340, NULL, 'venta'),
(1341, NULL, 'venta'),
(1342, NULL, 'venta'),
(1343, NULL, 'venta'),
(1344, NULL, 'venta'),
(1345, NULL, 'venta'),
(1346, NULL, 'compra'),
(1347, NULL, 'compra'),
(1348, NULL, 'compra'),
(1349, NULL, 'compra'),
(1350, NULL, 'compra'),
(1351, NULL, 'compra'),
(1352, NULL, 'compra'),
(1353, NULL, 'compra'),
(1354, NULL, 'compra'),
(1355, NULL, 'compra'),
(1356, NULL, 'compra'),
(1357, NULL, 'compra'),
(1358, NULL, 'compra'),
(1359, NULL, 'venta'),
(1360, NULL, 'venta'),
(1361, NULL, 'venta'),
(1362, NULL, 'venta'),
(1363, NULL, 'venta'),
(1364, NULL, 'venta'),
(1365, NULL, 'venta'),
(1366, NULL, 'venta'),
(1367, NULL, 'venta'),
(1368, NULL, 'venta'),
(1369, NULL, 'venta'),
(1370, NULL, 'venta'),
(1371, NULL, 'venta'),
(1372, NULL, 'venta'),
(1373, NULL, 'venta'),
(1374, NULL, 'venta'),
(1375, NULL, 'venta'),
(1376, NULL, 'venta'),
(1377, NULL, 'venta'),
(1378, NULL, 'venta'),
(1379, NULL, 'venta'),
(1380, NULL, 'venta'),
(1381, NULL, 'venta'),
(1382, NULL, 'venta'),
(1383, NULL, 'venta'),
(1384, NULL, 'venta'),
(1385, NULL, 'venta'),
(1386, NULL, 'venta'),
(1387, NULL, 'venta'),
(1388, NULL, 'venta'),
(1389, NULL, 'compra'),
(1390, NULL, 'compra'),
(1391, NULL, 'compra'),
(1392, NULL, 'compra'),
(1393, NULL, 'compra'),
(1394, NULL, 'compra'),
(1395, NULL, 'compra'),
(1396, NULL, 'compra'),
(1397, NULL, 'compra'),
(1398, NULL, 'compra'),
(1399, NULL, 'compra'),
(1400, NULL, 'compra'),
(1401, NULL, 'compra'),
(1402, 49, ''),
(1403, NULL, 'venta'),
(1404, NULL, 'venta'),
(1405, NULL, 'venta'),
(1406, NULL, 'venta'),
(1407, NULL, 'venta'),
(1408, NULL, 'venta'),
(1409, NULL, 'venta'),
(1410, NULL, 'venta'),
(1411, NULL, 'venta'),
(1412, NULL, 'venta'),
(1413, NULL, 'venta'),
(1414, NULL, 'venta'),
(1415, NULL, 'venta'),
(1416, NULL, 'venta'),
(1417, NULL, 'venta'),
(1418, NULL, 'venta'),
(1419, NULL, 'venta'),
(1420, NULL, 'venta'),
(1421, NULL, 'venta'),
(1422, NULL, 'venta'),
(1423, NULL, 'venta'),
(1424, NULL, 'venta'),
(1425, NULL, 'venta'),
(1426, NULL, 'venta'),
(1427, NULL, 'venta'),
(1428, NULL, 'venta'),
(1429, NULL, 'venta'),
(1430, NULL, 'venta'),
(1431, NULL, 'venta'),
(1432, NULL, 'venta'),
(1433, NULL, 'compra'),
(1434, NULL, 'compra'),
(1435, NULL, 'compra'),
(1436, NULL, 'compra'),
(1437, NULL, 'compra'),
(1438, NULL, 'compra'),
(1439, NULL, 'compra'),
(1440, NULL, 'compra'),
(1441, NULL, 'compra'),
(1442, NULL, 'compra'),
(1443, NULL, 'compra'),
(1444, NULL, 'compra'),
(1445, NULL, 'compra'),
(1446, NULL, 'venta'),
(1447, NULL, 'venta'),
(1448, NULL, 'venta'),
(1449, NULL, 'venta'),
(1450, NULL, 'venta'),
(1451, NULL, 'venta'),
(1452, NULL, 'venta'),
(1453, NULL, 'venta'),
(1454, NULL, 'venta'),
(1455, NULL, 'venta'),
(1456, NULL, 'venta'),
(1457, NULL, 'venta'),
(1458, NULL, 'venta'),
(1459, NULL, 'venta'),
(1460, NULL, 'venta'),
(1461, NULL, 'venta'),
(1462, NULL, 'venta'),
(1463, NULL, 'venta'),
(1464, NULL, 'venta'),
(1465, NULL, 'venta'),
(1466, NULL, 'venta'),
(1467, NULL, 'venta'),
(1468, NULL, 'venta'),
(1469, NULL, 'venta'),
(1470, NULL, 'venta'),
(1471, NULL, 'venta'),
(1472, NULL, 'venta'),
(1473, NULL, 'venta'),
(1474, NULL, 'venta'),
(1475, NULL, 'venta'),
(1476, NULL, 'compra'),
(1477, NULL, 'compra'),
(1478, NULL, 'compra'),
(1479, NULL, 'compra'),
(1480, NULL, 'compra'),
(1481, NULL, 'compra'),
(1482, NULL, 'compra'),
(1483, NULL, 'compra'),
(1484, NULL, 'compra'),
(1485, NULL, 'compra'),
(1486, NULL, 'compra'),
(1487, NULL, 'compra'),
(1488, NULL, 'compra');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos`
--

CREATE TABLE `movimientos` (
  `fecha` datetime DEFAULT NULL,
  `tipomov` varchar(100) NOT NULL,
  `id_p` int(3) NOT NULL,
  `id_u` int(3) NOT NULL,
  `cant` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `movimientos`
--

INSERT INTO `movimientos` (`fecha`, `tipomov`, `id_p`, `id_u`, `cant`) VALUES
('2024-09-16 18:14:59', 'compra', 22, 7, 50),
('2024-09-16 19:21:04', 'venta', 22, 4, 1),
('2024-09-16 21:43:19', 'venta', 22, 4, 3),
('2024-09-16 21:43:28', 'venta', 22, 4, 6),
('2024-09-16 21:50:25', 'venta', 22, 4, 9),
('2024-09-16 21:54:26', 'venta', 22, 4, 4),
('2024-09-16 21:59:07', 'compra', 23, 7, 50),
('2024-09-16 21:59:51', 'compra', 24, 7, 50),
('2024-09-16 22:00:58', 'compra', 25, 7, 50),
('2024-09-16 22:02:01', 'compra', 26, 7, 50),
('2024-09-16 22:03:02', 'compra', 27, 7, 50),
('2024-09-16 22:03:56', 'compra', 28, 7, 200),
('2024-09-16 22:04:57', 'compra', 29, 7, 50),
('2024-09-16 22:05:35', 'compra', 30, 7, 50),
('2024-09-16 22:06:13', 'compra', 31, 7, 50),
('2024-09-16 22:06:47', 'compra', 32, 7, 50),
('2024-09-16 22:07:32', 'compra', 33, 7, 50),
('2024-09-16 22:07:56', 'venta', 23, 4, 1),
('2024-09-16 22:07:59', 'venta', 28, 4, 1),
('2024-09-16 22:08:02', 'venta', 32, 4, 1),
('2024-09-17 17:59:21', 'venta', 24, 4, 1),
('2024-09-17 17:59:55', 'venta', 25, 4, 1),
('2024-09-17 18:00:02', 'venta', 22, 4, 1),
('2024-09-17 18:00:15', 'venta', 27, 4, 1),
('2024-09-17 18:01:43', 'venta', 22, 4, 1),
('2024-09-17 18:02:33', 'venta', 23, 4, 1),
('2024-09-17 18:02:36', 'venta', 24, 4, 1),
('2024-09-17 18:51:34', 'venta', 23, 4, 1),
('2024-09-17 18:51:50', 'venta', 23, 4, 2),
('2024-09-17 18:53:29', 'venta', 22, 4, 1),
('2024-09-17 18:53:47', 'venta', 28, 4, 1),
('2024-09-17 19:51:45', 'venta', 32, 4, 1),
('2024-09-17 19:51:48', 'venta', 27, 4, 1),
('2024-09-18 15:18:22', 'venta', 24, 4, 1),
('2024-09-18 15:18:28', 'venta', 26, 4, 4),
('2024-09-19 17:42:51', 'venta', 23, 4, 1),
('2024-09-19 17:42:59', 'venta', 24, 4, 2),
('2024-09-19 17:52:45', 'venta', 22, 4, 1),
('2024-09-19 17:53:01', 'venta', 24, 4, 1),
('2024-09-19 19:34:29', 'venta', 28, 4, 1),
('2024-09-19 19:34:31', 'venta', 27, 4, 1),
('2024-09-19 19:59:26', 'compra', 36, 7, 60),
('2024-09-19 19:59:54', 'venta', 36, 4, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden`
--

CREATE TABLE `orden` (
  `idorden` int(11) NOT NULL,
  `id_c` int(11) DEFAULT NULL,
  `Nombrep` varchar(100) NOT NULL,
  `talla` varchar(100) NOT NULL,
  `precio` int(10) NOT NULL,
  `cantidad` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orden`
--

INSERT INTO `orden` (`idorden`, `id_c`, `Nombrep`, `talla`, `precio`, `cantidad`) VALUES
(1, NULL, '', '', 0, 0),
(2, NULL, '', '', 0, 0),
(3, NULL, '', '', 0, 0),
(18, NULL, '', '', 0, 0),
(19, 20, '', '', 0, 0),
(20, 6, 'Sudadera', 'XL', 250, 1),
(21, 11, 'Gorra de Morat', 'Unitalla', 315, 1),
(32, 6, 'Cecytem', 'XL', 522, 1),
(33, 6, 'Cecytem', 'XL', 522, 4),
(34, 10, 'Vinilo Si ayer fuera hoy', 'null', 900, 1),
(35, 12, 'Kit ¿A donde vamos?', 'XL', 300, 1),
(36, 31, '', '', 0, 0),
(37, 6, 'Cecytem', 'XL', 522, 1),
(38, 9, 'Playera Morat', 'X', 150, 1),
(39, 9, 'Playera SAFH', 'XL', 200, 4),
(40, 6, 'Cecytem', 'XL', 522, 4),
(41, 6, 'Sudadera Mexico', 'XL', 350, 1),
(42, 9, 'Playera Morat', 'X', 150, 2),
(43, 6, 'Cecytem', 'XL', 522, 1),
(44, 6, 'Sudadera', 'XL', 250, 1),
(45, 9, 'Playera Morat', 'X', 150, 1),
(46, 11, 'Gorra de Morat', 'Unitalla', 315, 1),
(47, 12, 'Kit ¿A donde vamos?', 'XL', 300, 1),
(48, 20, 'CECyTEM', 'Unitalla', 100, 2),
(49, 32, '', '', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prendas`
--

CREATE TABLE `prendas` (
  `id_p` int(3) NOT NULL,
  `nombrep` varchar(100) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `precio` int(3) NOT NULL,
  `talla` varchar(20) NOT NULL,
  `cantidadp` int(3) NOT NULL,
  `fotop` varchar(100) DEFAULT NULL,
  `id_c` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prendas`
--

INSERT INTO `prendas` (`id_p`, `nombrep`, `descripcion`, `precio`, `talla`, `cantidadp`, `fotop`, `id_c`) VALUES
(22, 'Sudadera', 'Sudadera de Morat \"Los estadios\"', 250, 'XL', 50, '../assets/img_prendas/images (1).jpeg', 6),
(23, 'Sudadera Mexico', 'Sudadera de Morat estilo mexicano ', 350, 'XL', 50, '../assets/img_prendas/D_NQ_NP_822400-MLM69922472455_062023-O.webp', 6),
(24, 'Playera Morat', 'Playera de Morat \"Los estadios\"', 150, 'X', 50, '../assets/img_prendas/D_NQ_NP_601571-MLM75057175643_032024-O.webp', 9),
(25, 'Sudadera Tradicional', 'Sudadera de Morat con logo clasico', 200, 'XL', 50, '../assets/img_prendas/D_NQ_NP_832356-MLM49291319210_032022-O.webp', 6),
(26, 'Playera SAFH', 'Playera conmemorativa de la gira SAFH', 200, 'XL', 50, '../assets/img_prendas/PNG_camiseta_conmemorativa_si_ayer_fuera_hoy_morat_back.webp', 9),
(27, 'Kit ¿A donde vamos?', 'Pequeño Kit de Morat ', 300, 'XL', 50, '../assets/img_prendas/D_NQ_NP_867242-MLM46759278296_072021-O.webp', 12),
(28, 'Gorra de Morat', 'Gorra de Morat (Logo tradicional)', 315, 'Unitalla', 200, '../assets/img_prendas/images.jpeg', 11),
(29, 'Vinilo de Sobre el amor y sus efectos secundarios', 'Vinilo del primer album de Morat', 1000, 'null', 50, '../assets/img_prendas/images (4).jpeg', 10),
(30, 'Vinilo Balas perdidas', 'Vinilo del Album Balas Perdidas', 900, 'null', 50, '../assets/img_prendas/D_NQ_NP_744995-MLM75311255238_032024-O.webp', 10),
(31, 'Vinilo ¿A donde vamos?', 'Vinilo del album ¿A donde vamos?', 900, 'null', 50, '../assets/img_prendas/images (3).jpeg', 10),
(32, 'Vinilo Si ayer fuera hoy', 'Vinilo del Album Si ayer fuera hoy', 900, 'null', 50, '../assets/img_prendas/images (2).jpeg', 10),
(33, 'Vinilo Antes de que amanezca', 'Vinilo del EP Antes de que amanezca ', 500, 'null', 50, '../assets/img_prendas/M-MockUpADQAViniloStandard.webp', 10),
(36, 'CECyTEM', 'Logo del cecytem', 100, 'Unitalla', 60, '../assets/img_prendas/cecytem-logo-57EA94498B-seeklogo.com.png', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipomov`
--

CREATE TABLE `tipomov` (
  `id_tipo` int(3) NOT NULL,
  `tipomov` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipomov`
--

INSERT INTO `tipomov` (`id_tipo`, `tipomov`) VALUES
(1, 'compra'),
(2, 'venta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_u` int(3) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_u`, `usuario`, `password`, `nombre`, `foto`, `tipo`) VALUES
(4, 'carlos@gmail.com', 'a66f9ce99115a96e313e552416660c1d', 'Carlos', '../assets/img_profile/images (4).jpeg', 'cliente'),
(7, 'jcarlos@gmail.com', 'a66f9ce99115a96e313e552416660c1d', 'J Carlos', '../assets/img_profile/m5.png', 'admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id_carrito`),
  ADD KEY `fk_id_u` (`id_u`),
  ADD KEY `fk_id_p` (`id_p`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_c`);

--
-- Indices de la tabla `d_orden`
--
ALTER TABLE `d_orden`
  ADD PRIMARY KEY (`idO`),
  ADD KEY `idorden` (`idorden`);

--
-- Indices de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD KEY `id_p` (`id_p`),
  ADD KEY `id_u` (`id_u`),
  ADD KEY `tipomov` (`tipomov`);

--
-- Indices de la tabla `orden`
--
ALTER TABLE `orden`
  ADD PRIMARY KEY (`idorden`),
  ADD KEY `id_c` (`id_c`);

--
-- Indices de la tabla `prendas`
--
ALTER TABLE `prendas`
  ADD PRIMARY KEY (`id_p`),
  ADD KEY `id_c` (`id_c`);

--
-- Indices de la tabla `tipomov`
--
ALTER TABLE `tipomov`
  ADD PRIMARY KEY (`id_tipo`),
  ADD KEY `idx_tipomov` (`tipomov`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_u`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id_carrito` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_c` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `d_orden`
--
ALTER TABLE `d_orden`
  MODIFY `idO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1489;

--
-- AUTO_INCREMENT de la tabla `orden`
--
ALTER TABLE `orden`
  MODIFY `idorden` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `prendas`
--
ALTER TABLE `prendas`
  MODIFY `id_p` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `tipomov`
--
ALTER TABLE `tipomov`
  MODIFY `id_tipo` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_u` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `fk_id_p` FOREIGN KEY (`id_p`) REFERENCES `prendas` (`id_p`),
  ADD CONSTRAINT `fk_id_u` FOREIGN KEY (`id_u`) REFERENCES `usuarios` (`id_u`);

--
-- Filtros para la tabla `d_orden`
--
ALTER TABLE `d_orden`
  ADD CONSTRAINT `d_orden_ibfk_1` FOREIGN KEY (`idorden`) REFERENCES `orden` (`idorden`);

--
-- Filtros para la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD CONSTRAINT `id_p` FOREIGN KEY (`id_p`) REFERENCES `prendas` (`id_p`),
  ADD CONSTRAINT `id_u` FOREIGN KEY (`id_u`) REFERENCES `usuarios` (`id_u`),
  ADD CONSTRAINT `tipomov` FOREIGN KEY (`tipomov`) REFERENCES `tipomov` (`tipomov`);

--
-- Filtros para la tabla `orden`
--
ALTER TABLE `orden`
  ADD CONSTRAINT `orden_ibfk_1` FOREIGN KEY (`id_c`) REFERENCES `categorias` (`id_c`);

--
-- Filtros para la tabla `prendas`
--
ALTER TABLE `prendas`
  ADD CONSTRAINT `id_c` FOREIGN KEY (`id_c`) REFERENCES `categorias` (`id_c`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
