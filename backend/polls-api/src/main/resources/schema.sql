-- MySQL Workbench Forward Engineering

-- -----------------------------------------------------
-- Schema testdb
-- -----------------------------------------------------
CREATE SCHEMA `testdb`;
-- -----------------------------------------------------
-- Schema testdb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Table `testdb`.`users`
-- -----------------------------------------------------
CREATE TABLE `testdb`.`users` (
  `user_no` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '사용자 번호\n',
  `name` VARCHAR(128) NOT NULL COMMENT '이름',
  PRIMARY KEY (`user_no`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_no` ASC));


-- -----------------------------------------------------
-- Table `testdb`.`polls`
-- -----------------------------------------------------
CREATE TABLE `testdb`.`polls` (
  `poll_no` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '투표 번호',
  `subject` VARCHAR(256) NOT NULL COMMENT '투표명',
  `begin_at` DATE NOT NULL COMMENT '시작날짜',
  `end_at` DATE NOT NULL COMMENT '종료날짜\n',
  `creator_no` BIGINT UNSIGNED COMMENT '작성자 번호\n\n> 작성자 삭제될 시, NULL',
  PRIMARY KEY (`poll_no`),
  UNIQUE INDEX `poll_no_UNIQUE` (`poll_no` ASC),
  INDEX `creator_user_no_idx` (`creator_no` ASC),
  CONSTRAINT `FK_user_polls`
    FOREIGN KEY (`creator_no`)
    REFERENCES `testdb`.`users` (`user_no`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `testdb`.`poll_items`
-- -----------------------------------------------------
CREATE TABLE `testdb`.`poll_items` (
  `poll_no` BIGINT UNSIGNED NOT NULL COMMENT '투표 번호',
  `item_no` TINYINT NOT NULL COMMENT '아이템 번호',
  `contents` VARCHAR(256) NOT NULL COMMENT '내용',
  PRIMARY KEY (`poll_no`, `item_no`),
  CONSTRAINT `FK_polls_poll_items`
    FOREIGN KEY (`poll_no`)
    REFERENCES `testdb`.`polls` (`poll_no`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `testdb`.`user_polled`
-- -----------------------------------------------------
CREATE TABLE `testdb`.`user_polled` (
  `user_no` BIGINT UNSIGNED NOT NULL COMMENT '사용자 번호\n',
  `poll_no` BIGINT UNSIGNED NOT NULL COMMENT '투표 번호',
  `item_no` TINYINT NOT NULL COMMENT '선택지 번호\n',
  PRIMARY KEY (`user_no`, `poll_no`, `item_no`),
  INDEX `user_polled_poll_no_idx` (`poll_no` ASC),
  INDEX `user_polled_item_no_idx` (`item_no` ASC),
  CONSTRAINT `FK_users_user_polled`
    FOREIGN KEY (`user_no`)
    REFERENCES `testdb`.`users` (`user_no`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_polls_user_polled`
    FOREIGN KEY (`poll_no`)
    REFERENCES `testdb`.`polls` (`poll_no`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_poll_items_user_polled`
    FOREIGN KEY (`item_no`)
    REFERENCES `testdb`.`poll_items` (`item_no`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
