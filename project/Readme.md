# ▸ Projet Synthèse - Investment Salad 
![Alt text](logo-read-me.png)

### Membres de l'équipe
- Justin Goulet *(2138757)*
- Mathys Deshaies *(2137384)*
- Mikee Blanchet *(2136010)*
- Charles Major *(2135984)*
- Alexis Chatigny *(2136005)*

## Introduction
Dans un monde où les actifs financiers sont souvent dispersés à travers différentes institutions, la nécessité d'une solution centralisée pour gérer ses liquidités devient cruciale. C'est dans cette optique que nous présentons <strong><em>Investment Salad</em></strong>, une application web novatrice conçue pour offrir une vision complète et personnalisée de vos actifs et placements provenant de diverses sources financières.
<br/>

### Concept global
Investment Salad se distingue en permettant aux utilisateurs de créer leur <u>tableau de bord financier sur mesure</u>, intégrant divers actifs tels que placements, actions, épargne, etc. Cette plateforme offre la possibilité de prévoir les revenus et les dépenses, favorisant ainsi une **discipline financière saine**. Les données peuvent être visualisées sous différentes formes graphiques, selon les préférences de l'utilisateur, et la mise en page du tableau de bord est sauvegardée dans le profil de l'utilisateur. L’application web vise à offrir une <u>vision globale de façon centralisée</u> et dynamique.
<br/>

## Explications des fichiers de configuration et scripts ⚙️
### Scripts
- Le script `deploy.sh` sert à déployer le backend de l'application à l'aide de docker-compose. Il lance les conteneurs Docker de Node, de Spring et de la base de données MySQL.

- Le script `stop.sh` sert à arrêter tous les conteneurs de docker-compose. Il peut être appelé manuellement, sinon il est appelé automatiquement au début du script `deploy.sh`.

- Le script `install-hooks.sh` sert à installer les Git Hooks sur un poste local.

- Le script `envSetup.sh` sert à configurer (ajouter) automatiquement les fichiers de configuration dans le projet Node (.env.local) et dans Spring (application.properties). Il s'adapte en fonction de l'environnement où il est exécuter. Utilisation : `sh envSetup.sh <ENV_IP>`, où <ENV_IP> est localhost ou l'IP de la VM.

## Mise en place des services d'hébergements 💾
Nous avons mis en place 3 machines virtuels dans Google Cloud pour l'hébergement de notre projet. L'une d'elle est notre environnement de Staging et l'autre est note GitLab Runner.

### Configuration Staging
**OS:** Ubuntu 22.04 LTS
**HDD:** 50GB

