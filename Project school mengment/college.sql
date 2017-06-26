-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2017 at 10:59 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `college`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `imageFileName` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `name`, `description`, `imageFileName`) VALUES
(1, 'web development', 'Web development is a broad term for the work involved in developing a web site for the Internet (World Wide Web) or an intranet (a private network). Web development can range from developing the simplest static single page of plain text to the most complex web-based internet applications (or just web apps) electronic businesses, and social network services. A more comprehensive list of tasks to which web development commonly refers, may include web engineering, web design, web content development, client liaison, client-side/server-side scripting, web server and network security configuration, and e-commerce development. Among web professionals, \"web development\" usually refers to the main non-design aspects of building web sites: writing markup and coding. Most recently Web development has come to mean the creation of content management systems or CMS. These CMS can be made from scratch, proprietary or open source. In broad terms the CMS acts as middleware between the database and the user through the browser. A principle benefit of a CMS is that it allows non-technical people to make changes to their web site without having technical knowledge.', 'web develop.jpg'),
(2, 'java', 'Java is a general-purpose computer programming language that is concurrent, class-based, object-oriented,[14] and specifically designed to have as few implementation dependencies as possible. It is intended to let application developers \"write once, run anywhere\" (WORA),[15] meaning that compiled Java code can run on all platforms that support Java without the need for recompilation.[16] Java applications are typically compiled to bytecode that can run on any Java virtual machine (JVM) regardless of computer architecture. As of 2016, Java is one of the most popular programming languages in use,[17][18][19][20] particularly for client-server web applications, with a reported 9 million developers.[21] Java was originally developed by James Gosling at Sun Microsystems (which has since been acquired by Oracle Corporation) and released in 1995 as a core component of Sun Microsystems Java platform. The language derives much of its syntax from C and C++, but it has fewer low-level facilities than either of them.', 'java.jpg'),
(3, 'C sharp development', 'C#[note 2] (pronounced as see sharp) is a multi-paradigm programming language encompassing strong typing, imperative, declarative, functional, generic, object-oriented (class-based), and component-oriented programming disciplines. It was developed by Microsoft within its .NET initiative and later approved as a standard by Ecma (ECMA-334) and ISO (ISO/IEC 23270:2006). C# is one of the programming languages designed for the Common Language Infrastructure.\r\nC# is a general-purpose, object-oriented programming language.[12] Its development team is led by Anders Hejlsberg. The most recent version is C# 7.0 which was released in 2017 along with Visual Studio 2017', 'C sharp development.jpg'),
(4, 'PHP', 'PHP is a server-side scripting language designed primarily for web development but also used as a general-purpose programming language. Originally created by Rasmus Lerdorf in 1994,[4] the PHP reference implementation is now produced by The PHP Development Team.[5] PHP originally stood for Personal Home Page,[4] but it now stands for the recursive acronym PHP: Hypertext Preprocessor.[6]\r\nPHP code may be embedded into HTML or HTML5 markup, or it can be used in combination with various web template systems, web content management systems and web frameworks. PHP code is usually processed by a PHP interpreter implemented as a module in the web server or as a Common Gateway Interface (CGI) executable. The web server software combines the results of the interpreted and executed PHP code, which may be any type of data, including images, with the generated web page. PHP code may also be executed with a command-line interface (CLI) and can be used to implement standalone graphical applications', 'PHP.png'),
(5, 'app development', 'Mobile application development is a term used to denote the act or process by which application software is developed for mobile devices, such as personal digital assistants, enterprise digital assistants or mobile phones. These applications can be pre-installed on phones during manufacturing platforms, or delivered as web applications using server-side or client-side processing (e.g., JavaScript) to provide an \"application-like\" experience within a Web browser. Application software developers also must consider a long array of screen sizes, hardware specifications, and configurations because of intense competition in mobile software and changes within each of the platforms. Mobile app development has been steadily growing, in revenues and jobs created. A 2013 analyst report estimates there are 529,000 direct app economy jobs within the EU 28 members, 60% of which are mobile app developers.', 'app development.png');

