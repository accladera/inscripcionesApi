-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-09-2020 a las 23:30:09
-- Versión del servidor: 8.0.20
-- Versión de PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inscripciones`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_carrera_delete` (IN `p_id` INT)  NO SQL
DELETE FROM carrera  WHERE id = p_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_carrera_insert` (IN `p_nombre` VARCHAR(200))  NO SQL
BEGIN
INSERT INTO carrera(nombre)
VALUES (p_nombre);
SELECT LAST_INSERT_ID() as lastId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_carrera_search` (IN `p_busqueda` VARCHAR(200))  NO SQL
SELECT 
    id,nombre
                FROM carrera 
                WHERE  nombre LIKE CONCAT('%',p_busqueda,'%')$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_carrera_select` (IN `p_id` INT)  NO SQL
SELECT id, nombre FROM carrera WHERE  id = p_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_carrera_selectAll` ()  NO SQL
SELECT id,nombre
FROM carrera$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_carrera_update` (IN `p_nombre` VARCHAR(200), IN `p_id` INT)  NO SQL
UPDATE carrera 
            SET
                nombre = p_nombre
            WHERE
                id = p_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_inscripcion_delete` (IN `p_id` INT)  NO SQL
DELETE FROM inscripcion  WHERE id = p_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_inscripcion_insert` (IN `p_usuarioId` INT, IN `p_carreraId` INT, IN `p_materiaId` INT)  NO SQL
BEGIN
INSERT INTO inscripcion(usuarioId,carreraId,materiaId)
VALUES (p_usuarioId,p_carreraId,p_materiaId);
SELECT LAST_INSERT_ID() as lastId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_inscripcion_search` (IN `p_busqueda` INT(200))  NO SQL
SELECT 
    id, usuarioId, carreraId, materiaId
                FROM inscripcion 
                WHERE  usuarioId  = p_busqueda 		
                OR carreraId = p_busqueda
                OR materiaId = p_busqueda$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_inscripcion_searchAdmin` (IN `p_busqueda` VARCHAR(200))  NO SQL
SELECT 
I.id, I.usuarioId, I.materiaId, I.carreraId
FROM inscripcion I 
INNER JOIN usuario U ON I.usuarioId = U.id
INNER JOIN materia M ON I.materiaId= M.id
INNER JOIN carrera C ON I.carreraId= c.id
WHERE  U.nombreCompleto LIKE CONCAT('%',p_busqueda,'%') 
OR M.nombre LIKE CONCAT('%',p_busqueda,'%')
OR C.nombre LIKE CONCAT('%',p_busqueda,'%')$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_inscripcion_searchByUser` (IN `p_usuarioId` INT)  NO SQL
SELECT id,usuarioId , carreraId, materiaId
            FROM inscripcion WHERE  usuarioId = p_usuarioId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_inscripcion_searchUser` (IN `p_busqueda` VARCHAR(200), IN `p_usuarioId` INT)  NO SQL
SELECT 
I.id, I.usuarioId, I.materiaId, I.carreraId
FROM inscripcion I 
INNER JOIN usuario U ON I.usuarioId = U.id
INNER JOIN materia M ON I.materiaId= M.id
INNER JOIN carrera C ON I.carreraId= c.id
WHERE  M.nombre LIKE CONCAT('%',p_busqueda,'%')
AND  U.id = p_usuarioId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_inscripcion_select` (IN `p_id` INT)  NO SQL
SELECT id,usuarioId , carreraId, materiaId
            FROM inscripcion WHERE  id = p_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_inscripcion_selectAll` ()  NO SQL
SELECT id,usuarioId, carreraId,materiaId
FROM inscripcion$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_inscripcion_selectTotal` (IN `p_usuarioId` INT)  NO SQL
SELECT 
SUM( M.precio ) as total
FROM inscripcion I
INNER JOIN materia M ON I.materiaId = M.id
WHERE I.usuarioId = p_usuarioId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_inscripcion_update` (IN `p_usuarioId` INT, IN `p_carreraId` INT, IN `p_materiaId` INT, IN `p_id` INT)  NO SQL
UPDATE inscripcion 
            SET
            	usuarioId = p_usuarioId,
                carreraId = p_carreraId,
                materiaId = p_materiaId
            WHERE
                id = p_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_materia_delete` (IN `p_id` INT)  NO SQL
