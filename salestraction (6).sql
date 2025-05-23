-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 23 mai 2025 à 13:13
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `salestraction`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id_admin` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id_admin`, `email`, `password`) VALUES
(1, 'remremdu29@yahoo.fr', 'jfzoefnp16');

-- --------------------------------------------------------

--
-- Structure de la table `company`
--

DROP TABLE IF EXISTS `company`;
CREATE TABLE IF NOT EXISTS `company` (
  `id_company` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `siret` varchar(255) DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `postal_code` int NOT NULL,
  `admin_validation` int DEFAULT NULL,
  PRIMARY KEY (`id_company`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `company`
--

INSERT INTO `company` (`id_company`, `name`, `siret`, `password`, `email`, `phone_number`, `postal_code`, `admin_validation`) VALUES
(1, 'GreenPocket', '821456789', 'Gp@2024eco', 'contact@greenpocket.fr', '187654321', 75011, 1),
(2, 'SkillUp', '912345678', 'Su!Learn88', 'hello@skillup.io', '176543289', 75010, 1),
(3, 'TidySpace', '834567123', 'Ts#Clean77', 'support@tidyspace.com', '199887766', 69003, 1),
(4, 'Foodiez', '745612389', 'Fz@Taste55', 'contact@foodiez.fr', '142231100', 13006, 0),
(5, 'Move&Co', '891234567', 'Mc@GoFast', 'contact@moveco.io', '188991122', 31000, 1);

-- --------------------------------------------------------

--
-- Structure de la table `liking`
--

DROP TABLE IF EXISTS `liking`;
CREATE TABLE IF NOT EXISTS `liking` (
  `id_like` int NOT NULL AUTO_INCREMENT,
  `id_offer` int NOT NULL,
  `id_student` int NOT NULL,
  `is_student` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id_like`),
  KEY `Sec` (`id_offer`),
  KEY `Secondary` (`id_student`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `liking`
--

INSERT INTO `liking` (`id_like`, `id_offer`, `id_student`, `is_student`) VALUES
(1, 5, 12, b'0'),
(2, 5, 12, b'1'),
(3, 10, 2, b'0'),
(4, 10, 3, b'0'),
(5, 10, 9, b'0'),
(6, 10, 18, b'0'),
(7, 9, 37, b'1'),
(8, 9, 37, b'0'),
(9, 10, 4, b'0'),
(10, 10, 5, b'0');

-- --------------------------------------------------------

--
-- Structure de la table `matching`
--

DROP TABLE IF EXISTS `matching`;
CREATE TABLE IF NOT EXISTS `matching` (
  `id_match` int NOT NULL AUTO_INCREMENT,
  `match_date` datetime NOT NULL,
  `id_offer` int NOT NULL,
  `id_student` int NOT NULL,
  PRIMARY KEY (`id_match`),
  KEY `appariement_offre_FK` (`id_offer`),
  KEY `appariement_etudiant_FK` (`id_student`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `matching`
--

INSERT INTO `matching` (`id_match`, `match_date`, `id_offer`, `id_student`) VALUES
(1, '2025-05-21 08:15:12', 5, 12),
(2, '2025-05-23 12:10:32', 9, 37);

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id_message` int NOT NULL AUTO_INCREMENT,
  `id_match` int NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `send_date` datetime NOT NULL,
  `id_sender` int NOT NULL,
  `id_receiver` int NOT NULL,
  `is_student` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_message`),
  KEY `fk_message_appariement` (`id_match`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`id_message`, `id_match`, `content`, `send_date`, `id_sender`, `id_receiver`, `is_student`) VALUES
(1, 1, 'Bonjour, nous avons vu votre profil et trouvons qu\'il correspond à nos besoin.\r\n\r\nSeriez vous toujours intéressé ?', '2025-05-21 08:17:08', 5, 12, 0);

-- --------------------------------------------------------

--
-- Structure de la table `offer`
--

DROP TABLE IF EXISTS `offer`;
CREATE TABLE IF NOT EXISTS `offer` (
  `id_offer` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `product_service` varchar(255) DEFAULT NULL,
  `remuneration` float NOT NULL,
  `remote` tinyint(1) NOT NULL,
  `commission` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `admin_validation` int DEFAULT NULL,
  `id_company` int NOT NULL,
  `product_servive` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_offer`),
  KEY `offre_entreprise_FK` (`id_company`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `offer`
--

INSERT INTO `offer` (`id_offer`, `title`, `description`, `product_service`, `remuneration`, `remote`, `commission`, `status`, `admin_validation`, `id_company`, `product_servive`) VALUES
(1, 'Ambassadeur GreenPocket - Produits éco-responsables', 'Représente notre gamme de produits écologiques auprès des commerces de proximité. Ton objectif : les convaincre de les proposer à leurs clients.', 'Kits éco-responsables', 80, 1, 10, 'ouverte', 1, 1, NULL),
(2, 'Promoteur local pour événements durables', 'Aide-nous à organiser et promouvoir nos événements éco-responsables dans ta ville. Communication, logistique et fun au programme !', 'Événementiel écolo', 60, 0, 8, 'ouverte', 1, 1, NULL),
(3, 'Ambassadeur SkillUp - Microlearning pour étudiants', 'Fais connaître notre plateforme de microlearning dans ton école. Présente les avantages, récolte des inscriptions et organise des démos.', 'Abonnement SkillUp', 70, 1, 15, 'ouverte', 1, 2, NULL),
(4, 'Community builder pour SkillUp', 'Construis une petite communauté d’utilisateurs actifs dans ton école, anime des groupes, crée des contenus autour du développement personnel.', 'Plateforme e-learning', 50, 1, 12, 'ouverte', 1, 2, NULL),
(5, 'Promoteur TidySpace - Services de rangement', 'Fais connaître notre application dans les quartiers résidentiels. Distribue des flyers, présente nos offres aux familles et jeunes actifs.', 'Services de rangement', 75, 0, 10, 'ouverte', 1, 3, NULL),
(6, 'Ambassadeur étudiant pour TidySpace', 'Présente nos services aux étudiants vivant seuls ou en colocation. Notre app peut leur changer la vie (ou leur appart).', 'App TidySpace', 65, 1, 7, 'ouverte', 0, 3, NULL),
(7, 'Représentant Foodiez - Découverte de restos locaux', 'Ta mission : recruter des restaurants partenaires dans ta ville. Présente notre app, négocie les conditions et valorise les petits commerces.', 'Application Foodiez', 100, 0, 20, 'ouverte', 1, 4, NULL),
(8, 'Ambassadeur Foodiez - Influence locale', 'Fais la promo de nos restos partenaires sur Insta, TikTok ou dans ton entourage. Plus tu ramènes de clients, plus tu gagnes.', 'Commandes de repas', 50, 1, 18, 'ouverte', 0, 4, NULL),
(9, 'Promoteur Move&Co - Covoiturage & colis', 'Promets un transport plus humain. Ta mission : recruter de nouveaux utilisateurs pour nos trajets partagés et envois de colis.', 'Service de covoiturage', 90, 1, 12, 'ouverte', 1, 5, NULL),
(10, 'Street marketing pour Move&Co', 'Organise des opérations sur ton campus ou dans ta ville pour faire connaître Move&Co. Flyers, QR codes et sourires.', 'App transport collaboratif', 60, 0, 10, 'ouverte', 1, 5, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `offer_file`
--

DROP TABLE IF EXISTS `offer_file`;
CREATE TABLE IF NOT EXISTS `offer_file` (
  `id_file` int NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) DEFAULT NULL,
  `file_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `file_type` varchar(255) DEFAULT NULL,
  `id_offer` int NOT NULL,
  PRIMARY KEY (`id_file`),
  KEY `fichier_offre_FK` (`id_offer`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `offer_file`
--

INSERT INTO `offer_file` (`id_file`, `file_name`, `file_url`, `file_type`, `id_offer`) VALUES
(1, 'offre d\'emploi Chargé des Relations Entreprises en alternance', 'https://www.hellowork.com/fr-fr/emplois/65769194.html', 'html', 5);

-- --------------------------------------------------------

--
-- Structure de la table `skill`
--

DROP TABLE IF EXISTS `skill`;
CREATE TABLE IF NOT EXISTS `skill` (
  `id_skill` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id_skill`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `skill`
--

INSERT INTO `skill` (`id_skill`, `name`) VALUES
(1, 'Community management'),
(2, 'Création de contenu'),
(3, 'Copywriting'),
(4, 'Gestion de campagnes publicitaires'),
(5, 'Animation de communauté'),
(6, 'Influence marketing'),
(7, 'Création de reels / TikToks'),
(8, 'Utilisation de Canva'),
(9, 'Prospection commerciale'),
(10, 'CRM'),
(11, 'Growth hacking'),
(12, 'Rédaction de newsletters'),
(13, 'Analyse de données marketing'),
(14, 'Lancement de campagnes emailing'),
(15, 'SEO'),
(16, 'Google Ads / Meta Ads'),
(17, 'Étude de marché'),
(18, 'Business development'),
(19, 'Pitch commercial'),
(20, 'Négociation'),
(21, 'Élaboration d’offres commerciales'),
(22, 'Veille concurrentielle'),
(23, 'Design graphique'),
(24, 'Création de maquettes'),
(25, 'Conception d’identité visuelle'),
(26, 'UX/UI basique'),
(27, 'Utilisation de plateformes no-code'),
(28, 'Automatisation'),
(29, 'Création de landing pages'),
(30, 'Intégration de formulaires'),
(31, 'Prise de parole en public'),
(32, 'Capacité à convaincre'),
(33, 'Gestion du temps'),
(34, 'Esprit d’initiative'),
(35, 'Travail en autonomie'),
(36, 'Capacité d’analyse');

-- --------------------------------------------------------

--
-- Structure de la table `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `id_student` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `age` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `school` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `linkedin_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `postal_code1` int NOT NULL,
  `postal_code2` int DEFAULT NULL,
  `skills` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `admin_validation` int DEFAULT NULL,
  PRIMARY KEY (`id_student`),
  KEY `Secondary` (`skills`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `student`
--

INSERT INTO `student` (`id_student`, `firstname`, `lastname`, `password`, `age`, `email`, `phone_number`, `school`, `linkedin_url`, `postal_code1`, `postal_code2`, `skills`, `comment`, `admin_validation`) VALUES
(1, 'Lucie', 'Marie', '_*g4V#Hh!T', 19, 'thierrysusan@free.fr', '5423511615', 'ESCP Business School', 'https://www.linkedin.com/in/lucie-marie', 78161, 95931, 'Création de contenu,Prospection commerciale', 'Disponible le soir après les cours. Connaissance en marketing ++', 1),
(2, 'Christophe', 'Lecomte', 'Or5G_uRh)V', 21, 'faivrebenoit@yahoo.fr', '2691669784', 'EM Strasbourg', 'https://www.linkedin.com/in/christophe-lecomte', 51462, 4828, 'Création de contenu,Prospection commerciale', 'En école de commerce et disponible pour faire bénéficier de mes compétences', 0),
(3, 'Michèle', 'Langlois', '&5%@SO!eq%', 24, 'marguerite73@ramos.fr', '7631165667', 'ESCP Business School', 'https://www.linkedin.com/in/michèle-langlois', 51333, NULL, 'Création de contenu,Prospection commerciale', 'Prêt à en découdre', 0),
(4, 'Isabelle', 'Martel', 'xF1Wb5br(8', 21, 'lucas53@bouygtel.fr', '2475107991', 'Montpellier Business School', 'https://www.linkedin.com/in/isabelle-martel', 25135, 27849, 'Création de contenu,Prospection commerciale', 'Je souhaite faire profiter de mes talents sur les réseaux sociaux et gagner un peu d\'argent', 1),
(5, 'Isaac', 'Traore', '*8vW+nFSJ$', 24, 'vlegendre@laposte.net', '2260256342', 'NEOMA Business School', 'https://www.linkedin.com/in/isaac-traore', 33754, 30365, 'Création de contenu,Prospection commerciale', 'Je veux mettre en application mes connaissances en marketing', 1),
(6, 'Camille', 'Delattre', 'Ru7q!zAr$%', 22, 'camille.delattre@gmail.com', '0678524135', 'KEDGE Business School', 'https://www.linkedin.com/in/camille-delattre', 33000, 33400, 'Création de contenu,Prospection commerciale', 'Je suis disponible immédiatement. Dynamique et organisée, j’ai de solides compétences en marketing digital, gestion de projet et création de contenu.', 1),
(7, 'Léo', 'Durand', 'D9@lw38^Xs', 23, 'leo.durand@live.fr', '0612345678', 'INSEEC Business School', 'https://www.linkedin.com/in/leo-durand', 69000, NULL, 'Création de contenu,Prospection commerciale', 'Motivé et rigoureux, je suis prêt à m’investir pleinement. Compétent en stratégie commerciale, analyse de données et gestion CRM.', 0),
(8, 'Emma', 'Bernard', 'uZ6&!xMe#2', 20, 'emma.bernard@yahoo.com', '0756432189', 'ICD Business School', 'https://www.linkedin.com/in/emma-bernard', 75011, 75020, 'Création de contenu,Prospection commerciale', 'Disponible dès maintenant. Créative et curieuse, je maîtrise les réseaux sociaux, le copywriting et le marketing d’influence.', 1),
(9, 'Thomas', 'Marchand', 'Gh2*1Kp@bv', 24, 'thomas.marchand@hotmail.fr', '0601020304', 'PSB Paris School of Business', 'https://www.linkedin.com/in/thomas-marchand', 92100, NULL, 'Création de contenu,Prospection commerciale', 'Je suis à la recherche d’un nouveau défi. J’ai une expérience en gestion de projet, en veille concurrentielle et en coordination d’équipes.', 0),
(10, 'Chloé', 'Roux', 'kE4#pw!cQ0', 22, 'chloe.roux@orange.fr', '0645893214', 'SKEMA Business School', 'https://www.linkedin.com/in/chloe-roux', 6000, 6300, 'Création de contenu,Prospection commerciale', 'Disponible rapidement, je suis autonome et proactive. Mes compétences : marketing événementiel, coordination logistique et communication digitale.', 1),
(11, 'Nicolas', 'Petit', 'dR8^bw!Yx%', 23, 'nicolas.petit@etu.univ.fr', '0687452391', 'Grenoble Ecole de Management', 'https://www.linkedin.com/in/nicolas-petit', 38100, NULL, 'Création de contenu,Prospection commerciale', 'Disponible pour un stage ou une alternance. Compétent en data marketing, analyse statistique, automation et SEO technique.', 1),
(12, 'Julie', 'Lemoine', 'Wm3%Nc9+!o', 21, 'julie.lemoine@laposte.net', '0623894785', 'ISC Paris', 'https://www.linkedin.com/in/julie-lemoine', 75015, NULL, 'Création de contenu,Prospection commerciale', 'Je suis motivée, créative et force de proposition. J’ai de l’expérience en storytelling de marque, stratégie de communication et design visuel.', 1),
(13, 'Antoine', 'Marty', 'Jk8^zQs!7w', 22, 'antoine.marty@protonmail.com', '0678921345', 'ESCE International Business School', 'https://www.linkedin.com/in/antoine-marty', 75008, NULL, 'Création de contenu,Prospection commerciale', 'Libre immédiatement. J’ai un profil orienté commerce international, développement B2B et négociation.', 1),
(14, 'Sarah', 'Dumont', 'Pc4&hxY@!d', 21, 'sarah.dumont@gmail.com', '0698745123', 'EM Normandie', 'https://www.linkedin.com/in/sarah-dumont', 14000, 14123, 'Création de contenu,Prospection commerciale', 'Je suis volontaire, engagée et prête à m’adapter. Compétences : gestion de projet, études de marché, community management.', 1),
(15, 'Baptiste', 'Morel', 'Ls5!xp2^Qf', 23, 'baptiste.morel@etu.univ.fr', '0632149875', 'Burgundy School of Business', 'https://www.linkedin.com/in/baptiste-morel', 21000, NULL, 'Création de contenu,Prospection commerciale', 'Polyvalent et à l’écoute, je suis formé en marketing stratégique, brand content et gestion budgétaire.', 1),
(16, 'Anaïs', 'Robert', 'Mv2#Gwq7!e', 22, 'anais.robert@hotmail.fr', '0678901234', 'Excelia Business School', 'https://www.linkedin.com/in/anais-robert', 17000, 17200, 'Création de contenu,Prospection commerciale', 'Je suis prête à m’investir pleinement. Mes points forts : rédaction, emailing, communication institutionnelle.', 0),
(18, 'Mathieu', 'Leclerc', 'Zq6!eTx#4r', 24, 'mathieu.leclerc@free.fr', '0611122233', 'EBS Paris', 'https://www.linkedin.com/in/mathieu-leclerc', 75016, NULL, 'Création de contenu,Prospection commerciale', 'Disponible et impliqué. Je suis à l’aise avec la prospection commerciale, la négociation client et le suivi de projet.', 1),
(19, 'Laura', 'Girard', 'Ke3%Rdz*2v', 21, 'laura.girard@etu.esc.com', '0645789123', 'ESC Clermont Business School', 'https://www.linkedin.com/in/laura-girard', 63000, 63110, 'Création de contenu,Prospection commerciale', 'Autonome et sérieuse, je suis compétente en études qualitatives, benchmark et reporting.', 1),
(20, 'Alexandre', 'Fabre', 'Xn4^qLj!0b', 23, 'alexandre.fabre@edu.univ.fr', '0699123456', 'ISG Business School', 'https://www.linkedin.com/in/alexandre-fabre', 75003, NULL, 'Création de contenu,Prospection commerciale', 'Disponible dès aujourd’hui. Mes compétences clés : relation client, social ads, stratégie omnicanale.', 1),
(36, 'Rémy', 'Louault', 'remrem', 23, 'remrem@gmail.com', '0681145331', 'ISEN', '', 29290, 29290, 'Aucune', 'Motivé, sportif, attentionné', 0),
(37, 'Titouan', 'Messager', 'titoudu29', 35, 'titoudu29@gmail.com', '062165195', 'ISEN', '', 29200, NULL, 'Gestion du temps,Esprit d’initiative,Travail en autonomie', 'Jeune cadre dynamique cherche argent', 1),
(38, 'Léane', 'Ponchaut', 'leane', 23, 'leane@gmail.com', '216516665', 'ISEN', '', 29200, NULL, 'Influence marketing,Utilisation de Canva', 'oui', 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `matching`
--
ALTER TABLE `matching`
  ADD CONSTRAINT `appariement_etudiant_FK` FOREIGN KEY (`id_student`) REFERENCES `student` (`id_student`),
  ADD CONSTRAINT `appariement_offre_FK` FOREIGN KEY (`id_offer`) REFERENCES `offer` (`id_offer`);

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `fk_message_appariement` FOREIGN KEY (`id_match`) REFERENCES `matching` (`id_match`);

--
-- Contraintes pour la table `offer`
--
ALTER TABLE `offer`
  ADD CONSTRAINT `offre_entreprise_FK` FOREIGN KEY (`id_company`) REFERENCES `company` (`id_company`);

--
-- Contraintes pour la table `offer_file`
--
ALTER TABLE `offer_file`
  ADD CONSTRAINT `fichier_offre_FK` FOREIGN KEY (`id_offer`) REFERENCES `offer` (`id_offer`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
