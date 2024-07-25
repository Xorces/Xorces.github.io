let players = [];
let currentPlayerIndex = 0;
let gameMode = '';
let turnCount = 0;
const maxTurns = 30;
let forcedAction = false;

document.getElementById('add-player-btn').addEventListener('click', () => {
    const playerInput = document.getElementById('player1');
    if (playerInput.value.trim() !== '') {
        players.push(playerInput.value.trim());
        playerInput.value = '';
        document.getElementById('player-input').querySelector('label').innerText = `Joueur  ${players.length + 1} :`;

        document.getElementById('players-list').style.display = 'block';
        updatePlayersList();

    }
});

/*document.getElementById('add-another-player-btn').addEventListener('click', () => {
    document.getElementById('player-input').style.display = 'block';
    document.getElementById('players-list').style.display = 'none';
});*/

document.getElementById('start-game-btn').addEventListener('click', () => {
    document.getElementById('players-list').style.display = 'none';
    document.getElementById('game-mode').style.display = 'block';
    document.getElementById('player-input').style.display = 'none';  // Hide the player input section
});

document.querySelectorAll('.mode-btn').forEach(button => {
    button.addEventListener('click', () => {
        gameMode = button.getAttribute('data-mode');
        document.getElementById('game-mode').style.display = 'none';
        if (gameMode == "simple"){
            if (confirm("Ce mode de jeu est destiné aux enfants entre 8 ans et 14 ans êtes vous sûr de choisir ce mode ?")){
                startGame();
            }
        }if (gameMode == "intermediaire"){
            if (confirm("Ce mode de jeu est destiné aux adolescent entre 15 ans et 17 ans êtes vous  de choisir ce mode ?")){
                startGame();
            }
        }if (gameMode == "hot"){
            if (confirm("Ce mode de jeu est destiné aux adultes de plus de 18 ans êtes vous sûr de choisir ce mode ?")){
                startGame();
            }
        }
    });
});

document.getElementById('action-btn').addEventListener('click', () => {
    showTask('action');
});

document.getElementById('truth-btn').addEventListener('click', () => {
    showTask('truth');
});

document.getElementById('next-btn').addEventListener('click', () => {
    nextPlayer();
});

document.getElementById('restart-game-btn').addEventListener('click', () => {
    location.reload();
});

function updatePlayersList() {
    const playersList = document.getElementById('players');
    playersList.innerHTML = '';
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.innerText = `Joueur ${index + 1}: ${player}`;
        playersList.appendChild(li);
    });
}

function startGame() {
    document.getElementById('game').style.display = 'block';
    document.getElementById('current-player').innerText = `C'est le tour de ${players[currentPlayerIndex]}`;
}