DELETE FROM materia  WHERE id = p_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_materia_insert` (IN `p_nombre` VARCHAR(200), IN `p_semestre` VARCHAR(200), IN `p_precio` INT, IN `p_carreraId` INT)  NO SQL
BEGIN
INSERT INTO materia(nombre, semestre, precio, carreraId)
VALUES (p_nombre, p_semestre, p_precio ,p_carreraId);
SELECT LAST_INSERT_ID() as lastId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_materia_search` (IN `p_busqueda` VARCHAR(200))  NO SQL
SELECT 
    id, nombre, semestre,precio, carreraId
    FROM materia 
                WHERE  nombre LIKE CONCAT('%',p_busqueda,'%') 
                OR semestre LIKE CONCAT('%',p_busqueda,'%')$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_materia_select` (IN `p_id` INT)  NO SQL
SELECT id, nombre,semestre, precio , carreraId
            FROM materia WHERE  id = p_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_materia_selectAll` ()  NO SQL
SELECT id,nombre, semestre, precio, carreraId
FROM materia
ORDER BY carreraId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_materia_selectAllUser` (IN `p_usuarioId` INT)  NO SQL
SELECT M.id, M.nombre,M.semestre,M.precio,M.carreraId
FROM materia M 
INNER JOIN usuario U ON U.carreraId =M.carreraId 
INNER JOIN carrera C ON C.id = M.carreraId 
WHERE U.id = p_usuarioId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_materia_update` (IN `p_nombre` VARCHAR(200), IN `p_semestre` VARCHAR(200), IN `p_precio` INT, IN `p_carreraId` INT, IN `p_id` INT)  NO SQL
UPDATE materia 
            SET
                nombre = p_nombre,
                semestre = p_semestre,
                precio  = p_precio,
                carreraId = p_carreraId
            WHERE
                id = p_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario_delete` (IN `p_id` INT)  NO SQL
DELETE FROM usuario  WHERE id = p_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario_insert` (IN `p_nombreCompleto` VARCHAR(200), IN `p_email` VARCHAR(200), IN `p_password` VARCHAR(200), IN `p_tipoUsuario` INT, IN `p_carreraId` INT)  NO SQL
BEGIN
INSERT INTO usuario(nombreCompleto,email,password,tipoUsuario,carreraId)
VALUES (p_nombreCompleto,
        p_email,
        p_password, 
        p_tipoUsuario,
        p_carreraId);
SELECT LAST_INSERT_ID() as lastId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario_search` (IN `p_busqueda` VARCHAR(200))  NO SQL
SELECT 
    id, nombreCompleto, email, password, tipoUsuario, carreraId
                FROM usuario 
                WHERE  nombreCompleto LIKE     				CONCAT('%',p_busqueda,'%') 
                OR email LIKE CONCAT('%',p_busqueda,'%')$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario_searchByEmail` (IN `p_email` VARCHAR(200))  NO SQL
SELECT 
    id, nombreCompleto, email, password, tipoUsuario, carreraId
                FROM usuario 
                WHERE  email LIKE p_email$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario_select` (IN `p_id` INT)  NO SQL
SELECT U.id, U.nombreCompleto, U.email, U.password, U.tipoUsuario, U.carreraId
            FROM usuario U WHERE  U.id = p_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario_selectAll` ()  NO SQL
SELECT id, nombreCompleto, email, password, tipoUsuario, carreraId
FROM usuario$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario_update` (IN `p_nombreCompleto` VARCHAR(200), IN `p_email` VARCHAR(200), IN `p_password` VARCHAR(200), IN `p_tipoUsuario` INT, IN `p_carreraId` INT, IN `p_id` INT)  NO SQL
UPDATE usuario 
            SET
                nombreCompleto = p_nombreCompleto,
                email = p_email,
                password = p_password,
                tipoUsuario = p_tipoUsuario,
                carreraId = p_carreraId
                
            WHERE
                id = p_id$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera`
--

