-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2025 at 11:09 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simrs`
--

-- --------------------------------------------------------

--
-- Stand-in structure for view `allinone`
-- (See below for the actual view)
--
CREATE TABLE `allinone` (
`Nama` varchar(50)
,`No RM` varchar(11)
,`Alamat` varchar(225)
,`No Regristrasi` int(11)
,`Tanggal Regristrasi` date
,`Jenis Kunjungan` varchar(255)
,`Tanggal Kunjungan` date
,`Keluhan Utama` varchar(512)
,`Keluhan Tambahan` varchar(512)
,`assesmen_id` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `assesmen`
--

CREATE TABLE `assesmen` (
  `assesmen_id` int(11) NOT NULL,
  `kunjunganid` int(11) NOT NULL,
  `keluhan_utama` varchar(512) NOT NULL,
  `keluhan_tambahan` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assesmen`
--

INSERT INTO `assesmen` (`assesmen_id`, `kunjunganid`, `keluhan_utama`, `keluhan_tambahan`) VALUES
(2, 2, 'Batuk', 'Pilek'),
(3, 2, 'Batuk', 'Pilek');

-- --------------------------------------------------------

--
-- Table structure for table `kunjungan`
--

CREATE TABLE `kunjungan` (
  `kunjungan_id` int(11) NOT NULL,
  `pendaftaranpasienid` int(11) NOT NULL,
  `jeniskunjungan` varchar(255) NOT NULL,
  `tglkunjungan` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kunjungan`
--

INSERT INTO `kunjungan` (`kunjungan_id`, `pendaftaranpasienid`, `jeniskunjungan`, `tglkunjungan`) VALUES
(2, 3, 'Control', '2025-11-20');

-- --------------------------------------------------------

--
-- Table structure for table `pasien`
--

CREATE TABLE `pasien` (
  `pasien_id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `norm` varchar(11) NOT NULL,
  `alamat` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pasien`
--

INSERT INTO `pasien` (`pasien_id`, `nama`, `norm`, `alamat`) VALUES
(1, 'Chelsey Dietrich', '0', 'Roscoeview'),
(2, 'Clementina DuBuque', '024-648-380', 'Lebsackbury'),
(3, 'Clementine Bauch', '1-463-123-4', 'McKenziehaven');

-- --------------------------------------------------------

--
-- Table structure for table `pendaftaran`
--

CREATE TABLE `pendaftaran` (
  `pendaftaran_id` int(11) NOT NULL,
  `pasien_id` int(11) NOT NULL,
  `noregristrasi` int(11) NOT NULL,
  `tglregristrasi` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pendaftaran`
--

INSERT INTO `pendaftaran` (`pendaftaran_id`, `pasien_id`, `noregristrasi`, `tglregristrasi`) VALUES
(3, 1, 1, '2025-11-19');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `role`) VALUES
(1, 'superadmin', 'superadmin', 'superadmin'),
(2, 'admisi', 'admisi', 'admisi'),
(3, 'perawat', 'perawat', 'perawat');

-- --------------------------------------------------------

--
-- Structure for view `allinone`
--
DROP TABLE IF EXISTS `allinone`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `allinone`  AS SELECT `a`.`nama` AS `Nama`, `a`.`norm` AS `No RM`, `a`.`alamat` AS `Alamat`, `s`.`noregristrasi` AS `No Regristrasi`, `s`.`tglregristrasi` AS `Tanggal Regristrasi`, `d`.`jeniskunjungan` AS `Jenis Kunjungan`, `d`.`tglkunjungan` AS `Tanggal Kunjungan`, `f`.`keluhan_utama` AS `Keluhan Utama`, `f`.`keluhan_tambahan` AS `Keluhan Tambahan`, `f`.`assesmen_id` AS `assesmen_id` FROM (((`pasien` `a` join `pendaftaran` `s` on(`a`.`pasien_id` = `s`.`pasien_id`)) join `kunjungan` `d` on(`d`.`pendaftaranpasienid` = `s`.`pendaftaran_id`)) join `assesmen` `f` on(`f`.`kunjunganid` = `d`.`kunjungan_id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assesmen`
--
ALTER TABLE `assesmen`
  ADD PRIMARY KEY (`assesmen_id`),
  ADD KEY `kunjunganid` (`kunjunganid`);

--
-- Indexes for table `kunjungan`
--
ALTER TABLE `kunjungan`
  ADD PRIMARY KEY (`kunjungan_id`),
  ADD KEY `pendaftaranpasienid` (`pendaftaranpasienid`);

--
-- Indexes for table `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`pasien_id`);

--
-- Indexes for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  ADD PRIMARY KEY (`pendaftaran_id`),
  ADD KEY `pasien_id` (`pasien_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assesmen`
--
ALTER TABLE `assesmen`
  MODIFY `assesmen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `kunjungan`
--
ALTER TABLE `kunjungan`
  MODIFY `kunjungan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pasien`
--
ALTER TABLE `pasien`
  MODIFY `pasien_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  MODIFY `pendaftaran_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assesmen`
--
ALTER TABLE `assesmen`
  ADD CONSTRAINT `assesmen_ibfk_1` FOREIGN KEY (`kunjunganid`) REFERENCES `kunjungan` (`kunjungan_id`);

--
-- Constraints for table `kunjungan`
--
ALTER TABLE `kunjungan`
  ADD CONSTRAINT `kunjungan_ibfk_1` FOREIGN KEY (`pendaftaranpasienid`) REFERENCES `pendaftaran` (`pendaftaran_id`);

--
-- Constraints for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  ADD CONSTRAINT `pendaftaran_ibfk_1` FOREIGN KEY (`pasien_id`) REFERENCES `pasien` (`pasien_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