function showTask(type) {
    const tasks = {
        action: {
            simple: ['Fais 5 sauts en étoile.',
                'Danse comme un robot pendant 30 secondes.',
                'Mime ton animal préféré.',
                'Fais une grimace rigolote.',
                'Fais le tour de la pièce en marchant à reculons.',
                'Fais un poirier contre un mur (avec de l\'aide si nécessaire).',
                'Chante une chanson de ton choix.',
                'Fais le bruit de ton animal préféré.',
                'Fais 10 tours sur toi-même sans tomber.',
                'Imiter une poule pendant 30 secondes.',
                'Fais un dessin avec les yeux fermés.',
                'Fais une imitation de ton personnage de dessin animé préféré.',
                'Fais une pirouette.',
                'Fais 5 pompes.',
                'Sautille sur un pied pendant 20 secondes.',
                'Fais le son d\'une voiture de course.',
                'Fais une blague rigolote.',
                'Fais une roue (avec de l\'aide si nécessaire).',
                'Fais un câlin à quelqu\'un dans la pièce.',
                'Chante l\'alphabet à l\'envers.',
                'Fais une figure de yoga.',
                'Fais le cri d\'un dinosaure.',
                'Imite un singe pendant 30 secondes.',
                'Fais le bruit d\'un tracteur.',
                'Fais 10 sauts en l\'air.',
                'Fais le tour de la pièce en rampant comme un serpent.',
                'Fais l\'avion pendant 30 secondes.',
                'Imite un super-héros en vol.',
                'Fais 3 sauts de grenouille.',
                'Fais le tour de la pièce en sautillant comme un lapin.',
                'Fais le bruit d\'une sirène de police.',
                'Imite un lion rugissant.',
                'Fais un tour sur toi-même et puis fais un saut.',
                'Mime un poisson hors de l\'eau.',
                'Fais un saut périlleux avant (avec de l\'aide si nécessaire).',
                'Mime une scène de ton film préféré.',
                'Fais le bruit d\'un éléphant.',
                'Fais 5 abdominaux.',
                'Fais une imitation d\'un cowboy.',
                'Fais le bruit d\'une tempête.',
                'Mime une course de chevaux.',
                'Fais une figure de danse classique.',
                'Imite une girafe mangeant des feuilles.',
                'Fais le bruit d\'un tracteur en marche.',
                'Fais 3 roulades au sol.',
                'Mime une scène d\'une pièce de théâtre.',
                'Fais une chorégraphie de danse rapide.',
                'Imite un chat qui miaule.',
                'Fais le cri d\'un coq.',
                'Fais un parcours d\'obstacles imaginaire.'
            ],
            intermediaire: ['Fais un bisou sur la joue de la personne à ta droite.',
                'Envoie un message "Je t\'aime" à une personne choisie par les autres joueurs.',
                'Fais un câlin à la personne à ta gauche.',
                'Récite un poème d\'amour en regardant quelqu’un dans les yeux.',
                'Donne un compliment sincère à chaque joueur.',
                'Chante une chanson d\'amour pendant 1 minute.',
                'Imite une scène romantique d\'un film célèbre.',
                'Fais semblant de demander quelqu\'un en mariage.',
                'Fais un clin d\'œil à quelqu’un de ton choix.',
                'Envoie un cœur en message privé à une personne choisie par les autres joueurs.',
                'Danse lentement avec quelqu’un de ton choix.',
                'Raconte une histoire d\'amour drôle que tu as entendue ou vécue.',
                'Dessine un cœur et donne-le à quelqu’un.',
                'Complimente les yeux de quelqu’un.',
                'Chante une chanson de votre choix en duo avec quelqu’un.',
                'Fais une déclaration d\'amour à quelqu’un, vraie ou fausse.',
                'Envoie un message mystérieux à ton crush et montre la réponse.',
                'Imite un rendez-vous romantique parfait.',
                'Fais un bisou dans les airs à quelqu’un de ton choix.',
                'Parle avec une voix douce pendant les 2 prochains tours.',
                'Écris un message d\'amour sur un morceau de papier et donne-le à quelqu’un.',
                'Raconte une histoire embarrassante sur ton premier amour.',
                'Envoie un message vocal mignon à quelqu’un.',
                'Fais une déclaration d\'amour à un objet dans la pièce.',
                'Prends une photo avec un filtre mignon et partage-la.',
                'Donne un surnom affectueux à chaque joueur.',
                'Mime une scène de baiser sans toucher quelqu’un.',
                'Complimente le sourire de quelqu’un.',
                'Chuchote un secret à quelqu’un.',
                'Fais semblant de recevoir un bouquet de fleurs et remercie l\'imagineur.',
                'Récite un poème sur l\'amour que tu connais ou invente-le.',
                'Fais une imitation de quelqu’un en amour.',
                'Montre comment tu embrasserais ton crush sur la main de quelqu’un.',
                'Écris une phrase d\'amour et montre-la à tout le monde.',
                'Fais semblant de pleurer de bonheur pour quelqu’un.',
                'Raconte comment serait ton rendez-vous parfait.',
                'Imite une scène de film romantique célèbre.',
                'Complimente les cheveux de quelqu’un.',
                'Raconte une histoire d\'amour que tu trouves mignonne.',
                'Imite un personnage de film amoureux.',
                'Chante une chanson en remplaçant certains mots par "amour".',
                'Envoie un emoji cœur à une personne choisie par les autres joueurs.',
                'Fais une confession d\'amour hilarante à quelqu’un.',
                'Dis quelque chose de gentil à chaque joueur.',
                'Fais semblant de lire une lettre d\'amour.',
                'Décris ton crush idéal.',
                'Envoie un message anonyme mignon à ton crush.',
                'Fais un câlin imaginaire à quelqu’un.',
                'Complimente la tenue de quelqu’un.',
                'Raconte une blague sur l\'amour.'],
            hot: ['Fais un strip-tease pendant 1 minute (garde tes sous-vêtements).',
                'Embrasse passionnément la personne à ta gauche.',
                'Fais un massage des épaules à quelqu’un pendant 2 minutes.',
                'Envoie un message sexy à ton/ta partenaire.',
                'Danse de manière sensuelle pendant 2 minutes.',
                'Fais un bisou dans le cou de quelqu’un.',
                'Mets-toi torse nu pendant 3 tours.',
                'Récite une poésie romantique en regardant quelqu’un dans les yeux.',
                'Fais une imitation de quelqu’un en amour.',
                'Chante une chanson d\'amour pendant 1 minute.',
                'Fais un French kiss avec quelqu’un pendant 30 secondes.',
                'Donne un compliment sincère à chaque joueur.',
                'Mime une scène romantique d\'un film célèbre.',
                'Complimente de manière sensuelle chaque joueur.',
                'Fais semblant de demander quelqu\'un en mariage.',
                'Chante une chanson sexy en playback.',
                'Donne un baiser passionné à la personne en face de toi.',
                'Fais une déclaration d\'amour osée à quelqu’un.',
                'Murmure quelque chose de doux à l’oreille de quelqu’un.',
                'Danse lentement avec quelqu’un de ton choix.',
                'Donne un bisou sur la main de quelqu’un de manière sensuelle.',
                'Raconte une histoire d\'amour drôle que tu as entendue ou vécue.',
                'Dessine un cœur et donne-le à quelqu’un.',
                'Fais un clin d\'œil à quelqu’un de ton choix.',
                'Complimente les yeux de quelqu’un.',
                'Mime une scène de baiser sans toucher quelqu’un.',
                'Chuchote un secret à quelqu’un.',
                'Fais semblant de recevoir un bouquet de fleurs et remercie l\'imagineur.',
                'Récite un poème sur l\'amour que tu connais ou invente-le.',
                'Fais une imitation de ton acteur préféré dans une scène romantique.',
                'Complimente les cheveux de quelqu’un.',
                'Raconte une histoire d\'amour que tu trouves mignonne.',
                'Mime une scène de film romantique célèbre.',
                'Complimente la tenue de quelqu’un.',
                'Raconte une blague sur l\'amour.',
                'Chante une chanson en remplaçant certains mots par "amour".',
                'Fais un bisou sur le front de quelqu’un de manière sensuelle.',
                'Raconte comment serait ton rendez-vous parfait.',
                'Imite un personnage de film amoureux.',
                'Donne un bisou dans le cou de quelqu’un pendant 10 secondes.',
                'Fais semblant de séduire quelqu’un pendant 1 minute.',
                'Montre ton meilleur regard sexy.',
                'Raconte ton dernier rêve romantique.',
                'Donne un baiser dans le dos de quelqu’un.',
                'Raconte un souvenir romantique que tu as eu.',
                'Fais une danse lente avec quelqu’un pendant 2 minutes.',
                'Raconte un de tes fantasmes romantiques à voix haute.',
                'Décris ton crush idéal.',
                'Fais un câlin imaginaire à quelqu’un.',
                'Simule un massage sensuel sur toi-même.',
                'Raconte une histoire d\'amour de ton passé.']
        },
        truth: {
            simple: ['Quel est ton animal préféré ?',
                'Quelle est ta couleur préférée ?',
                'Quel est ton super-héros préféré ?',
                'Quelle est ta nourriture préférée ?',
                'Quel est ton jouet préféré ?',
                'Quel est ton film préféré ?',
                'Quelle est ta chanson préférée ?',
                'Quel est ton dessin animé préféré ?',
                'Quel est ton sport préféré ?',
                'Quelle est ta glace préférée ?',
                'Quel est ton fruit préféré ?',
                'Quel est ton légume préféré ?',
                'Quelle est ta saison préférée ?',
                'Quelle est ta fête préférée ?',
                'Quel est ton livre préféré ?',
                'Quel est ton meilleur souvenir ?',
                'Quelle est ta ville préférée ?',
                'Quel est ton moment préféré de la journée ?',
                'Quelle est ta matière préférée à l\'école ?',
                'Quel est ton animal de compagnie préféré ?',
                'Quel est ton endroit préféré pour jouer ?',
                'Quelle est ta sucrerie préférée ?',
                'Quel est ton rêve de vacances ?',
                'Quel est ton jeu vidéo préféré ?',
                'Quel est ton passe-temps préféré ?',
                'Quel est ton dessin préféré ?',
                'Quel est ton rêve le plus drôle ?',
                'Quelle est ta blague préférée ?',
                'Quel est ton plat préféré pour le dîner ?',
                'Quel est ton personnage de conte de fées préféré ?',
                'Quelle est ta mémoire la plus drôle ?',
                'Quel est ton jour préféré de la semaine ?',
                'Quel est ton rêve pour l\'avenir ?',
                'Quelle est ta chose préférée à faire avec des amis ?',
                'Quel est ton loisir préféré ?',
                'Quel est ton personnage historique préféré ?',
                'Quelle est ta série télévisée préférée ?',
                'Quel est ton endroit préféré pour des vacances ?',
                'Quel est ton souvenir préféré de l\'école ?',
                'Quelle est ta chose préférée à faire en famille ?',
                'Quel est ton animal sauvage préféré ?',
                'Quel est ton moment préféré à l\'école ?',
                'Quel est ton héros de bande dessinée préféré ?',
                'Quel est ton pays préféré ?',
                'Quel est ton rêve le plus étrange ?',
                'Quelle est ta chanson préférée à chanter ?',
                'Quel est ton souhait le plus cher ?',
                'Quelle est ta saison préférée pour les activités de plein air ?',
                'Quelle est ta recette préférée ?',
                'Quelle est ta meilleure blague ?'
            ],
            intermediaire: ['As-tu déjà eu un coup de foudre ?',
                'Quel est ton plus grand secret d\'amour ?',
                'As-tu déjà embrassé quelqu’un ?',
                'Qui est ton crush actuel ?',
                'Quelle est ta plus grande peur en amour ?',
                'Quelle est la chose la plus romantique que tu aies faite ?',
                'Quelle est ta chanson d\'amour préférée ?',
                'As-tu déjà écrit une lettre d\'amour ?',
                'Quel est ton meilleur souvenir avec ton crush ?',
                'Quel est ton rendez-vous idéal ?',
                'Quelle est la chose la plus embarrassante qui te soit arrivée en amour ?',
                'Qui était ton premier crush ?',
                'As-tu déjà eu un rêve romantique sur quelqu’un ?',
                'Quelle est la chose la plus mignonne que quelqu’un ait faite pour toi ?',
                'Quel est ton film d\'amour préféré ?',
                'As-tu déjà eu le cœur brisé ?',
                'Quelle est ta plus grande qualité en amour ?',
                'As-tu déjà fait semblant d\'aimer quelqu’un ?',
                'Quelle est ta plus grande faiblesse en amour ?',
                'Quel est le meilleur conseil d\'amour que tu aies reçu ?',
                'As-tu déjà été amoureux(se) de deux personnes en même temps ?',
                'Quelle est la chose la plus courageuse que tu aies faite pour ton crush ?',
                'As-tu déjà eu un rendez-vous désastreux ?',
                'Quelle est ta plus grande peur en amour ?',
                'As-tu déjà écrit une chanson ou un poème pour quelqu’un ?',
                'Quel est le plus grand sacrifice que tu as fait par amour ?',
                'Quel est le meilleur cadeau que tu aies reçu de ton crush ?',
                'Quelle est ta pire expérience en amour ?',
                'As-tu déjà envoyé un message embarrassant à ton crush ?',
                'Quel est le plus grand mensonge que tu aies dit à ton crush ?',
                'As-tu déjà triché sur quelqu’un ?',
                'Quel est ton souvenir d\'amour préféré ?',
                'Quel est le meilleur conseil d\'amour que tu donnerais à quelqu’un ?',
                'As-tu déjà pleuré pour quelqu’un ?',
                'Quelle est ta plus grande déception en amour ?',
                'Quel est ton type de personne idéal(e) ?',
                'As-tu déjà fait une déclaration d\'amour publique ?',
                'As-tu déjà eu un rêve romantique récurrent ?',
                'Quel est le plus beau compliment que tu aies reçu ?',
                'As-tu déjà écrit un journal intime sur ton amour ?',
                'Quelle est ta plus grande fierté en amour ?',
                'As-tu déjà eu une relation à distance ?',
                'As-tu déjà menti à ton crush pour le/la protéger ?',
                'Quel est le plus grand risque que tu aies pris pour quelqu’un ?',
                'Quelle est la chose la plus folle que tu aies faite par amour ?',
                'As-tu déjà demandé à quelqu’un de sortir avec toi ?',
                'Quelle est la chose la plus mignonne que tu aies faite pour ton crush ?',
                'As-tu déjà été rejeté(e) par quelqu’un que tu aimais ?',
                'Quel est ton plus grand regret en amour ?',
                'Quelle est ta plus grande leçon d\'amour apprise ?'],
            hot: ['Quel est ton plus grand secret d\'amour ?',
                'As-tu déjà eu des relations sexuelles en public ?',
                'Quelle est la chose la plus romantique que tu aies faite ?',
                'As-tu déjà envoyé des photos coquines ?',
                'Quel est ton plus grand regret en amour ?',
                'Quel est ton souvenir érotique préféré ?',
                'As-tu déjà eu un coup de foudre ?',
                'Quel est ton meilleur souvenir avec ton partenaire actuel ?',
                'As-tu déjà eu des relations à plusieurs ?',
                'As-tu déjà été infidèle ?',
                'Quelle est ta position sexuelle préférée ?',
                'As-tu déjà eu un rêve érotique sur quelqu’un ici ?',
                'Quelle est la chose la plus mignonne que quelqu’un ait faite pour toi ?',
                'Quel est ton film d\'amour préféré ?',
                'As-tu déjà eu le cœur brisé ?',
                'Quelle est ta plus grande qualité en amour ?',
                'As-tu déjà fait semblant d\'aimer quelqu’un ?',
                'Quelle est ta plus grande faiblesse en amour ?',
                'Quel est le meilleur conseil d\'amour que tu aies reçu ?',
                'As-tu déjà été amoureux(se) de deux personnes en même temps ?',
                'Quelle est la chose la plus courageuse que tu aies faite pour ton partenaire ?',
                'As-tu déjà eu un rendez-vous désastreux ?',
                'Quel est le meilleur cadeau que tu aies reçu de ton partenaire ?',
                'Quel est ton souvenir le plus embarrassant en amour ?',
                'As-tu déjà embrassé quelqu’un du même sexe ?',
                'Quel est le lieu le plus insolite où tu as eu des relations sexuelles ?',
                'Quel est ton souvenir le plus embarrassant au lit ?',
                'Quel est le plus grand mensonge que tu aies dit à ton partenaire ?',
                'Quel est ton plus grand complexe en amour ?',
                'As-tu déjà eu un strip-tease en privé ?',
                'As-tu déjà fait un massage érotique ?',
                'Quel est le nombre de partenaires que tu as eus ?',
                'Quel est ton plus grand fantasme romantique ?',
                'As-tu déjà eu des relations sexuelles dans une chambre d’hôtel ?',
                'Quel est le meilleur compliment que tu aies reçu en amour ?',
                'As-tu déjà parlé coquin par téléphone ?',
                'As-tu déjà eu des relations sexuelles en extérieur ?',
                'As-tu déjà envoyé un message sexy par erreur ?',
                'Quel est ton souvenir romantique le plus torride ?',
                'As-tu déjà eu des relations sexuelles avec un(e) ami(e) ?',
                'Quel est le plus grand risque que tu aies pris pour quelqu’un ?',
                'As-tu déjà eu des relations sexuelles avec un(e) inconnu(e) ?',
                'Quel est le moment le plus embarrassant que tu aies vécu en amour ?',
                'As-tu déjà eu des relations sexuelles en plein air ?',
                'Quelle est ta plus grande peur en amour ?',
                'As-tu déjà eu des relations sexuelles à un endroit interdit ?',
                'Quel est ton souvenir préféré de vacances romantiques ?',
                'As-tu déjà eu des relations sexuelles en voiture ?',
                'Quelle est ta plus grande fantasme jamais réalisé ?',
                'As-tu déjà utilisé des jouets sexuels ?',
                'Quelle est ta partie du corps préférée chez l’autre ?']
        }
    };
    const mode = tasks[type][gameMode];
    const randomTask = mode[Math.floor(Math.random() * mode.length)];
    console.log(turnCount > 2);
    console.log(gameMode == "hot", gameMode);
    console.log(!forcedAction);
    if (turnCount > 2 && (gameMode == "hot") && !forcedAction && (type == "action")) {
        document.getElementById('question').innerText = "Montes à califourchons sur l'une des personnes et embrasses la pationnément.";
        forcedAction = true;
    } else {
        document.getElementById('question').innerText = randomTask;
    }
    document.getElementById('action-btn').style.display = 'none';
    document.getElementById('truth-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'block';
}

function nextPlayer() {
    turnCount++;
    if (turnCount >= maxTurns) {
        endGame();
    } else {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        document.getElementById('current-player').innerText = `C'est le tour de ${players[currentPlayerIndex]}`;
        document.getElementById('question').innerText = '';
        document.getElementById('action-btn').style.display = 'block';
        document.getElementById('truth-btn').style.display = 'block';
        document.getElementById('next-btn').style.display = 'none';
    }
}

function endGame() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('end-game').style.display = 'block';
}
