const testItem = document.getElementById("textDisplay");
const inputItem = document.getElementById("textInput");
const timeName = document.getElementById("timeName");
const time = document.getElementById("time");
const cwName = document.getElementById("cwName");
const cw = document.getElementById("cw");
const restartBtn = document.getElementById("restartBtn");
const thirty = document.getElementById("thirty");
const sixty = document.getElementById("sixty");
const en = document.getElementById("en");
const fr = document.getElementById("fr");

var wordNo = 1;
var wordsSubmitted = 0;
var wordsCorrect = 0;
var timer = 30;
var flag=0;
var factor=2;
var seconds;
var language=1;

displayTest(language);

//sur l'entrée
inputItem.addEventListener('input', function(event){
  if(flag===0){
    flag=1;
    timeStart();
  }
  var charEntered = event.data;
  if(/\s/g.test(charEntered)){   //vérifie si le caractère saisi est un espace
    checkWord();
  }
  else{
    currentWord();
  }
});

//sélection de l'heure
thirty.addEventListener("click",function(){
  timer = 30;
  factor = 2;
  limitColor(thirty,sixty);
  time.innerText = timer;
});
sixty.addEventListener("click",function(){
  timer = 60;
  factor = 1;
  limitColor(sixty, thirty);
  time.innerText = timer;
});

//language Selection
en.addEventListener("click",function(){
  language = 1;
  displayTest(language);
  limitColor(en,fr);
});
fr.addEventListener("click",function(){
  language = 2;
  displayTest(language);
  limitColor(fr,en);
});

//définir la couleur de l'heure et de la langue
function limitColor(itema,itemr ){
  itema.classList.add('yellow');
  itemr.classList.remove('yellow');
}

// redémarrer le test
restartBtn.addEventListener("click",function(){

  wordsSubmitted = 0;
  wordsCorrect = 0;
  flag=0;

  time.classList.remove("current");
  cw.classList.remove("current");
  time.innerText = timer;
  timeName.innerText = "Time";
  cw.innerText = wordsCorrect;
  cwName.innerText = "CW";
  inputItem.disabled = false;
  inputItem.value = '';
  inputItem.focus();

  displayTest(language);
  clearInterval(seconds);
  limitVisible();
});

//lance le compteur de temp
function timeStart(){
  limitInvisible();
  seconds = setInterval(function() {
    time.innerText--;
    if (time.innerText == "-1") {
        timeOver();
        clearInterval(seconds);
    }
  }, 1000);
}

//diable textarea and wait for restart
function timeOver(){
  inputItem.disabled = true;
  restartBtn.focus();

  displayScore();
}

//définir Limiter la visibilité
function limitVisible(){
  thirty.style.visibility = 'visible';
  sixty.style.visibility = 'visible';
  en.style.visibility = 'visible';
  fr.style.visibility = 'visible';
}
function limitInvisible(){
  thirty.style.visibility = 'hidden';
  sixty.style.visibility = 'hidden';
  en.style.visibility = 'hidden';
  fr.style.visibility = 'hidden';
}

//afficher le score mpm (mot par minute)

function displayScore(){
  let percentageAcc = 0;
  if(wordsSubmitted!==0){
    percentageAcc = Math.floor((wordsCorrect/wordsSubmitted)*100);
  }

  time.classList.add("current");
  cw.classList.add("current");

  time.innerText = percentageAcc+"%";
  timeName.innerText = "PA";

  cw.innerText = factor*wordsCorrect;
  cwName.innerText = "WPM";
}

//vérifier si l'utilisateur saisit le mot correct
function currentWord(){
  const wordEntered = inputItem.value;
  const currentID = "word "+wordNo;
  const currentSpan = document.getElementById(currentID);
  const curSpanWord = currentSpan.innerText;

  if(wordEntered == curSpanWord.substring(0,wordEntered.length)){
    colorSpan(currentID, 2);
  }
  else{
    colorSpan(currentID, 3);
  }

}
//vérifie le mot entré

function checkWord(){
  const wordEntered = inputItem.value;
  inputItem.value='';

  const wordID = "word "+wordNo;
  const checkSpan = document.getElementById(wordID);
  wordNo++;
  wordsSubmitted++;

  if(checkSpan.innerText === wordEntered){
    colorSpan(wordID, 1);
    wordsCorrect++;
    cw.innerText=wordsCorrect;
  }
  else{
    colorSpan(wordID, 3);
  }

  if(wordNo>40){

    displayTest(language);
  }
  else{
    const nextID = "word "+wordNo;
    colorSpan(nextID, 2);
  }
}

