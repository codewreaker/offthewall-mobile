-- phpMyAdmin SQL Dump
-- version 4.1.13
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 03, 2015 at 06:09 AM
-- Server version: 5.1.73-cll
-- PHP Version: 5.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `csashesi_prophet-agyeman-prempeh`
--

-- --------------------------------------------------------

--
-- Table structure for table `otw_users`
--

CREATE TABLE IF NOT EXISTS `otw_users` (
  `user_id` int(4) NOT NULL AUTO_INCREMENT,
  `facebook_id` int(30) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `user_pword` varchar(50) NOT NULL,
  `user_telephone` varchar(15) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `otw_users`
--

INSERT INTO `otw_users` (`user_id`, `facebook_id`, `email`, `user_pword`, `user_telephone`) VALUES
(1, NULL, 'israel.agyeman.prempeh@gmail.com', 'israel', '233272134165'),
(2, NULL, 'agatha.maison@gmail.com', 'agatha', '233272134165');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
