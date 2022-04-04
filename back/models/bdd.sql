-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 04 avr. 2022 à 06:39
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `avatars`
--

INSERT INTO `avatars` (`id_avatar`, `filename`) VALUES
(1, 'avatar01.jpg'),
(2, 'avatar02.jpg'),
(3, 'avatar03.jpg'),
(4, 'avatar04.jpg'),
(5, 'avatar05.jpg'),
(6, 'avatar06.jpg');

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id_categorie`, `nom_categorie`, `image`) VALUES
(1, 'culture générale', 'culture.jpg'),
(2, 'Art', 'art.jpg'),
(3, 'Sports', 'sports.jpg'),
(4, 'Cinéma', 'cinematographie.jpg'),
(5, 'Musique', 'musique.jpg'),
(6, 'Sciences', 'sciences.jpg'),
(7, 'Histoire', 'histoire.jpg'),
(8, 'Géographie', 'geographie.jpg'),
(9, 'Informatique', 'informatique.jpg'),
(10, 'Divers', 'divers.png');

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
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`id_question`, `question`, `id_quizz`) VALUES
(1, 'Quel célèbre dictateur dirigea l’URSS du milieu des années 1920 à 1953 ?', 1),
(2, 'Dans quel pays peut-on trouver la Catalogne, l’Andalousie et la Castille ?', 1),
(3, 'Qui a dit : « Le sort en est jeté » (Alea jacta est) ?', 1),
(4, 'Quel cinéaste a réalisé « Parle avec elle » et « Volver » ?', 1),
(5, 'À qui doit-on la chanson « I Shot the Sheriff » ?', 1),
(6, 'Quel pays a remporté la coupe du monde de football en 2014 ?', 1),
(7, 'Dans quelle ville italienne l’action de la pièce de Shakespeare « Roméo et Juliette » se situe-t-elle ?', 1),
(8, 'Par quel mot désigne-t-on une belle-mère cruelle ?', 1),
(9, 'Qui était le dieu de la guerre dans la mythologie grecque ?', 1),
(10, 'Parmi les animaux suivants, lequel peut se déplacer le plus rapidement ?', 1),
(11, 'De quel courant philosophique Plotin est-il le grand représentant ?', 2),
(12, 'Qui a réalisé le film « In the mood for love » ?', 2),
(13, 'Parmi les hommes politiques suivants, lequel a succédé à Hugo Chavez en tant que Président du Venezuela ?', 2),
(14, 'De l’œuvre de quel écrivain est tirée la célèbre question « Que sais-je ? »', 2),
(15, 'Quelle année retient-on habituellement comme l’année de la chute de l’Empire romain d’Occident ?', 2),
(16, 'Quelle race d’animal est un briard ?', 2),
(17, 'Où est né Mozart ?', 2),
(18, 'Combien d’états fédérés (Länder) l’Allemagne compte-t-elle ?', 2),
(19, 'Que signifie « procrastiner » ?', 2),
(20, 'Quelle théorie doit-on à Isaac Newton ?', 2),
(21, 'Selon la légende, comment le pape Adrien IV est-il mort en 1159 ?', 3),
(22, 'Que signifie « palimpseste » ?', 3),
(23, 'De quel ouvrage de la Bible l’expression « rien de nouveau sous le Soleil » est-elle tirée ?', 3),
(24, 'Segueï Rachmaninov est resté (surtout) dans les mémoires comme …', 3),
(25, 'À quel ordre de l’église catholique le pape François appartient-il ?', 3),
(26, 'Quel état des États-Unis a pour capitale Montgomery ?', 3),
(27, 'Quel animal est la drosophile, utilisée dans des expérimentations génétiques ?', 3),
(28, 'Quel philosophe a écrit « Les origines du totalitarisme » et « La crise de la culture » ?', 3),
(29, 'Parmi les castes suivantes, laquelle correspond en Inde à la caste des prêtres ?', 3),
(30, 'Quel objet est devenu le symbole du film d’animation « Akira » ?', 3),
(31, 'Quel est le diamètre du Soleil ?', 4),
(32, 'Qu’est-ce qu’une géante gazeuse ?', 4),
(33, 'Quelle est, environ, la vitesse de la lumière ?', 4),
(34, 'Notre système solaire est nommé « Voie lactée ».', 4),
(35, 'Quel engin a effectué le premier un voyage interstellaire ?', 4),
(36, 'De quel type de planète est Jupiter ?', 4),
(37, 'Qu’est-ce qu’une exoplanète ?', 4),
(38, 'Pourquoi parle-t-on d’ « expansion de l’univers » ?', 4),
(39, 'Comment nomme-t-on un nuage de gaz et de poussières répandu dans l’espace interstellaire ?', 4),
(40, 'Comment nomme-t-on en Russie quelqu’un qui voyage dans l’espace ?', 4),
(41, 'Quelles sont les langues officielles de l’Afghanistan ?', 5),
(42, 'Dans quelle mer se jette le fleuve Méandre ?', 5),
(43, 'Quel est le plus grand lac d’Amérique du Nord ?', 5),
(44, 'Parmi les États suivants, lequel n’est pas membre du Commonwealth ?', 5),
(45, 'Où se trouve le sultanat de Brunei ?', 5),
(46, 'Quelle est la capitale de fait de la Suisse ?', 5),
(47, 'Combien d’états fédérés l’Inde compte-t-elle ?', 5),
(48, 'Quelle ville compte la plus haute densité de population au monde ?', 5),
(49, 'Dans quel pays ne trouve-t-on pas une importante minorité kurde ?', 5),
(50, 'Dans quelle région du monde peut-on trouver la Terre-Adélie ?', 5),
(51, 'Qui est le/la meilleur(e)?', 6),
(52, 'Qui est le meilleur marocain ?', 6),
(53, 'Qui fait les plus beaux design ?', 6),
(54, '<div style=\"text-align: left;\"><span style=\"font-size: 25px; font-weight: 700;\">Qui pourrait vendre un frigidaire à un Eskimo ?</span></div>', 6),
(55, 'Qui est le meilleur aux échecs ?', 6),
(56, 'Qui a le meilleur rire ?', 6),
(57, 'Qui a un joli oeil tacheté ?', 6),
(58, '<div>Qui se déplace en skate ?</div>', 6),
(59, 'Qui fait le plus long trajet pour venir ?', 6),
(60, 'Qui parle le&nbsp; mieux anglais (mais a quand même des cours) ?', 6),
(61, 'Qui a passé une partie de sa vie en Amérique du Sud ?', 6),
(62, 'Qui a fait un road-trip en moto ?', 6),
(63, 'Qui est le plus sexy ?', 6),
(64, 'Qui est sponsorisé par Coca-cola ?', 6),
(65, 'Quel club de foot anglais joue dans l’enceinte de l’Emirates Stadium ?', 7),
(66, '<div>2: Quel basketteur américain a été le plus souvent sacré MVP du championnat NBA ?</div>', 7),
(67, 'Quelle a été la première équipe non européenne à atteindre une finale de Championnats du monde de hand ?', 7),
(68, '<div>&nbsp;Quel tennisman a gagné le plus de matchs à Roland-Garros ?</div>', 7),
(69, '&nbsp;Au rugby, avec quelle danse les All Blacks débutent-ils leur match ?', 7),
(70, 'Où se sont déroulés les 1ers Jeux olympiques d’hiver célébrés après la Seconde Guerre mondiale ?', 7),
(71, 'Dans quelle ville siège le CIO (Comité international olympique) ?', 7),
(72, '&nbsp;Quel joueur de football français était surnommé \"le président\" ?', 7),
(73, '<div>Au golf, comment appelle-t-on un trou réalisé en un coup sous le par ?</div>', 7),
(74, 'En boxe anglaise, quelle est la catégorie située juste au-dessus des Mouches ?', 7),
(75, '<div>Quel titre de noblesse est associé à Pierre de Coubertin ?</div>', 7),
(76, '<div>Quel club un golfeur utilise-t-il sur le green ?</div>', 7),
(77, 'Attrapez-les tous\", il s\'agit du slogan de :', 8),
(78, 'L\'histoire s\'attache à l\'enfance et à l\'adolescence de Son Goku, petit garçon très doué pour les arts martiaux.', 8),
(79, 'Pour avoir ouvert par mégarde un livre et laisser échapper toutes les cartes magiques, elle doit les retrouver et les capturer :', 8),
(80, 'Au contact de l\'eau froide, ce personnage masculin se transforme en une ravissante jeune fille :', 8),
(81, 'Adapté du manga \"City Hunter\", l\'anime raconte le quotidien d\'un homme de l\'ombre, nettoyeur, garde du corps, s\'attachant une clientèle féminine :', 8),
(82, '\"La rose de Versailles\" est un manga se situant en France pendant la Révolution Française et raconte l\'histoire d\'une jeune fille déguisée en homme par son père excédé de n\'avoir que des filles. En anime, il s\'agit de :', 8),
(83, 'Adapté d\'un manga, cet anime raconte le quotidien d\'un jeune garçon voulant devenir le meilleur footballeur du monde :', 8),
(84, '<div>Dans ce manga, deux frères sont à la recherche de la pierre philosophale pour retrouver leurs corps perdus :</div>', 8),
(87, 'makarof a crée fairy tail&nbsp;', 8),
(88, 'Le Zanpakuto d\'Ichigo se nomme Zangetsu ?&nbsp;', 8),
(89, 'En quelle année, Christophe Colomb a-t-il découvert l’Amérique ?', 9),
(90, 'En quelle année, la guerre du Vietnam a-t-elle pris fin ?', 9),
(91, '&nbsp;En quelle année, le pasteur Martin Luther King a-t-il été assassiné ?', 9),
(92, 'En quelle année, la Révolution d’octobre russe a-t-elle eu lieu ?', 9),
(93, 'En quelle année, en quelle année s’est déroulé le débarquement en Normandie ?', 9),
(94, 'En quelle année, Charlemagne a-t-il été couronné empereur ?', 9),
(95, 'En quelle année, John Lennon a-t-il été assassiné ?', 9),
(96, 'En quelle année, Napoléon a-t-il été battu à Waterloo ?', 9),
(97, 'En quelle année, en quelle année Lady Di est-elle décédée à Paris ?', 9),
(98, 'En quelle année, a été découvert le tombeau de Toutankhamon par Howard Carter ?', 9),
(99, 'En quelle année, la Révolution française a-t-elle eu lieu ?', 9),
(100, 'En quelle année, Jules César a-t-il été assassiné ?', 9),
(101, 'En quelle année, Ben Laden a-t-il été tué par un commando américain ?', 9),
(102, 'En quelle année, la peine de mort a-t-elle été abolie en France ?', 9),
(103, 'En quelle année, Gandhi a-t-il été assassiné ?', 9),
(104, 'PHP est un langage exécuté côté :', 10),
(105, 'Un \"X\" correspond pour un CD-ROM à :', 10),
(106, 'Que fait la commande \"hdparm -d 1 /dev/hdX\" sous linux ? (on remplace le X par une lettre allant de a à d) :', 10),
(107, 'Les disques durs SATA peuvent tourner pour certains à :', 10),
(108, '<div>Le gestionnaire des tâches (sous Windows XP) correspond au programme :</div><div><br></div>', 10),
(109, 'De combien de touches dispose un clavier standard ? :', 10),
(110, '<div>&nbsp;Un écran TFT est généralement plus lumineux qu\'un écran CRT :</div>', 10),
(111, 'que signifie \"www\" :', 10),
(112, 'Quel est l’élément qui n’appartient pas à la famille des \"Software\" ?', 10),
(113, 'En quoi consiste « l\'overcloaking » ?', 10),
(114, 'Quelle jeune chanteuse interprétait « Joe le Taxi&nbsp; » dans les années 80 ?', 11),
(115, '&nbsp;Qui est l’interprète du tube « Get Ur Freak On » ?', 11),
(116, '&nbsp;Quel groupe a interprété la chanson « Wake up » ?', 11),
(117, 'Qui est l’interprète du tube « Single Ladies (Put a Ring on It) » ?', 11),
(118, 'Qui est l’interprète du tube « Nothing Compares 2 U » ?', 11),
(119, 'Quel groupe a interprété la chanson « Paranoid Android » ?', 11),
(120, '<div>&nbsp;Comment était surnommé Elvis Presley ?</div><div>The President</div>', 11),
(121, 'Quel groupe a interprété la chanson « Being Boring » ?', 11),
(122, 'Qui a été ensorcelée dans l\'une de ses chansons, en 2004 ?', 11),
(123, '&nbsp;À quel chanteur doit-on le tube « Natural Blues » ?', 11),
(124, 'Quel groupe a interprété la chanson « Smells Like Teen Spirit » ?', 11),
(125, 'À quelle chanteuse doit-on le titre « I\'m outta love » ?', 11),
(126, '<div>De combien de sœurs est composé le groupe irlandais The Corrs ?</div><div>2</div>', 11),
(127, '&nbsp;Que signifie le M de M-Pokora ?', 11),
(128, 'Qui est l’interprète du tube « California Love » ?', 11),
(129, 'Quel président français est à l’origine de la construction de la pyramide du Louvre ?', 12),
(130, '&nbsp;À quel peintre doit-on « Bateaux dans le port de Collioure » ?', 12),
(131, 'À quel mouvement artistique appartenaient Rembrandt, Vermeer,&nbsp; Velázquez ou Rubens ?', 12),
(132, '&nbsp;À quel peintre doit-on « L\'autoportrait au gilet vert » ?', 12),
(133, 'Qui a peint le tableau « Barques à Martigues » ?', 12),
(134, 'Quel architecte américain a conçu le musée d\'Art moderne de Kiasma ?', 12),
(135, 'Qui a peint le célèbre tableau « Café de nuit à Arles »&nbsp; ?', 12),
(136, 'Quel peintre a représenté la fameuse « Fusillade du 3 mai » ?', 12),
(137, '&nbsp;Dans quelle ville européenne se trouve le musée Guggenheim ?', 12),
(138, 'À quel peintre doit-on « La Dentellière » ?', 12),
(139, 'À quel mouvement artistique appartenaient Kandinsky, Klee, Miró et Mondrian ?', 12),
(140, 'À quel peintre doit-on « La Liberté guidant le peuple » ?', 12),
(141, '&nbsp;À quel peintre doit-on « La Naissance de Vénus » ?', 12),
(142, 'Dans quel musée, le tableau « Les Noces de Cana » de Véronèse est-il exposé ?', 12),
(143, '&nbsp;Que représente le tableau « Persistance de la mémoire » de Dali ?', 12);

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `quizz`
--

INSERT INTO `quizz` (`id_quizz`, `nom_quizz`, `image`, `id_categorie`, `id_user`, `created_at`, `updated_at`) VALUES
(1, 'Débutant', '9fe6f040cd9439cf161f53501.jpg', 1, 1, '2022-04-01 09:00:51', '2022-04-01 09:00:51'),
(2, 'Intermédiaire', 'f4816e49b0371501a2a4bc700.jpg', 1, 1, '2022-04-01 09:29:19', '2022-04-01 09:29:19'),
(3, 'Expert', 'f4816e49b0371501a2a4bc701.jpg', 1, 1, '2022-04-01 09:38:04', '2022-04-01 09:38:04'),
(4, 'Astronomie', 'f4816e49b0371501a2a4bc702.jpg', 6, 1, '2022-04-01 10:38:07', '2022-04-01 10:38:07'),
(5, 'Générale', 'f4816e49b0371501a2a4bc703.jpg', 8, 1, '2022-04-01 10:50:45', '2022-04-01 10:50:45'),
(6, 'Promo', 'f4816e49b0371501a2a4bc704.png', 10, 1, '2022-04-01 11:04:04', '2022-04-01 11:04:04'),
(7, 'sports', 'f4816e49b0371501a2a4bc705.jpg', 3, 3, '2022-04-01 15:07:41', '2022-04-01 15:07:41'),
(8, 'Manga', 'f4816e49b0371501a2a4bc706.jpg', 4, 3, '2022-04-01 15:34:02', '2022-04-01 15:34:02'),
(9, 'Les Grandes dates de l\'histoire', 'f4816e49b0371501a2a4bc708.jpg', 7, 3, '2022-04-01 16:03:01', '2022-04-01 16:03:01'),
(10, 'informatique', 'f4816e49b0371501a2a4bc709.jpg', 9, 3, '2022-04-01 16:21:50', '2022-04-01 16:21:50'),
(11, 'quizz Musique', 'f4816e49b0371501a2a4bc70a.jpg', 5, 3, '2022-04-01 16:34:42', '2022-04-01 16:34:42'),
(12, 'Art Quizz', 'f4816e49b0371501a2a4bc70c.jpg', 2, 3, '2022-04-01 16:45:59', '2022-04-01 16:45:59');

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
) ENGINE=InnoDB AUTO_INCREMENT=425 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `reponses`
--

INSERT INTO `reponses` (`id_reponse`, `reponse`, `correct`, `id_question`) VALUES
(1, 'Staline', 1, 1),
(2, 'Trotski', 0, 1),
(3, 'Lénine', 0, 1),
(4, 'L\'Espagne', 1, 2),
(5, 'L\'Italie', 0, 2),
(6, 'Le Portugal', 0, 2),
(7, 'César', 1, 3),
(8, 'Vercingétorix', 0, 3),
(9, 'Auguste', 0, 3),
(10, 'Pedro Almodovar', 1, 4),
(11, 'Guillermo del Toro', 0, 4),
(12, 'Pablo Trapero', 0, 4),
(13, 'Bob Marley', 1, 5),
(14, 'Jim Morrison', 0, 5),
(15, 'Eric Clapton', 0, 5),
(16, 'L\'Allemagne', 1, 6),
(17, 'L\'Italie', 0, 6),
(18, 'Le Brésil', 0, 6),
(19, 'Vérone', 1, 7),
(20, 'Rome', 0, 7),
(21, 'Venise', 0, 7),
(22, 'Une marâtre', 1, 8),
(23, 'Une jocrisse', 0, 8),
(24, 'Une godiche', 0, 8),
(25, 'Arès', 1, 9),
(26, 'Apollon', 0, 9),
(27, 'Hadès', 0, 9),
(28, 'Le springbok', 1, 10),
(29, 'Le mgbobe', 0, 10),
(30, 'Le léopard', 0, 10),
(31, 'Le néoplatonisme', 1, 11),
(32, 'Le scepticisme', 0, 11),
(33, 'Le stoïcisme', 0, 11),
(34, 'Wong Kar-Wai', 1, 12),
(35, 'Chan Feng Zhao', 0, 12),
(36, 'Zhang Yimou', 0, 12),
(37, 'Nicolas Maduro', 1, 13),
(38, 'Rafael Correa', 0, 13),
(39, 'Lula', 0, 13),
(40, 'Montaigne', 1, 14),
(41, 'Étienne de la Boétie', 0, 14),
(42, 'Diderot', 0, 14),
(43, '476 ap. J.-C.', 1, 15),
(44, '496 ap. J.-C.', 0, 15),
(45, '410 ap. J.-C.', 0, 15),
(46, 'Un chien', 1, 16),
(47, 'Un cheval', 0, 16),
(48, 'Un canard', 0, 16),
(49, 'Salzbourg', 1, 17),
(50, 'Turin', 0, 17),
(51, 'Vienne', 0, 17),
(52, '16', 1, 18),
(53, '8', 0, 18),
(54, '24', 0, 18),
(55, 'Remettre à plus tard quelque chose.', 1, 19),
(56, 'Étudier beaucoup en vue d\'un examen.', 0, 19),
(57, 'Contredire systématiquement son interlocuteur.', 0, 19),
(58, 'La théorie de la gravitation universelle.', 1, 20),
(59, 'La théorie des cordes.', 0, 20),
(60, 'La théorie de l\'évolution des espèces.', 0, 20),
(61, 'En avalant une mouche.', 1, 21),
(62, 'En se cognant contre une porte.', 0, 21),
(63, 'En chutant d\'un cheval.', 0, 21),
(64, 'Manuscrit dont on a fait disparaître l\'écriture pour y écrire un autre texte.', 1, 22),
(65, 'Ce qui aide, ce qui sert d\'auxiliaire.', 0, 22),
(66, 'Farceur, personnage qui manque de sérieux et sur lequel on ne peut compter.', 0, 22),
(67, 'L\'Ecclésiaste', 1, 23),
(68, 'Le Livre de Job', 0, 23),
(69, 'La Genèse', 0, 23),
(70, 'compositeur.', 1, 24),
(71, 'chef d\'orchestre.', 0, 24),
(72, 'pianiste de génie.', 0, 24),
(73, 'Aux jésuites.', 1, 25),
(74, 'Aux bénédictins.', 0, 25),
(75, 'Aux franciscains.', 0, 25),
(76, 'L\'Alabama', 1, 26),
(77, 'L\'Ohio', 0, 26),
(78, 'Le Nouveau-Mexique', 0, 26),
(79, 'Une mouche', 1, 27),
(80, 'Un cochon d\'Inde', 0, 27),
(81, 'Un rat', 0, 27),
(82, 'Hannah Arendt', 1, 28),
(83, 'John Dewey', 0, 28),
(84, 'Edmund Husserl', 0, 28),
(85, 'Les brahmanes', 1, 29),
(86, 'Les sudras', 0, 29),
(87, 'Les vaishya', 0, 29),
(88, 'Une moto rouge', 1, 30),
(89, 'Une mitrailleuse', 0, 30),
(90, 'Une voiture bleue', 0, 30),
(91, '1 392 684 km', 1, 31),
(92, '3 904 398 km', 0, 31),
(93, '7 456 298 km', 0, 31),
(94, 'Une planète géante composée de gaz légers.', 1, 32),
(95, 'Une planète géante composée de gaz solides.', 0, 32),
(96, 'Une planète géante exhalant du méthane.', 0, 32),
(97, '300 000 km/s', 1, 33),
(98, '400 000 km/s', 0, 33),
(99, '3 000 000 km/s', 0, 33),
(100, 'Faux', 1, 34),
(101, 'Vrai', 0, 34),
(102, 'Il n\'y a jamais eu de voyage interstellaire.', 1, 35),
(103, 'Voyager 1', 0, 35),
(104, 'Galileo', 0, 35),
(105, 'Une planète géante gazeuse.', 1, 36),
(106, 'Une planète tellurique.', 0, 36),
(107, '<div>Un satellite à atmosphère dense.</div>', 0, 36),
(108, 'Une planète extérieure à notre système solaire.', 1, 37),
(109, 'Une planète dont l\'atmosphère est semblable à celle de la Terre.', 0, 37),
(110, 'Une planète tellurique de la Voie lactée.', 0, 37),
(111, 'Les objets de l\'univers s\'éloignent les uns des autres.', 1, 38),
(112, 'De nouvelles galaxies se créent en permanence.', 0, 38),
(113, 'Le nombre de planètes est hypothétiquement en croissance.', 0, 38),
(114, 'Une nébuleuse', 1, 39),
(115, 'Une supernova', 0, 39),
(116, 'Une comète', 0, 39),
(117, 'Cosmonaute', 1, 40),
(118, 'Spationaute', 0, 40),
(119, 'Astronaute', 0, 40),
(120, 'Persan et Pashtou', 1, 41),
(121, 'Afghan et Anglais', 0, 41),
(122, 'Hindi et Persan', 0, 41),
(123, 'La mer Égée', 1, 42),
(124, 'La mer Adriatique', 0, 42),
(125, 'La mer Caspienne', 0, 42),
(126, 'Le lac Supérieur', 1, 43),
(127, 'Le lac Majeur', 0, 43),
(128, 'Le lac Huron', 0, 43),
(129, 'Les États-Unis', 1, 44),
(130, 'Le Ghana', 0, 44),
(131, 'L\'Inde', 0, 44),
(132, 'Sur l\'île de Bornéo', 1, 45),
(133, 'Sur l\'île de Java', 0, 45),
(134, 'Entre l\'Inde et la Birmanie', 0, 45),
(135, 'Berne', 1, 46),
(136, 'Zurich', 0, 46),
(137, 'Bâle', 0, 46),
(138, '29', 1, 47),
(139, '28', 0, 47),
(140, '30', 0, 47),
(141, 'Manille', 1, 48),
(142, 'Delhi', 0, 48),
(143, 'Le Caire', 0, 48),
(144, 'La Jordanie', 1, 49),
(145, 'La Syrie', 0, 49),
(146, 'L\'Iran', 0, 49),
(147, 'En Antarctique', 1, 50),
(148, 'En Océanie', 0, 50),
(149, 'Dans la Toundra', 0, 50),
(150, 'Amina', 1, 51),
(151, 'Lucas', 0, 51),
(152, 'Anthony', 0, 51),
(153, 'Yassin', 1, 52),
(154, 'Warren', 0, 52),
(155, 'Karim', 0, 52),
(156, 'Anastasiia', 1, 53),
(157, 'Renaud', 0, 53),
(158, 'Dylan', 0, 53),
(159, 'Lucas', 1, 54),
(160, 'Eric', 0, 54),
(161, 'Romain', 0, 54),
(162, 'Dylan', 1, 55),
(163, 'Yassin', 0, 55),
(164, 'Anthony', 0, 55),
(165, 'Eric', 1, 56),
(166, 'Anne-Laure', 0, 56),
(167, 'Kévin', 0, 56),
(168, 'Anthony', 1, 57),
(169, 'Amina', 0, 57),
(170, 'Laurent', 0, 57),
(171, 'Karim', 1, 58),
(172, 'Anastasiia', 0, 58),
(173, 'Eric', 0, 58),
(174, 'Laurent', 1, 59),
(175, 'Karim', 0, 59),
(176, 'Renaud', 0, 59),
(177, 'Renaud', 1, 60),
(178, 'Anne-Laure', 0, 60),
(179, 'Lucas', 0, 60),
(180, 'Anne-Laure', 1, 61),
(181, 'Warren', 0, 61),
(182, 'Amina', 0, 61),
(183, 'Romain', 1, 62),
(184, 'Karim', 0, 62),
(185, 'Dylan', 0, 62),
(186, 'Kévin', 1, 63),
(187, 'Lucas', 0, 63),
(188, 'Anthony', 0, 63),
(189, 'Warren', 1, 64),
(190, 'Eric', 0, 64),
(191, 'Yassin', 0, 64),
(192, 'Manchester United', 0, 65),
(193, 'Arsenal FC', 1, 65),
(194, 'Sunderland AFC', 0, 65),
(195, 'Michael Jordan', 0, 66),
(196, 'Michael Jordan', 0, 66),
(197, 'Kareem Abdul-Jabbar', 1, 66),
(198, 'Le Qatar', 1, 67),
(199, 'Le Brésil', 0, 67),
(200, 'Le Canada', 0, 67),
(201, 'André Agassi', 0, 68),
(202, 'Roger Federer', 0, 68),
(203, 'Guillermo Vilas', 1, 68),
(204, 'La Vuvuzela', 0, 69),
(205, 'Le Haka', 1, 69),
(206, 'Le Koka', 0, 69),
(207, 'Lake Placid', 0, 70),
(208, 'Chamonix', 0, 70),
(209, 'Saint-Moritz', 1, 70),
(210, 'Lausanne', 1, 71),
(211, 'Londres', 0, 71),
(212, 'New York', 0, 71),
(213, 'Didier Deschamps', 0, 72),
(214, 'Laurent Blanc', 1, 72),
(215, 'Lilian Thuram', 0, 72),
(216, 'Birdie', 1, 73),
(217, 'Bogey', 0, 73),
(218, 'Eagle', 0, 73),
(219, 'Les Plumes', 0, 74),
(220, 'Les Légers', 0, 74),
(221, 'Les Coqs', 1, 74),
(222, 'Comte', 0, 75),
(223, 'Prince', 0, 75),
(224, 'Baron', 1, 75),
(225, 'Un Putter', 1, 76),
(226, 'Un Wedge', 0, 76),
(227, 'Un Fer', 0, 76),
(228, 'Bleach', 0, 77),
(229, 'Pokemon', 1, 77),
(230, 'One piece', 0, 77),
(231, 'Naruto', 0, 78),
(232, 'Dragon Ball', 1, 78),
(233, 'Dragon Ball Z', 0, 78),
(234, 'Chihayafuru', 0, 79),
(235, 'Sailor Moon', 0, 79),
(236, 'Sakura', 1, 79),
(237, 'Spike Spiegel', 0, 80),
(238, 'Ranma 1/2', 1, 80),
(239, 'Ken le survivant', 0, 80),
(240, 'Nicky Larson', 1, 81),
(241, 'Ichigo Kurosaki', 0, 81),
(242, 'Cobra', 0, 81),
(243, 'Lady César', 0, 82),
(244, 'Lady Oscar', 1, 82),
(245, 'Lady Diana', 0, 82),
(246, 'Olive et Tom', 1, 83),
(247, 'Run with the wind', 0, 83),
(248, 'All Out', 0, 83),
(249, 'Fullmetal Alchemist', 1, 84),
(250, 'Death Note', 0, 84),
(251, 'Magnum Opus', 0, 84),
(257, 'faux', 1, 87),
(258, 'vrai', 0, 87),
(259, 'vrai', 1, 88),
(260, 'faux', 0, 88),
(261, '1492', 1, 89),
(262, '1378', 0, 89),
(263, '1515', 0, 89),
(264, '1975', 1, 90),
(265, '1963', 0, 90),
(266, '1954', 0, 90),
(267, '1968', 1, 91),
(268, '1989', 0, 91),
(269, '1963', 0, 91),
(270, '1917', 1, 92),
(271, '1920', 0, 92),
(272, '1945', 0, 92),
(273, '1943', 0, 93),
(274, '1944', 1, 93),
(275, '1945', 0, 93),
(276, '600', 0, 94),
(277, '800', 1, 94),
(278, '700', 0, 94),
(279, '1982', 0, 95),
(280, '1986', 0, 95),
(281, '1980', 1, 95),
(282, '1815', 1, 96),
(283, '1806', 0, 96),
(284, '1810', 0, 96),
(285, '1997', 1, 97),
(286, '2000', 0, 97),
(287, '1995', 0, 97),
(288, '1922', 1, 98),
(289, '1830', 0, 98),
(290, '1815', 0, 98),
(291, '1789', 1, 99),
(292, '1793', 0, 99),
(293, '1788', 0, 99),
(294, '158 av JC', 0, 100),
(295, '44 av JC', 1, 100),
(296, '10 ap JC', 0, 100),
(297, '2011', 1, 101),
(298, '2005', 0, 101),
(299, '2088', 0, 101),
(300, '1981', 1, 102),
(301, '1986', 0, 102),
(302, '1978', 0, 102),
(303, '1948', 1, 103),
(304, '1936', 0, 103),
(305, '1940', 0, 103),
(306, 'Client', 0, 104),
(307, 'Serveur', 1, 104),
(308, 'Des deux côtés', 0, 104),
(309, 'Environ 150 Ko/s', 1, 105),
(310, 'Environ 1,35 Mo/s', 0, 105),
(311, 'Environ 5 Mo/s', 0, 105),
(312, 'Elle active le mode DMA et permet donc d\'améliorer de façon significative les performances', 1, 106),
(313, 'Elle liste le contenu du lecteur /dev/hdX', 0, 106),
(314, 'Elle ne fait rien', 0, 106),
(315, '10000 tours/minute', 1, 107),
(316, '15000 tours/minute', 0, 107),
(317, '20000 tours/minute', 0, 107),
(318, 'taskmgr.exe', 1, 108),
(319, 'task.exe', 0, 108),
(320, 'gestasks.exe', 0, 108),
(321, '103', 1, 109),
(322, '105', 0, 109),
(323, '110', 0, 109),
(324, 'Vrai', 1, 110),
(325, 'Faux', 0, 110),
(326, 'What We Want', 0, 111),
(327, 'World Wide Web', 1, 111),
(328, 'West Wild World', 0, 111),
(329, 'CD-ROM', 1, 112),
(330, 'avast anti-virus&nbsp;', 0, 112),
(331, 'Internet Explorer', 0, 112),
(332, 'Augmenter la fréquence d\'un microprocesseur', 1, 113),
(333, 'Mesurer les performances d\'un microprocesseur', 0, 113),
(334, 'Combiner deux microprocesseurs', 0, 113),
(335, 'Vanessa Paradis', 1, 114),
(336, 'Elsa', 0, 114),
(337, 'Sabine Paturel', 0, 114),
(338, 'Missy Elliott', 1, 115),
(339, 'Shakira', 0, 115),
(340, 'Beyonce', 0, 115),
(341, 'Arcade Fire', 1, 116),
(342, 'Arctic Monkeys', 0, 116),
(343, 'Good Charlotte', 0, 116),
(344, 'Beyonce', 1, 117),
(345, 'Alicia Keys', 0, 117),
(346, 'Dido', 0, 117),
(347, 'Sinead O’Connor', 1, 118),
(348, 'Cindy Lauper', 0, 118),
(349, 'Kim Wilde', 0, 118),
(350, 'Radiohead', 1, 119),
(351, 'Oasis', 0, 119),
(352, 'Police', 0, 119),
(353, 'The King', 1, 120),
(354, 'The Source', 0, 120),
(355, 'The President', 0, 120),
(356, 'Pet Shop Boys', 1, 121),
(357, 'Red Hot Chili Peppers', 0, 121),
(358, 'Muse', 0, 121),
(359, 'Lorie', 1, 122),
(360, 'Jenifer', 0, 122),
(361, 'Alizée', 0, 122),
(362, 'Moby', 1, 123),
(363, 'James Blunt', 0, 123),
(364, 'Elton John', 0, 123),
(365, 'Nirvana', 1, 124),
(366, 'Placebo', 0, 124),
(367, 'Offspring', 0, 124),
(368, 'Anastacia', 1, 125),
(369, 'Rihanna', 0, 125),
(370, 'Jennifer Lopez', 0, 125),
(371, '3', 1, 126),
(372, '4', 0, 126),
(373, '5', 0, 126),
(374, 'Mathieu', 1, 127),
(375, 'Marc', 0, 127),
(376, 'Martin', 0, 127),
(377, 'Tupac Shakur', 1, 128),
(378, 'Sean Paul', 0, 128),
(379, 'Timbaland', 0, 128),
(380, 'François Mitterrand', 1, 129),
(381, 'Charles de Gaulle', 0, 129),
(382, 'Jacques Chirac', 0, 129),
(383, 'André Derain', 1, 130),
(384, 'Paul Gauguin', 0, 130),
(385, 'Nicolas de Staël', 0, 130),
(386, 'Le baroque', 1, 131),
(387, 'Le pop art', 0, 131),
(388, 'Le rococo', 0, 131),
(389, 'Eugène Delacroix', 1, 132),
(390, 'Rembrandt', 0, 132),
(391, 'Jean-Louis David', 0, 132),
(392, 'Raoul Dufy', 1, 133),
(393, 'André Derain', 0, 133),
(394, 'Pablo Picasso', 0, 133),
(395, 'Steven Holl', 1, 134),
(396, 'David Childs', 0, 134),
(397, 'Peter Harrison', 0, 134),
(398, 'Vincent Van Gogh', 1, 135),
(399, 'Pablo Picasso', 0, 135),
(400, 'Paul Cézanne', 0, 135),
(401, 'Goya', 1, 136),
(402, 'David', 0, 136),
(403, 'Delacroix', 0, 136),
(404, 'Bilbao', 1, 137),
(405, 'Londres', 0, 137),
(406, 'Paris', 0, 137),
(407, 'Vermeer', 1, 138),
(408, 'Rembrandt', 0, 138),
(409, 'Bruegel l\'Ancien', 0, 138),
(410, 'L\'art abstrait', 1, 139),
(411, 'Le pointillisme', 0, 139),
(412, 'Le maniérisme', 0, 139),
(413, 'Delacroix', 1, 140),
(414, 'David', 0, 140),
(415, 'Rembrandt', 0, 140),
(416, 'Botticelli', 1, 141),
(417, 'Michel-Ange', 0, 141),
(418, 'Vélasquez', 0, 141),
(419, 'Musée du Louvre à Paris', 1, 142),
(420, 'Galerie des Offices à Florence', 0, 142),
(421, 'Centre Pompidou à Paris', 0, 142),
(422, 'Des montres molles', 1, 143),
(423, 'Un cheval volant', 0, 143),
(424, 'Une femme nue', 0, 143);

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `scores`
--

INSERT INTO `scores` (`id_score`, `score`, `date`, `id_user`, `id_quizz`) VALUES
(3, 2590, '2022-04-01 15:56:58', 3, 8);

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_user`, `user_name`, `mail`, `password`, `id_avatar`) VALUES
(1, 'warren', 'warren@warren.com', '$2b$08$iAM.VRCLYnqDhTihgdQjguPsKmKEhCsH/xxNjBwWnlwrM58eKhBTO', 5),
(2, 'amina', 'amina@amina.com', '$2b$08$5SKTgTrK92QdRTrnLTLhfuanuQ/S.RkrPpL4rEI2aE1UJHh2AN3k.', 1),
(3, 'karim', 'karim@karim.com', '$2b$08$sQ5UULZymPnFGJxciBFLzeLfJyVrLgAykaoYp/AS81otB1UJPtGq6', 4);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`id_quizz`) REFERENCES `quizz` (`id_quizz`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `quizz`
--
ALTER TABLE `quizz`
  ADD CONSTRAINT `quizz_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categories` (`id_categorie`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quizz_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `utilisateurs` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `reponses`
--
ALTER TABLE `reponses`
  ADD CONSTRAINT `reponses_ibfk_1` FOREIGN KEY (`id_question`) REFERENCES `questions` (`id_question`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `utilisateurs` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`id_quizz`) REFERENCES `quizz` (`id_quizz`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD CONSTRAINT `utilisateurs_ibfk_1` FOREIGN KEY (`id_avatar`) REFERENCES `avatars` (`id_avatar`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
