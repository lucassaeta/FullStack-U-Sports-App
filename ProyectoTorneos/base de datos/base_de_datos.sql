-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.12-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para deportes
CREATE DATABASE IF NOT EXISTS `deportes` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `deportes`;

-- Volcando estructura para tabla deportes.actividad
CREATE TABLE IF NOT EXISTS `actividad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `deporte` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `plazas_disponibles` int(11) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `lugar` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla deportes.actividad: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `actividad` DISABLE KEYS */;
/*!40000 ALTER TABLE `actividad` ENABLE KEYS */;

-- Volcando estructura para tabla deportes.calendario
CREATE TABLE IF NOT EXISTS `calendario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `torneo_id` int(11) NOT NULL,
  `actividad_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `torneo_id` (`torneo_id`),
  KEY `actividad_id` (`actividad_id`),
  CONSTRAINT `Calendario_ibfk_1` FOREIGN KEY (`torneo_id`) REFERENCES `torneo` (`id`),
  CONSTRAINT `Calendario_ibfk_2` FOREIGN KEY (`actividad_id`) REFERENCES `actividad` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla deportes.calendario: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `calendario` DISABLE KEYS */;
/*!40000 ALTER TABLE `calendario` ENABLE KEYS */;

-- Volcando estructura para tabla deportes.equipo
CREATE TABLE IF NOT EXISTS `equipo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `deporte` varchar(255) NOT NULL,
  `num_componentes` int(11) NOT NULL,
  `logo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla deportes.equipo: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `equipo` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipo` ENABLE KEYS */;

-- Volcando estructura para tabla deportes.torneo
CREATE TABLE IF NOT EXISTS `torneo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `deporte` varchar(255) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `min_equipos` int(11) NOT NULL,
  `num_rondas` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla deportes.torneo: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `torneo` DISABLE KEYS */;
/*!40000 ALTER TABLE `torneo` ENABLE KEYS */;

-- Volcando estructura para tabla deportes.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `deporte` varchar(255) NOT NULL,
  `horario_disponibilidad` varchar(255) NOT NULL,
  `permisos` tinyint(1) NOT NULL DEFAULT 0,
  `PASSWORD` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_un` (`nickname`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla deportes.usuario: ~8 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `nombre`, `email`, `nickname`, `deporte`, `horario_disponibilidad`, `permisos`, `PASSWORD`) VALUES
	(3, 'Alex2', 'alexfdeaszperera@hotmail.com', 'alexfp2001', 'futbol', '13:00-14:00', 0, '$2b$10$0xB6RHejiehnRBW5lFz1UeURZBKd1lSSnqKrjKkohTz9ujTyse826'),
	(4, 'Alex3', 'alexfdeaszperera2@hotmail.com', 'alexfp220901', 'futbol', '13:00-14:00', 0, '$2b$10$a6rRVnxjGGpMmZsx.Wfuc.LsnkmBHq6JSdRLbijE9jLqgV4oA3kCq'),
	(5, 'Paco', 'paco@gmail.com', 'paquito2', 'futbol,padel', '13:00-14:00', 0, '$2b$10$.ZWzSnhm.UnMiNAYtdjfZOmh4ojeQU/VioZZeIIVCVn/CCTM5dBp.'),
	(7, 'jaunjo', 'jaun@gmail.com', 'jaun21', 'futbol,padel', '11:00-14:00', 0, '$2b$10$HbOXKqdZCTUMytwdLrAf1OP8jIAjFwgx0JzoMXUxbIANhfGzR0L.6'),
	(8, 'jaunjo', 'jaun@gmaiwsl.com', 'jaunw21', 'futbol,padel', '11:00-14:00', 0, '$2b$10$hlFwtVYzZy3E4gUW5VlT/.eMOauFNOkclyv.A5ikGuJlxl5tjnnyu'),
	(9, 'marcos', 'marcos@gmaiwsl.com', 'marcos21', 'futbol', '11:00-15:00', 0, '$2b$10$dl5q/2saK3kbm1E0gI53ZOghWtC6bYlxdmDk1Cj.dHOS3v2jDucOy'),
	(10, 'javi', 'javi@gmaiwsl.com', 'javichu', 'futbol,padel', '11:00-12:00', 0, '$2b$10$a4jLgBIiACAzgIEQ009aBe6pNyFryeZ7xZZMw1gj/FkMTbDpqPtjC'),
	(11, 'javi3', 'javi3@gmaiwsl.com', 'javi3chu', 'futbol,padel', '11:00-12:00', 0, '$2b$10$JQyx6qt4jPD/gnR59Yv9K.c7zqZ09ergr73uX9OeQZkhKCYurLtZa');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

-- Volcando estructura para tabla deportes.usuario_actividad
CREATE TABLE IF NOT EXISTS `usuario_actividad` (
  `usuario_id` int(11) NOT NULL,
  `actividad_id` int(11) NOT NULL,
  PRIMARY KEY (`usuario_id`,`actividad_id`),
  KEY `actividad_id` (`actividad_id`),
  CONSTRAINT `Usuario_Actividad_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `Usuario_Actividad_ibfk_2` FOREIGN KEY (`actividad_id`) REFERENCES `actividad` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla deportes.usuario_actividad: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario_actividad` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_actividad` ENABLE KEYS */;

-- Volcando estructura para tabla deportes.usuario_equipo
CREATE TABLE IF NOT EXISTS `usuario_equipo` (
  `usuario_id` int(11) NOT NULL,
  `equipo_id` int(11) NOT NULL,
  PRIMARY KEY (`usuario_id`,`equipo_id`),
  KEY `equipo_id` (`equipo_id`),
  CONSTRAINT `Usuario_Equipo_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `Usuario_Equipo_ibfk_2` FOREIGN KEY (`equipo_id`) REFERENCES `equipo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla deportes.usuario_equipo: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario_equipo` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_equipo` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