CREATE TABLE `carrera` (
  `id` int NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `carrera`
--

INSERT INTO `carrera` (`id`, `nombre`) VALUES
(1, 'Ingeniería en sistemas'),
(2, 'Veterinaria'),
(3, 'Derecho'),
(4, 'Medicina'),
(5, 'Farmacéutica'),
(6, 'Ingenieria industrial'),
(7, 'Marketing');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE `inscripcion` (
  `id` int NOT NULL,
  `usuarioId` int NOT NULL,
  `carreraId` int NOT NULL,
  `materiaId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `inscripcion`
--

INSERT INTO `inscripcion` (`id`, `usuarioId`, `carreraId`, `materiaId`) VALUES
(2, 3, 1, 1),
(3, 6, 2, 1),
(22, 3, 1, 4),
(33, 3, 1, 9),
(35, 3, 1, 4),
(36, 20, 4, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `id` int NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `semestre` varchar(200) NOT NULL,
  `precio` int NOT NULL,
  `carreraId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`id`, `nombre`, `semestre`, `precio`, `carreraId`) VALUES
(1, 'Ingenieria Web II', 'Sexto', 1200, 2),
(2, 'Calculo', 'Segundo', 1100, 3),
(3, 'Fundamentos de derecho', 'Tercero', 1200, 3),
(4, 'Calculo II', 'Cuarto', 1200, 1),
(5, 'Programación I', 'Primer', 1200, 1),
(6, 'Anatomia II', 'Segundo', 1500, 4),
(7, 'Fundamentos de Veterinaria', 'Primer', 1000, 2),
(8, 'Ingles I', 'Segundo', 1000, 4),
(9, 'Programacion II', 'Segundo', 1100, 1),
(10, 'Matematicas financiera', 'Cuarto', 1200, 6),
(11, 'Quimica I', 'Quinto', 1230, 5),
(12, 'Ingenieria en software', 'Sexto', 1100, 1),
(13, 'Administracion I', 'Segundo', 1220, 6),
(14, 'Quimica 2', 'Tercero', 1200, 5),
(15, 'Laboratorio I', 'Cuarto', 1200, 5),
(16, 'Ingles I', 'Segundo', 1000, 7),
(17, 'Sociales', 'Segundo', 1200, 3),
(18, 'Enfermedades parasitarias', 'Tercero', 1200, 2),
(19, 'Agronomia', 'Quinto', 1300, 2),
(20, 'Marketing comercial', 'Tercero', 1200, 7),
(21, 'Criminologia', 'Cuarto', 1200, 3),
(22, 'Seguridad Industrial', 'Quinto', 1200, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int NOT NULL,
  `nombreCompleto` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `tipoUsuario` int NOT NULL,
  `carreraId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombreCompleto`, `email`, `password`, `tipoUsuario`, `carreraId`) VALUES
(3, 'Carolina Cladera Estudiante', 'c24@gmail.com', '123', 0, 1),
(5, 'Carolina Cladera Admin', 'caro24@gmail.com', '123', 1, 3),
(6, 'Sophia Gamarra', 'sophi@gmail.com', '123', 0, 2),
(10, 'nara', 'n@gmail.com', '123', 1, 3),
(18, 'Manuel Turizo', 'manu@gmail.com', '123', 0, 3),
(19, 'Abel Tesfaye', 'tw@gmail.com', '123', 0, 1),
(20, 'Laura Jimenez', 'lauri24@gmail.com', '123', 0, 4),
(22, 'Selena Espinoza', 'se@gmail.com', '123`', 0, 6),
(24, 'Luis Mariaca', 'lm@gmail.com', '123', 0, 7);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrera`
--
ALTER TABLE `carrera`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_inscripcion_usuario1_idx` (`usuarioId`),
  ADD KEY `fk_inscripcion_carrera1_idx` (`carreraId`),
  ADD KEY `fk_inscripcion_materia1_idx` (`materiaId`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_materia_carrera1_idx` (`carreraId`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario_carrera1_idx` (`carreraId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrera`
--
ALTER TABLE `carrera`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD CONSTRAINT `fk_inscripcion_carrera1` FOREIGN KEY (`carreraId`) REFERENCES `carrera` (`id`),
  ADD CONSTRAINT `fk_inscripcion_materia1` FOREIGN KEY (`materiaId`) REFERENCES `materia` (`id`),
  ADD CONSTRAINT `fk_inscripcion_usuario1` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `materia`
--
ALTER TABLE `materia`
  ADD CONSTRAINT `fk_materia_carrera` FOREIGN KEY (`carreraId`) REFERENCES `carrera` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_carrera1` FOREIGN KEY (`carreraId`) REFERENCES `carrera` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
