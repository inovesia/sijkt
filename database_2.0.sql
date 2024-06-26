# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 34.101.147.36 (MySQL 5.5.5-10.6.16-MariaDB-0ubuntu0.22.04.1)
# Database: express
# Generation Time: 2024-05-13 07:14:36 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table master_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `master_user`;

CREATE TABLE `master_user` (
  `user_id` char(36) NOT NULL DEFAULT '',
  `user_name` varchar(100) DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `user_phone` varchar(20) DEFAULT NULL,
  `user_password` char(36) DEFAULT NULL,
  `user_sijkt` char(36) DEFAULT NULL,
  `user_revoked` datetime DEFAULT NULL,
  `user_status` char(2) DEFAULT NULL,
  `user_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `master_user` WRITE;
/*!40000 ALTER TABLE `master_user` DISABLE KEYS */;

INSERT INTO `master_user` (`user_id`, `user_name`, `user_email`, `user_phone`, `user_password`, `user_sijkt`, `user_revoked`, `user_status`, `user_timestamp`)
VALUES
	('65abd28e-ffcf-11ed-9425-42010ab80002','Amanda Rawles','amanda.rawles@yopmail.com','0811222001','c7d9f9cb68dab1a9966de02167009017',NULL,NULL,'A','2023-05-31 16:22:54'),
	('65abd294-ffcf-11ed-9425-42010ab80002','Bella Saphira','bella.saphira@yopmail.com','0811222002','c7d9f9cb68dab1a9966de02167009017',NULL,NULL,'A','2023-05-31 16:22:54'),
	('65abd298-ffcf-11ed-9425-42010ab80002','Calista Amadea','calista.amadea@yopmail.com','0811222003','c7d9f9cb68dab1a9966de02167009017',NULL,NULL,'A','2023-05-31 16:22:54'),
	('65abd299-ffcf-11ed-9425-42010ab80002','Dea Mirella','dea.mirella@yopmail.com','0811222004','c7d9f9cb68dab1a9966de02167009017',NULL,NULL,'A','2023-05-31 16:22:54'),
	('65abd29c-ffcf-11ed-9425-42010ab80002','Eka Deli','eka.deli@yopmail.com','0811222005','c7d9f9cb68dab1a9966de02167009017',NULL,NULL,'A','2023-05-31 16:22:54'),
	('65abd29f-ffcf-11ed-9425-42010ab80002','Feby Febiola','feby.febiola@yopmail.com','0811222006','c7d9f9cb68dab1a9966de02167009017',NULL,NULL,'A','2023-05-31 16:22:54');

/*!40000 ALTER TABLE `master_user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
