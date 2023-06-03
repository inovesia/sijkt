# SIJKT SSO Example

Please import database.sql into your mysql database server

## Database Structure

### master_user
```
CREATE TABLE `master_user` (
  `user_id` char(36) NOT NULL DEFAULT '',
  `user_name` varchar(100) DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `user_phone` varchar(20) DEFAULT NULL,
  `user_password` char(36) DEFAULT NULL,
  `user_sijkt` char(36) DEFAULT NULL,
  `user_status` char(2) DEFAULT NULL,
  `user_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

### sample users
```
INSERT INTO `master_user` (`user_id`, `user_name`, `user_email`, `user_phone`, `user_password`, `user_sijkt`, `user_status`, `user_timestamp`)
VALUES
	('65abd28e-ffcf-11ed-9425-42010ab80002','Amanda Rawles','amanda.rawles@yopmail.com','0811222001','c7d9f9cb68dab1a9966de02167009017',NULL,'A','2023-05-31 16:22:54'),
	('65abd294-ffcf-11ed-9425-42010ab80002','Bella Saphira','bella.saphira@yopmail.com','0811222002','c7d9f9cb68dab1a9966de02167009017',NULL,'A','2023-05-31 16:22:54'),
	('65abd298-ffcf-11ed-9425-42010ab80002','Calista Amadea','calista.amadea@yopmail.com','0811222003','c7d9f9cb68dab1a9966de02167009017',NULL,'A','2023-05-31 16:22:54'),
	('65abd299-ffcf-11ed-9425-42010ab80002','Dea Mirella','dea.mirella@yopmail.com','0811222004','c7d9f9cb68dab1a9966de02167009017',NULL,'A','2023-05-31 16:22:54'),
	('65abd29c-ffcf-11ed-9425-42010ab80002','Eka Deli','eka.deli@yopmail.com','0811222005','c7d9f9cb68dab1a9966de02167009017',NULL,'A','2023-05-31 16:22:54'),
	('65abd29f-ffcf-11ed-9425-42010ab80002','Feby Febiola','feby.febiola@yopmail.com','0811222006','c7d9f9cb68dab1a9966de02167009017',NULL,'A','2023-05-31 16:22:54');
```

### transaction_session
```
CREATE TABLE `transaction_session` (
  `session_id` char(36) NOT NULL DEFAULT '',
  `session_user_id` char(36) DEFAULT NULL,
  `session_value` varchar(200) DEFAULT NULL,
  `session_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`session_id`),
  KEY `FK_session_user` (`session_user_id`),
  CONSTRAINT `FK_session_user` FOREIGN KEY (`session_user_id`) REFERENCES `master_user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

## user password
All user password is `Qwerty78`
