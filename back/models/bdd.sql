-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 19 mars 2022 à 15:25
-- Version du serveur :  8.0.21
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `squizz_game`
--

-- --------------------------------------------------------

--
-- Structure de la table `avatars`
--

DROP TABLE IF EXISTS `avatars`;
CREATE TABLE IF NOT EXISTS `avatars` (
  `id_avatar` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  PRIMARY KEY (`id_avatar`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `avatars`
--

INSERT INTO `avatars` (`id_avatar`, `filename`) VALUES
(1, 'avatar.png');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id_categorie` int NOT NULL AUTO_INCREMENT,
  `nom_categorie` varchar(150) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id_categorie`, `nom_categorie`, `image`) VALUES
(1, 'category-1', 'image.jpg'),
(2, 'category-2', 'image.jpg'),
(3, 'category-3', 'image.jpg'),
(4, 'category-4', 'image.jpg'),
(5, 'category-5', 'image.jpg'),
(6, 'category-6', 'image.jpg'),
(7, 'category-7', 'image.jpg'),
(8, 'category-8', 'image.jpg'),
(9, 'category-9', 'image.jpg'),
(10, 'category-10', 'image.jpg'),
(11, 'category-11', 'image.jpg'),
(12, 'category-12', 'image.jpg'),
(13, 'category-13', 'image.jpg'),
(14, 'category-14', 'image.jpg'),
(15, 'category-15', 'image.jpg'),
(16, 'category-16', 'image.jpg'),
(17, 'category-17', 'image.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `id_question` int NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `id_quizz` int NOT NULL,
  PRIMARY KEY (`id_question`),
  KEY `questions_ibfk_1` (`id_quizz`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`id_question`, `question`, `id_quizz`) VALUES
(1, 'Qui est le/la meilleur(e) ?', 1),
(2, 'Qui était millitaire ?', 1),
(4, '1 + 1 = 2', 1);

-- --------------------------------------------------------

--
-- Structure de la table `quizz`
--

DROP TABLE IF EXISTS `quizz`;
CREATE TABLE IF NOT EXISTS `quizz` (
  `id_quizz` int NOT NULL AUTO_INCREMENT,
  `nom_quizz` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `id_categorie` int NOT NULL,
  `id_user` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_quizz`),
  KEY `id_categorie` (`id_categorie`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `quizz`
--

INSERT INTO `quizz` (`id_quizz`, `nom_quizz`, `image`, `id_categorie`, `id_user`, `created_at`, `updated_at`) VALUES
(1, 'quizz-1', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(2, 'quizz-2', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(3, 'quizz-3', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(4, 'quizz-4', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(5, 'quizz-5', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(6, 'quizz-6', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(7, 'quizz-7', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(8, 'quizz-8', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(9, 'quizz-9', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(10, 'quizz-10', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(11, 'quizz-11', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(12, 'quizz-12', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(13, 'quizz-13', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(14, 'quizz-14', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(15, 'quizz-15', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(16, 'quizz-16', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(17, 'quizz-17', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(18, 'quizz-18', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(19, 'quizz-19', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(20, 'quizz-20', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59'),
(21, 'quizz-21', 'image.jpg', 1, 2, '2022-03-17 20:43:59', '2022-03-17 20:43:59');

-- --------------------------------------------------------

--
-- Structure de la table `reponses`
--

DROP TABLE IF EXISTS `reponses`;
CREATE TABLE IF NOT EXISTS `reponses` (
  `id_reponse` int NOT NULL AUTO_INCREMENT,
  `reponse` text NOT NULL,
  `correct` tinyint(1) NOT NULL,
  `id_question` int NOT NULL,
  PRIMARY KEY (`id_reponse`),
  KEY `id_question` (`id_question`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `reponses`
--

INSERT INTO `reponses` (`id_reponse`, `reponse`, `correct`, `id_question`) VALUES
(1, 'Amina', 1, 1),
(2, 'Lucas', 2, 1),
(3, 'Anthony', 2, 1),
(6, 'Eric', 2, 2),
(7, 'Dylan', 1, 2),
(8, 'Romain', 2, 2),
(9, 'Vrai', 1, 4),
(10, 'Faux', 2, 4);

-- --------------------------------------------------------

--
-- Structure de la table `scores`
--

DROP TABLE IF EXISTS `scores`;
CREATE TABLE IF NOT EXISTS `scores` (
  `id_score` int NOT NULL AUTO_INCREMENT,
  `score` int NOT NULL,
  `date` datetime NOT NULL,
  `id_user` int NOT NULL,
  `id_quizz` int NOT NULL,
  PRIMARY KEY (`id_score`),
  KEY `id_user` (`id_user`),
  KEY `id_quizz` (`id_quizz`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(70) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(70) NOT NULL,
  `id_avatar` int NOT NULL,
  PRIMARY KEY (`id_user`),
  KEY `id_avatar` (`id_avatar`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_user`, `user_name`, `mail`, `password`, `id_avatar`) VALUES
(2, 'amina', 'amina@amina', '$2b$08$mgqNZO5z6KRM9qBOTLdtXu63KTD5i7c8aFfiWkLGjarb/CYtoahYu', 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`id_quizz`) REFERENCES `quizz` (`id_quizz`);

--
-- Contraintes pour la table `quizz`
--
ALTER TABLE `quizz`
  ADD CONSTRAINT `quizz_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categories` (`id_categorie`),
  ADD CONSTRAINT `quizz_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `utilisateurs` (`id_user`);

--
-- Contraintes pour la table `reponses`
--
ALTER TABLE `reponses`
  ADD CONSTRAINT `reponses_ibfk_1` FOREIGN KEY (`id_question`) REFERENCES `questions` (`id_question`);

--
-- Contraintes pour la table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `utilisateurs` (`id_user`),
  ADD CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`id_quizz`) REFERENCES `quizz` (`id_quizz`);

--
-- Contraintes pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD CONSTRAINT `utilisateurs_ibfk_1` FOREIGN KEY (`id_avatar`) REFERENCES `avatars` (`id_avatar`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