-- --------------------------------------------------------

--
-- Table structure for table `studentcourses`
--

CREATE TABLE `studentcourses` (
  `studentCoursesID` int(80) NOT NULL,
  `coueseID` int(80) NOT NULL,
  `studentID` int(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `studentcourses`
--

INSERT INTO `studentcourses` (`studentCoursesID`, `coueseID`, `studentID`) VALUES
(82, 1, 5),
(83, 2, 5),
(84, 3, 5),
(85, 4, 5),
(86, 5, 5),
(87, 1, 6),
(91, 2, 3),
(92, 3, 3),
(93, 4, 3),
(94, 3, 4),
(95, 4, 4),
(102, 1, 2),
(103, 2, 2),
(104, 3, 2),
(105, 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `firstName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `imageFileText` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `firstName`, `lastName`, `password`, `phone`, `email`, `role`, `imageFileText`) VALUES
(2, 'ugi', 'fletzet', 'd8913df37b24c97f28f840114d05bd110dbb2e44', '0503268815', 'ugi@gmail.com', 'student', 'ugi@gmail.com.jpg'),
(3, 'moishe', 'ufnik', 'd8913df37b24c97f28f840114d05bd110dbb2e44', '0509865124', 'moishe@gmail.com', 'student', 'moishe@gmail.com.png'),
(4, 'kermit', 'the frog', 'd8913df37b24c97f28f840114d05bd110dbb2e44', '0524652333', 'kermit@gmail.com', 'student', 'kermit@gmail.com.jpg'),
(5, 'kipi', 'ben kipod', 'd8913df37b24c97f28f840114d05bd110dbb2e44', '0532689445', 'kipi@gmail.com', 'student', 'kipi@gmail.com.jpg'),
(6, 'eric', 'and bentz', 'd8913df37b24c97f28f840114d05bd110dbb2e44', '0573561889', 'ericAndBentz@gmail.com', 'student', 'ericAndBentz@gmail.com.jpg'),
(7, 'bugs', 'bunny', 'f6766af61a09264dc32a098a098d28e9c5b3e7e9', '0585648555', 'bugs@gmail.com', 'manger', 'bugs@gmail.com.jpg'),
(8, 'daffy', 'duck', 'f6766af61a09264dc32a098a098d28e9c5b3e7e9', '0503333333', 'daffy@gmail.com', 'manger', 'daffy@gmail.com.png'),
(9, 'mickey', 'mouse', 'f6766af61a09264dc32a098a098d28e9c5b3e7e9', '0595556485', 'mickey@gmail.com', 'manger', 'mickey@gmail.com.jpg'),
(10, 'taz', 'the loony', 'f6766af61a09264dc32a098a098d28e9c5b3e7e9', '0564895777', 'taz@gmail.com', 'manger', 'taz@gmail.com.jpg'),
(11, 'tweety', 'the loony', 'f6766af61a09264dc32a098a098d28e9c5b3e7e9', '0563578494', 'tweety@gmail.com', 'manger', 'tweety@gmail.com.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `studentcourses`
--
ALTER TABLE `studentcourses`
  ADD PRIMARY KEY (`studentCoursesID`),
  ADD KEY `coueseID` (`coueseID`),
  ADD KEY `studentID` (`studentID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `studentcourses`
--
ALTER TABLE `studentcourses`
  MODIFY `studentCoursesID` int(80) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `studentcourses`
--
ALTER TABLE `studentcourses`
  ADD CONSTRAINT `studentcourses_ibfk_1` FOREIGN KEY (`coueseID`) REFERENCES `course` (`course_id`),
  ADD CONSTRAINT `studentcourses_ibfk_2` FOREIGN KEY (`studentID`) REFERENCES `users` (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