//color des mots 
function colorSpan(id, color){
  const span = document.getElementById(id);
  if(color === 1 ){
    span.classList.remove('wrong');
    span.classList.remove('current');
    span.classList.add('correct');
  }
  else if(color ===2){
    span.classList.remove('correct');
    span.classList.remove('wrong');
    span.classList.add('current');
  }
  else{
    span.classList.remove('correct');
    span.classList.remove('current');
    span.classList.add('wrong');
  }
}

//afficher des mots aleatoire 
function displayTest(diff){
  wordNo = 1;
  testItem.innerHTML = '';

  let newTest = randomWords(diff);
  newTest.forEach(function(word, i){
    let wordSpan = document.createElement('span');
    wordSpan.innerText = word;
    wordSpan.setAttribute("id", "word " + (i+1));
    testItem.appendChild(wordSpan);
  });

  const nextID = "word "+wordNo;
  colorSpan(nextID, 2);
}

//Generate un tableau of random word
function randomWords(diff){

  var frWords = ["a", "propos", "au-dessus", "à","travers", "agir", "ajouter", "avoir"," peur", "après", "à nouveau", "âge", "il", "d'accord", "air ", "tous", "seul", "le long", "toujours", "suis", "montant", "un", "et", "en","colère", "autre", "répondre", "tout", "n'importe", "apparaître", "pomme", "sont", "zone", "bras", "armée", "autour de", "arriver", "art", "comme", "demander", "à ", "tante", "loin", "bébé", "dos", "mauvais", "sac", "boule", "banque", "base", "bain", "être", "haricot", "ours", "lit", "bière", "avant", "commencer", "cloche", "ci-dessous", "meilleur", "grand", "oiseau", "naissance", "mord", "morsure ", "noir", "saignement", "bloc", "sang", "coup", "bleu", "planche", "bateau", "corps", "bouillir", "os", "livre", "frontière", "né", "les deux", "bol", "boîte", "garçon", "branche", "courageux", "pain", "pause", "respirer", "pont", "brillant ", "apporter", "frère", "marron", "brosse", "construire", "brûler", "bus", "occupé", "mais", "acheter", "par", "gâteau", "appel", "can", "casquette", "voiture", "carte", "soin", "porter", "étui", "chat", "attraper", "chaise", "chasse", "pas cher ", "fromage", "enfant", "choix", "cercle", "ville", "classe", " intelligent", "propre", "clair","monter", "horloge", "tissu", "nuage", "près", "café", "manteau", "pièce de monnaie", "froid", "couleur", "peigne", "commun", "comparer ", "venir", "contrôler", "cuisiner", "cool", "cuivre", "maïs", "coin", "correct", "coût", "compte", "couvrir", "crash", "croix", "pleurer", "tasse", "couper", "danser", "sombre", "jour", "mort", "décider", "profond", "cerf", "bureau", "mourir ", "sale", "plat", "faire", "chien", "porte", "en bas", "dessiner", "rêver", "s'habiller", "boire", "conduire", "déposer", "sec", "canard", "poussière", "devoir", "chaque", "oreille", "tôt", "gagner", "terre", "est", "facile", "manger", "effet ", "oeuf", "huit", "autre", "vide", "fin", "ennemi", "profiter", "entrer", "égal", "pair", "événement", "jamais", "chaque", "exact", "sauf", "s'attendre", "expliquer", "œil", "visage", "fait", "échouer", "chute", "faux", "famille", "célèbre ", "loin", "ferme", "rapide", "gros", "faute", "peur", "nourrir", "sentir", "fièvre", "peu", "combat", "remplir", "film", "trouver", "fin", "feu", "premier", "poisson", "fit", "cinq", "fix", "flag", "flat", "float", "floor ", "farine", "mouche", " plier", "nourriture", "fou", "pied","pour", "forcer", "forêt", "oublier", "fourchette", "former", "renard", "quatre", "libre", "geler", "frais", "ami", "de ", "avant", "fruit", "complet", "fun", "drôle", "futur", "jeu", "portail", "obtenir", "cadeau", "donner", "heureux", "verre", "aller", "chèvre", "dieu", "or", "bon", "herbe", "tombe", "grand", "vert", "gris", "groupe", "grandir ", "pistolet", "cheveux", "moitié", "hall", "main", "heureux", "dur", "chapeau", "haine", "avoir", "il", "tête", "entendre", "lourd", "coeur", "bonjour", "aide", "poule", "elle", "ici", "la sienne", "cacher", "haut", "colline", "lui ", "son", "coup", "passe-temps", "tenir", "trou", "maison", "espoir", "cheval", "chaud", "hôtel", "maison", "comment", "heure", "dépêchez-vous", "blessé", "je", "glace", "idée", "si", "dans", "dans", "inventer", "fer", "est", "île ", "il", "son", "gelée", "travail", "rejoindre", "jus", "sauter", "juste", "garder", "clé", "tuer", "gentil", "roi", "genou", "couteau", "frapper", "savoir", "dame", "lampe", "terre", "grand", "dernier", "tard", "rire", "paresseux ", "conduire", "feuille", "apprendre", "partir", "jambe", "gauche", "prêt", "longueur", " moins", "leçon", "laisser"


]
  var enWords = ["a", "about", "above", "across", "act",  "add", "afraid", "after", "again", "age", "ago", "agree", "air", "all", "alone", "along", "always", "am", "amount", "an", "and", "angry", "another", "answer", "any", "anyone",  "appear", "apple", "are", "area", "arm", "army", "around", "arrive", "art", "as", "ask", "at", "aunt",  "away", "baby", "back", "bad", "bag", "ball", "bank", "base",  "bath", "be", "bean", "bear",  "bed", "beer", "before", "begin", "bell", "below", "best", "big", "bird", "birth",  "bit", "bite", "black", "bleed", "block", "blood", "blow", "blue", "board", "boat", "body", "boil", "bone", "book", "border", "born", "both",  "bowl", "box", "boy", "branch", "brave", "bread", "break", "breathe", "bridge", "bright", "bring", "brother", "brown", "brush", "build", "burn",  "bus", "busy", "but", "buy", "by", "cake", "call", "can",  "cap", "car", "card", "care", "carry", "case", "cat", "catch",  "chair", "chase", "cheap", "cheese",  "child",   "choice",  "circle", "city", "class", "clever", "clean", "clear", "climb", "clock", "cloth",  "cloud",  "close", "coffee", "coat", "coin", "cold",  "colour", "comb",  "common", "compare", "come",  "control", "cook", "cool", "copper", "corn", "corner", "correct", "cost",  "count",   "cover", "crash", "cross", "cry", "cup",  "cut", "dance",  "dark",  "day", "dead", "decide", "deep", "deer",  "desk",   "die",  "dirty",  "dish", "do", "dog", "door",  "down", "draw", "dream", "dress", "drink", "drive", "drop", "dry", "duck", "dust", "duty", "each", "ear", "early", "earn", "earth", "east", "easy", "eat", "effect", "egg", "eight",   "else", "empty", "end", "enemy", "enjoy",  "enter", "equal",  "even",  "event", "ever", "every",  "exact",   "except",  "expect",  "explain",  "eye", "face", "fact", "fail", "fall", "false", "family", "famous", "far", "farm",  "fast", "fat", "fault", "fear", "feed", "feel", "fever", "few", "fight", "fill", "film", "find", "fine",  "fire", "first", "fish", "fit", "five", "fix", "flag", "flat", "float", "floor", "flour",  "fly", "fold", "food", "fool", "foot", "for", "force",  "forest", "forget",  "fork", "form", "fox", "four", "free", "freeze", "fresh", "friend",  "from", "front", "fruit", "full", "fun", "funny",   "future", "game",  "gate","get", "gift", "give", "glad", "glass", "go", "goat", "god", "gold", "good",   "grass", "grave", "great", "green", "gray",  "group", "grow", "gun", "hair", "half", "hall",  "hand",  "happy", "hard", "hat", "hate", "have", "he", "head",  "hear", "heavy", "heart",  "hello", "help", "hen", "her", "here", "hers", "hide", "high", "hill", "him", "his", "hit", "hobby", "hold", "hole",  "home", "hope", "horse",  "hot", "hotel", "house", "how",  "hour", "hurry",  "hurt", "I", "ice", "idea", "if",  "in",   "into", "invent", "iron",  "is", "island", "it", "its", "jelly", "job", "join", "juice", "jump", "just", "keep", "key", "kill", "kind", "king",  "knee", "knife", "knock", "know", "lady", "lamp", "land", "large", "last", "late", "laugh", "lazy", "lead", "leaf", "learn", "leave", "leg", "left", "lend", "length", "less", "lesson", "let", "letter", "lie", "life", "light", "like", "lion", "lip", "list",  "live", "lock", "lonely", "long", "look", "lose", "lot", "love", "low", "lower", "luck",  "main", "make", "male", "man", "many", "map", "mark", "may", "me", "meal", "mean", "meat",  "meet",  "milk", "mind",  "miss",  "mix", "model",   "money",  "month", "moon", "more",  "most",  "mouth", "move", "much", "music", "must", "my", "name",  "near", "neck", "need", "needle",  "net", "never", "new", "news",  "next", "nice", "night", "nine", "no", "noble", "noise", "none", "nor", "north", "nose", "not",  "notice", "now",  "obey",  "ocean", "of", "off", "offer", "office", "often", "oil", "old", "on", "one", "only", "open",  "or", "orange", "order", "other", "our", "out",  "over", "own", "page", "pain", "paint", "pair", "pan", "paper",  "park", "part",  "party", "pass", "past", "path", "pay", "peace", "pen",   "per",  "piano", "pick",  "piece", "pig", "pin", "pink", "place", "plane", "plant",  "plate", "play", "please",  "plenty",  "point",  "polite", "pool", "poor",    "pour", "power",  "press", "pretty",  "price", "prince", "prison",  "prize",      "pull", "punish", "pupil", "push", "put", "queen",  "quick", "quiet", "radio", "rain", "rainy", "raise", "reach", "read", "ready", "real",  "red",   "rent",   "reply", "rest",  "rice", "rich", "ride", "right", "ring", "rise", "road", "rob", "rock", "room", "round", "rude", "rule", "ruler", "run", "rush", "sad", "safe", "sail", "salt", "same", "sand", "save", "say", "school",  "search", "seat", "second", "see", "seem", "sell", "send",  "serve", "seven", "shade",  "shake", "shape", "share", "sharp", "she", "sheep", "sheet",  "shine", "ship", "shirt", "shoe", "shoot", "shop", "short",   "shout", "show", "sick", "side",   "silly", "silver",  "simple", "single", "since", "sing", "sink", "sister", "sit", "six", "size", "skill", "skin", "skirt", "sky", "sleep", "slip", "slow", "small", "smell", "smile", "smoke", "snow", "so", "soap", "sock", "soft", "some",  "son", "soon", "sorry", "sound", "soup", "south", "space", "speak",  "speed", "spell", "spend", "spoon", "sport", "spread", "spring", "square", "stamp", "stand", "star", "start",  "stay", "steal", "steam", "step", "still",  "stone", "stop", "store", "storm", "story",  "street", "study", "stupid",  "such", "sugar",  "sun", "sunny",  "sure",  "sweet", "swim", "sword", "table", "take", "talk", "tall", "taste", "taxi", "tea", "teach", "team", "tear",   "tell", "ten", "tennis", "test", "than", "that", "the", "their", "then", "there",  "these", "thick", "thin", "thing", "think", "third", "this",  "threat", "three", "tidy", "tie", "title", "to", "today", "toe", "too", "tool", "tooth", "top", "total", "touch", "town", "train", "tram",  "tree",  "true", "trust", "twice", "try", "turn", "type", "ugly", "uncle", "under",  "unit", "until", "up", "use", "useful", "usual", "usually",  "very",  "voice", "visit", "wait", "wake", "walk", "want", "warm", "was", "wash", "waste", "watch", "water", "way", "we", "weak", "wear",  "week", "weight",  "were", "well", "west", "wet", "what", "wheel", "when", "where", "which", "while", "white", "who", "why", "wide", "wife", "wild", "will", "win", "wind",  "wine",  "wire", "wise", "wish", "with",  "woman",  "word", "work", "world", "worry", "yard", "yell",  "yet", "you", "young", "your", "zero", "zoo"];
  
  if(diff==1){
    wordArray = enWords;
  }
  else{
    wordArray =frWords;
  }

  var selectedWords = [];
  for(var i=0;i<40;i++){
    var randomNumber = Math.floor(Math.random()*wordArray.length);
    selectedWords.push(wordArray[randomNumber]+" ");
  }
  return selectedWords;
}