**Installation des paquets**
- Installer Git (`sudo apt install git`)
- Installer Docker en suivant le guide officiel : [Lien](https://docs.docker.com/engine/install/ubuntu/)
- Ajouter Docker aux « sudoers » : [Lien](https://docs.docker.com/engine/install/linux-postinstall/)
- Installer docker-compose en suivant le guide officiel : [Lien](https://docs.docker.com/compose/install/linux/#install-using-the-repository)
<br>

### Configuration Tests
**OS:** Ubuntu 22.04 LTS
**HDD:** 25GB

**Installation des paquets**
- Installer Git (`sudo apt install git`)
- Installer Docker en suivant le guide officiel : [Lien](https://docs.docker.com/engine/install/ubuntu/)
- Ajouter Docker aux « sudoers » : [Lien](https://docs.docker.com/engine/install/linux-postinstall/)
- Installer le GitLab Runner : [Lien](https://www.linuxtechi.com/how-to-install-gitlab-runner-on-ubuntu/)
<br>

### Configuration GitLab Runner
**OS:** Ubuntu 22.04 LTS
**HDD:** 25GB

**Installation des paquets**
- Installer Git (`sudo apt install git`)
- Installer Docker en suivant le guide officiel : [Lien](https://docs.docker.com/engine/install/ubuntu/)
- Ajouter Docker aux « sudoers » : [Lien](https://docs.docker.com/engine/install/linux-postinstall/)
- Installer le GitLab Runner : [Lien](https://www.linuxtechi.com/how-to-install-gitlab-runner-on-ubuntu/)
<br>

## Mise en place de l'intégration continue - GitLab CI 🔌
Nous avons mis en place notre pipeline avec GitLab CI. Les étapes suivantes sont exécutées lorsque nous poussons du code dans la branche main :
- Nous compilons la partie Spring du projet.
- Nous exécutons tous nos tests pour Spring.
- Nous exécutons tous nos tests pour React.

Par la suite, en local, nous avons nos Git Hooks qui s'exécutent avant chaque commit en local.
- Nous exécutons tous nos tests pour Spring.
- Nous exécutons tous nos tests pour React.
<br>

## Mise en place d'un poste en local 💻

### Mise en place de l'environnement de développement pour Node
**1.** Installer VSCode : [Lien](https://code.visualstudio.com/)

**2.** Ajouter l'extension Prettier à VSCode : [Lien](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

**3.** Ajouter l'extension React Native Tools à VSCode : [Lien](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native)

**4.** Ajouter l'extension Tailwind CSS IntelliSense à VSCode : [Lien](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

**5.** Installer Node.js : [Lien](https://nodejs.org/en/download)

**6.** Cloner le projet GitLab dans l'explorateur de fichier : [Lien](https://gitlab.com/mathys.deshaies2004/projetsynthese/)

**7.** Ouvrir le projet dans VSCode.

**8.** Ouvrir un terminal dans VSCode et faire les commandes suivantes :
```
cd .\containers\node\
npm install next@latest react@latest react-dom@latest
```
**9.** S'assurer que le projet s'ouvre. Exécuter cette commande dans le terminal :
```
npm run dev
```
**10.** Vérifier que l'exécution fonctionne à l'adresse suivante : http://localhost:3000/
<br/>

### Mise en place de l'environnement de développement pour l'API

**1.** Installer Éclipse IDE : [Lien](https://eclipseide.org/)

**2.** Installer MySQL : [Lien](https://dev.mysql.com/downloads/installer/)

**3.** Ajouter le répertoire «bin» de MySQLServer aux variables d'environnement.

**4.** Lancer un terminal de commande et exécuter les commandes suivantes en ordre :
```
mysql -u root -p $mdp-user-root$
CREATE DATABASE IF NOT EXISTS db_investmentSalad_api_dev;
CREATE USER '$user$'@'localhost' IDENTIFIED BY '$password$';
GRANT ALL PRIVILEGES ON db_example.* TO '$user$'@'localhost';
FLUSH PRIVILEGES;
```

**5.** Installer Postman : [Lien](https://postman.com/downloads)

**6.** Cloner le projet depuis GitLab si ce n'est pas déjà fait : [Lien](https://gitlab.com/mathys.deshaies2004/projetsynthese/)

**7.** Importer le projet existant dans Éclipse.

**8.** Suivre les instructions situé à l'endroit suivant à la racine du dossier du code de l'API: `src/main/ressources/application.properties.example`
<br>

### Mise en place de l'environnement Linux Local (Environnement de Tests)

*Préalable : avoir une VM Linux fonctionnelle avec Ubuntu LTS 22.04*

**1.** Faire les MAJ :
```
sudo apt update
```

**2.** Installer Docker en suivant le guide officiel : [Lien](https://docs.docker.com/engine/install/ubuntu/)

**3.** Ajouter Docker aux « sudoers » : [Lien](https://docs.docker.com/engine/install/linux-postinstall/)

**4.** Installer nano
```
sudo apt install nano
```

**5.** Installer docker-compose en suivant le guide officiel : [Lien](https://docs.docker.com/compose/install/linux/#install-using-the-repository)

**6.** Installer Git :
```
sudo apt install git
```

**7.** Cloner le projet GitLab si ce n'est pas déjà fait : [Lien]( https://gitlab.com/mathys.deshaies2004/projetsynthese)

**8.** Tester le déploiement Local :

```
chmod 775 ./scripts/deploy.sh
./deploy.sh
 ```
<br/>

## Liens utiles 🔗
**Nos liens**
- Google Docs de présentation du projet ([Lien](https://docs.google.com/document/d/1S_oRxmjy1okcCpofmy3KjX6_AVzqjGyw4UCWgkUA6LI/edit))
- GitLab, dépôt de code ([Lien](https://gitlab.com/mathys.deshaies2004/projetsynthese))
- Azure DevOps, organisation de l'agile, backlog ([Lien](https://dev.azure.com/projetSyntheseFinances/Projet%20Synth%C3%A8se))
- Miro, tableau blanc interactif ([Lien](https://miro.com/app/board/uXjVN39OQ4w=/?fbclid=IwAR3tZX4KRZYoPBkUtIzcQLSpbPOJ7O1HlYuAivRk4vFEJX5WNYIM5Rc8wNo))
- Mockplus, maquettes de l'application ([Lien](https://rp.mockplus.com/team/invitation/M2LMVEPTo/odugflgzyn))

**Liens ressources**
- Documentation ShadcnUi ([Lien](https://ui.shadcn.com/docs))
- Documentation MUI Charts ([Lien](https://mui.com/x/react-charts/))
