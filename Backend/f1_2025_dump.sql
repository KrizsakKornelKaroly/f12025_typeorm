-- MySQL dump generated from the local SQLite database
-- Source database: /opt/lampp/htdocs/2025/projects/api/data/f1-2026.sqlite
-- Generated at: 2026-03-10T08:03:50.667Z

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS `f1_2025` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `f1_2025`;

DROP TABLE IF EXISTS `race_result`;
DROP TABLE IF EXISTS `race`;
DROP TABLE IF EXISTS `driver`;
DROP TABLE IF EXISTS `circuit`;
DROP TABLE IF EXISTS `team`;

CREATE TABLE `team` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `base` VARCHAR(255) NOT NULL,
  `principal` VARCHAR(255) NOT NULL,
  `powerUnit` VARCHAR(255) NOT NULL,
  `color` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_team_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `circuit` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `lengthKm` DOUBLE NOT NULL,
  `lapRecord` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_circuit_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `driver` (
  `id` INT NOT NULL,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `nationality` VARCHAR(255) NOT NULL,
  `number` INT NOT NULL,
  `rookie` TINYINT(1) NOT NULL DEFAULT 0,
  `teamId` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_driver_teamId` (`teamId`),
  CONSTRAINT `fk_driver_team` FOREIGN KEY (`teamId`) REFERENCES `team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `race` (
  `id` INT NOT NULL,
  `round` INT NOT NULL,
  `grandPrix` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `status` VARCHAR(64) NOT NULL,
  `circuitId` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_race_circuitId` (`circuitId`),
  CONSTRAINT `fk_race_circuit` FOREIGN KEY (`circuitId`) REFERENCES `circuit` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `race_result` (
  `id` INT NOT NULL,
  `position` INT NOT NULL,
  `points` INT NOT NULL,
  `finishTime` VARCHAR(64) NOT NULL,
  `fastestLap` TINYINT(1) NOT NULL DEFAULT 0,
  `raceId` INT NOT NULL,
  `driverId` INT NOT NULL,
  `teamId` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_result_raceId` (`raceId`),
  KEY `idx_result_driverId` (`driverId`),
  KEY `idx_result_teamId` (`teamId`),
  CONSTRAINT `fk_result_race` FOREIGN KEY (`raceId`) REFERENCES `race` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_result_driver` FOREIGN KEY (`driverId`) REFERENCES `driver` (`id`),
  CONSTRAINT `fk_result_team` FOREIGN KEY (`teamId`) REFERENCES `team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `team` (`id`, `name`, `base`, `principal`, `powerUnit`, `color`) VALUES
(13, 'McLaren', 'Woking, United Kingdom', 'Andrea Stella', 'Mercedes', '#ff8000'),
(14, 'Mercedes', 'Brackley, United Kingdom', 'Toto Wolff', 'Mercedes', '#00d2be'),
(15, 'Red Bull Racing', 'Milton Keynes, United Kingdom', 'Christian Horner', 'Honda RBPT', '#1e41ff'),
(16, 'Ferrari', 'Maranello, Italy', 'Fred Vasseur', 'Ferrari', '#dc0000'),
(17, 'Williams', 'Grove, United Kingdom', 'James Vowles', 'Mercedes', '#005aff'),
(18, 'Racing Bulls', 'Faenza, Italy', 'Laurent Mekies', 'Honda RBPT', '#4f7cff'),
(19, 'Aston Martin', 'Silverstone, United Kingdom', 'Andy Cowell', 'Mercedes', '#006f62'),
(20, 'Haas F1 Team', 'Kannapolis, United States', 'Ayao Komatsu', 'Ferrari', '#b6babd'),
(21, 'Kick Sauber', 'Hinwil, Switzerland', 'Jonathan Wheatley', 'Ferrari', '#52e252'),
(22, 'Alpine', 'Enstone, United Kingdom', 'Oliver Oakes', 'Renault', '#ff5ac8');

INSERT INTO `circuit` (`id`, `name`, `country`, `city`, `lengthKm`, `lapRecord`) VALUES
(27, 'Albert Park Circuit', 'Australia', 'Melbourne', 5.278, '1:19.813'),
(28, 'Shanghai International Circuit', 'China', 'Shanghai', 5.451, '1:32.238'),
(29, 'Suzuka Circuit', 'Japan', 'Suzuka', 5.807, '1:30.983'),
(30, 'Bahrain International Circuit', 'Bahrain', 'Sakhir', 5.412, '1:31.447'),
(31, 'Jeddah Corniche Circuit', 'Saudi Arabia', 'Jeddah', 6.174, '1:30.734'),
(32, 'Miami International Autodrome', 'United States', 'Miami', 5.412, '1:29.708'),
(33, 'Autodromo Internazionale Enzo e Dino Ferrari', 'Italy', 'Imola', 4.909, '1:15.484'),
(34, 'Circuit de Monaco', 'Monaco', 'Monaco', 3.337, '1:12.909'),
(35, 'Circuit de Barcelona-Catalunya', 'Spain', 'Barcelona', 4.657, '1:16.330'),
(36, 'Circuit Gilles Villeneuve', 'Canada', 'Montreal', 4.361, '1:13.078'),
(37, 'Red Bull Ring', 'Austria', 'Spielberg', 4.318, '1:05.619'),
(38, 'Silverstone Circuit', 'United Kingdom', 'Silverstone', 5.891, '1:27.097'),
(39, 'Circuit de Spa-Francorchamps', 'Belgium', 'Spa', 7.004, '1:46.286'),
(40, 'Hungaroring', 'Hungary', 'Budapest', 4.381, '1:16.627'),
(41, 'Circuit Zandvoort', 'Netherlands', 'Zandvoort', 4.259, '1:11.097'),
(42, 'Autodromo Nazionale Monza', 'Italy', 'Monza', 5.793, '1:21.046'),
(43, 'Baku City Circuit', 'Azerbaijan', 'Baku', 6.003, '1:43.009'),
(44, 'Marina Bay Street Circuit', 'Singapore', 'Singapore', 4.94, '1:35.867'),
(45, 'Circuit of The Americas', 'United States', 'Austin', 5.513, '1:36.169'),
(46, 'Autodromo Hermanos Rodriguez', 'Mexico', 'Mexico City', 4.304, '1:17.774'),
(47, 'Autodromo Jose Carlos Pace', 'Brazil', 'Sao Paulo', 4.309, '1:10.540'),
(48, 'Las Vegas Strip Circuit', 'United States', 'Las Vegas', 6.201, '1:35.490'),
(49, 'Lusail International Circuit', 'Qatar', 'Lusail', 5.419, '1:24.319'),
(50, 'Yas Marina Circuit', 'United Arab Emirates', 'Yas Marina', 5.281, '1:26.103');

INSERT INTO `driver` (`id`, `firstName`, `lastName`, `nationality`, `number`, `rookie`, `teamId`) VALUES
(24, 'Lando', 'Norris', 'British', 4, 0, 13),
(25, 'Oscar', 'Piastri', 'Australian', 81, 0, 13),
(26, 'George', 'Russell', 'British', 63, 0, 14),
(27, 'Kimi', 'Antonelli', 'Italian', 12, 1, 14),
(28, 'Max', 'Verstappen', 'Dutch', 1, 0, 15),
(29, 'Yuki', 'Tsunoda', 'Japanese', 22, 0, 15),
(30, 'Charles', 'Leclerc', 'Monegasque', 16, 0, 16),
(31, 'Lewis', 'Hamilton', 'British', 44, 0, 16),
(32, 'Alexander', 'Albon', 'Thai', 23, 0, 17),
(33, 'Carlos', 'Sainz', 'Spanish', 55, 0, 17),
(34, 'Isack', 'Hadjar', 'French', 6, 1, 18),
(35, 'Liam', 'Lawson', 'New Zealander', 30, 0, 18),
(36, 'Fernando', 'Alonso', 'Spanish', 14, 0, 19),
(37, 'Lance', 'Stroll', 'Canadian', 18, 0, 19),
(38, 'Oliver', 'Bearman', 'British', 87, 1, 20),
(39, 'Esteban', 'Ocon', 'French', 31, 0, 20),
(40, 'Nico', 'Hulkenberg', 'German', 27, 0, 21),
(41, 'Gabriel', 'Bortoleto', 'Brazilian', 5, 1, 21),
(42, 'Pierre', 'Gasly', 'French', 10, 0, 22),
(43, 'Franco', 'Colapinto', 'Argentine', 43, 0, 22),
(44, 'Jack', 'Doohan', 'Australian', 7, 0, 22);

INSERT INTO `race` (`id`, `round`, `grandPrix`, `date`, `status`, `circuitId`) VALUES
(27, 1, 'Australian Grand Prix', '2025-03-16', 'finished', 27),
(28, 2, 'Chinese Grand Prix', '2025-03-23', 'finished', 28),
(29, 3, 'Japanese Grand Prix', '2025-04-06', 'finished', 29),
(30, 4, 'Bahrain Grand Prix', '2025-04-13', 'finished', 30),
(31, 5, 'Saudi Arabian Grand Prix', '2025-04-20', 'finished', 31),
(32, 6, 'Miami Grand Prix', '2025-05-04', 'finished', 32),
(33, 7, 'Emilia-Romagna Grand Prix', '2025-05-18', 'finished', 33),
(34, 8, 'Monaco Grand Prix', '2025-05-25', 'finished', 34),
(35, 9, 'Spanish Grand Prix', '2025-06-01', 'finished', 35),
(36, 10, 'Canadian Grand Prix', '2025-06-15', 'finished', 36),
(37, 11, 'Austrian Grand Prix', '2025-06-29', 'finished', 37),
(38, 12, 'British Grand Prix', '2025-07-06', 'finished', 38),
(39, 13, 'Belgian Grand Prix', '2025-07-27', 'finished', 39),
(40, 14, 'Hungarian Grand Prix', '2025-08-03', 'finished', 40),
(41, 15, 'Dutch Grand Prix', '2025-08-31', 'finished', 41),
(42, 16, 'Italian Grand Prix', '2025-09-07', 'finished', 42),
(43, 17, 'Azerbaijan Grand Prix', '2025-09-21', 'finished', 43),
(44, 18, 'Singapore Grand Prix', '2025-10-05', 'finished', 44),
(45, 19, 'United States Grand Prix', '2025-10-19', 'finished', 45),
(46, 20, 'Mexico City Grand Prix', '2025-10-26', 'finished', 46),
(47, 21, 'Sao Paulo Grand Prix', '2025-11-09', 'finished', 47),
(48, 22, 'Las Vegas Grand Prix', '2025-11-22', 'finished', 48),
(49, 23, 'Qatar Grand Prix', '2025-11-30', 'finished', 49),
(50, 24, 'Abu Dhabi Grand Prix', '2025-12-07', 'finished', 50);

INSERT INTO `race_result` (`id`, `position`, `points`, `finishTime`, `fastestLap`, `raceId`, `driverId`, `teamId`) VALUES
(27, 1, 25, '1:42:06.304', 0, 27, 24, 13),
(28, 2, 18, '+0.895', 0, 27, 28, 15),
(29, 3, 15, '+8.481', 0, 27, 26, 14),
(30, 1, 25, '1:30:55.026', 0, 28, 25, 13),
(31, 2, 18, '+9.748', 0, 28, 24, 13),
(32, 3, 15, '+11.097', 0, 28, 26, 14),
(33, 1, 25, '1:22:06.983', 0, 29, 28, 15),
(34, 2, 18, '+1.423', 0, 29, 24, 13),
(35, 3, 15, '+2.129', 0, 29, 25, 13),
(36, 1, 25, '1:35:39.435', 0, 30, 25, 13),
(37, 2, 18, '+15.499', 0, 30, 26, 14),
(38, 3, 15, '+16.273', 0, 30, 24, 13),
(39, 1, 25, '1:21:06.758', 0, 31, 25, 13),
(40, 2, 18, '+2.843', 0, 31, 28, 15),
(41, 3, 15, '+8.104', 0, 31, 30, 16),
(42, 1, 25, '1:28:51.587', 0, 32, 25, 13),
(43, 2, 18, '+4.63', 0, 32, 24, 13),
(44, 3, 15, '+37.644', 0, 32, 26, 14),
(45, 1, 25, '1:31:33.199', 0, 33, 28, 15),
(46, 2, 18, '+6.109', 0, 33, 24, 13),
(47, 3, 15, '+12.956', 0, 33, 25, 13),
(48, 1, 25, '1:40:33.843', 0, 34, 24, 13),
(49, 2, 18, '+3.131', 0, 34, 30, 16),
(50, 3, 15, '+3.658', 0, 34, 25, 13),
(51, 1, 25, '1:32:57.375', 0, 35, 25, 13),
(52, 2, 18, '+2.471', 0, 35, 24, 13),
(53, 3, 15, '+10.455', 0, 35, 30, 16),
(54, 1, 25, '1:31:52.688', 0, 36, 26, 14),
(55, 2, 18, '+0.228', 0, 36, 28, 15),
(56, 3, 15, '+1.014', 0, 36, 27, 14),
(57, 1, 25, '1:23:47.693', 0, 37, 24, 13),
(58, 2, 18, '+2.695', 0, 37, 25, 13),
(59, 3, 15, '+19.82', 0, 37, 30, 16),
(60, 1, 25, '1:37:15.735', 0, 38, 24, 13),
(61, 2, 18, '+6.812', 0, 38, 25, 13),
(62, 3, 15, '+34.742', 0, 38, 40, 21),
(63, 1, 25, '1:25:22.601', 0, 39, 25, 13),
(64, 2, 18, '+3.415', 0, 39, 24, 13),
(65, 3, 15, '+20.185', 0, 39, 30, 16),
(66, 1, 25, '1:35:21.231', 0, 40, 24, 13),
(67, 2, 18, '+0.698', 0, 40, 25, 13),
(68, 3, 15, '+21.916', 0, 40, 26, 14),
(69, 1, 25, '1:38:29.849', 0, 41, 25, 13),
(70, 2, 18, '+1.271', 0, 41, 28, 15),
(71, 3, 15, '+3.233', 0, 41, 34, 18),
(72, 1, 25, '1:13:24.325', 0, 42, 28, 15),
(73, 2, 18, '+19.207', 0, 42, 24, 13),
(74, 3, 15, '+21.351', 0, 42, 25, 13),
(75, 1, 25, '1:33:26.408', 0, 43, 28, 15),
(76, 2, 18, '+14.609', 0, 43, 26, 14),
(77, 3, 15, '+19.199', 0, 43, 33, 17),
(78, 1, 25, '1:40:22.367', 0, 44, 26, 14),
(79, 2, 18, '+5.43', 0, 44, 28, 15),
(80, 3, 15, '+6.066', 0, 44, 24, 13),
(81, 1, 25, '1:34:00.161', 0, 45, 28, 15),
(82, 2, 18, '+7.959', 0, 45, 24, 13),
(83, 3, 15, '+15.373', 0, 45, 30, 16),
(84, 1, 25, '1:37:58.574', 0, 46, 24, 13),
(85, 2, 18, '+30.324', 0, 46, 30, 16),
(86, 3, 15, '+31.049', 0, 46, 28, 15),
(87, 1, 25, '1:32:01.596', 0, 47, 24, 13),
(88, 2, 18, '+10.388', 0, 47, 27, 14),
(89, 3, 15, '+10.75', 0, 47, 28, 15),
(90, 1, 25, '1:21:08.429', 0, 48, 28, 15),
(91, 2, 18, '+23.546', 0, 48, 26, 14),
(92, 3, 15, '+30.488', 0, 48, 27, 14),
(93, 1, 25, '1:24:38.241', 0, 49, 28, 15),
(94, 2, 18, '+7.995', 0, 49, 25, 13),
(95, 3, 15, '+22.665', 0, 49, 33, 17),
(96, 1, 25, '1:26:07.469', 0, 50, 28, 15),
(97, 2, 18, '+12.594', 0, 50, 25, 13),
(98, 3, 15, '+16.572', 0, 50, 24, 13);

SET FOREIGN_KEY_CHECKS = 1;
