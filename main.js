function updateDisplay() {
  var word = document.getElementById("word").value.toUpperCase();
  var guesses = document.getElementById("guesses").value.toUpperCase();
  var explainCount = getSelectValue("explainCount");

  word = word.replace(/[^A-Z]/g, "");
  guesses = guesses.replace(/[^A-Z]/g, "");

  store.set("word", word);
  store.set("guesses", guesses);

  document.getElementById("word").value = word;
  document.getElementById("guesses").value = guesses;

  var wordDisplay = word.replace(/./g, "_");
  var wordLen = wordDisplay.length;
  var guessCount = guesses.length;
  var skipExplainCount =
    explainCount === "All" ? -1 : Math.max(guessCount - explainCount, 0) - 1;
  //console.log(skipExplainCount);
  var guessedLetters = "";
  var wrongLetters = [];
  var msg = "";
  var success = false;
  var letter, isDupeLetter, describeThisLetter, pos, i;
  for (i = 0; i < guessCount; i++) {
    letter = guesses.charAt(i);
    isDupeLetter = guessedLetters.indexOf(letter) >= 0;
    describeThisLetter = i > skipExplainCount;
    if (success) {
      if (describeThisLetter)
        msg += " extra letters after the word was guessed were ignored";
      break;
    } else if (isDupeLetter) {
      // same letter guessed more than once
      if (describeThisLetter) msg += letter + " was already guessed, ";
    } else {
      guessedLetters = guessedLetters + letter;
      occuranceCount = 0;
      pos = word.indexOf(letter);
      if (pos === -1) {
        if (describeThisLetter)
          msg = (msg || "There are ") + "no " + letter + "'s, ";
      } else {
        while (pos >= 0) {
          occuranceCount++;
          wordDisplay =
            wordDisplay.substr(0, pos) +
            letter +
            wordDisplay.substr(pos + 1, wordLen);
          word = word.substr(0, pos) + " " + word.substr(pos + 1, wordLen);
          pos = word.indexOf(letter);
          success = wordDisplay.indexOf("_") === -1;
          if (success) break;
        }
        if (describeThisLetter && !msg)
          msg = occuranceCount === 1 ? "There's " : "There are ";
        if (describeThisLetter)
          msg +=
            numberText(occuranceCount) +
            " " +
            letter +
            (occuranceCount > 1 ? "'s" : "") +
            ", ";
      }
    }
  }
  document.getElementById("successMsg").innerHTML = success
    ? "Success! All of the guesses have correctly formed the word"
    : "&nbsp;";

  wordDisplay = lettersList(wordDisplay);
  if (msg) {
    msg = msg.replace(/, $/, "") + "."; // remove trailing comma-space if it's there, and add trailing period
    pos = msg.lastIndexOf(",");
    if (pos >= 0)
      msg = msg.substr(0, pos) + ", and" + msg.substr(pos + 1, msg.length); // change comma before last listed letter to ', and'
  }

  guessesInArray = guesses.split("");

  guessesInArray.forEach((g) => {
    if (!wordDisplay.includes(g)) {
      wrongLetters.push(g);
    }
  });

  wrongLetters = wrongLetters.join("");

  wordDisplay = lettersList(wordDisplay);
  if (guessedLetters)
    guessedLetters = "All Guesses: " + lettersList(guessedLetters, true);
  if (wrongLetters)
    wrongLetters = "Incorrect Guesses: " + lettersList(wrongLetters, true);

  document.getElementById("results").value =
    wordDisplay +
    "\n" +
    wordLen +
    " letters\n" +
    msg +
    (msg ? "\n" : "") +
    guessedLetters +
    "\n" +
    wrongLetters;
}

function numberText(number) {
  if (number > 0 && number < numberText.map.length)
    return numberText.map[number];
  return number;
}
numberText.map = "no,one,two,three,four,five,six,seven,eight,nine,ten".split(
  ","
);

function getSelectValue(selectID) {
  var select = document.getElementById(selectID);
  return select.options[select.selectedIndex].value;
}
function setSingleSelect(selectID, value) {
  value = "" + value;
  var select = document.getElementById(selectID),
    options = select.options,
    count = options.length,
    i;
  select.selectedIndex = 1;
  for (i = 0; i < count; i++) {
    if (options[i].value === value) {
      select.selectedIndex = i;
      break;
    }
  }
}

function lettersList(letters, useCommas) {
  var replacement = useCommas ? "$1, " : "$1 ";
  letters = letters.replace(/(.)/g, replacement); // add space and maybe comma between letters
  letters = letters.substr(0, letters.length - (useCommas ? 2 : 0)); // trim extra trailing space and maybe comma
  return letters;
}

function adjustFontSize(larger) {
  var contentElement = document.getElementById("content");
  var size;
  var SIZE_UNITS = "px"; // or vw
  var DEFAULT_SIZE = 15; // 2 for vw units
  var MIN_SIZE = 8; // 1 for vw units
  var SIZE_INCREMENT = 1; // .5 for vw units
  if (typeof larger === "undefined")
    // bodyOnLoad()
    size = store.get("fontSize") || DEFAULT_SIZE;
  // size adjust btns
  else {
    size = parseFloat(contentElement.style.fontSize.replace(/[^0-9.]/g, ""));
    size = larger ? size + SIZE_INCREMENT : size - SIZE_INCREMENT;
  }
  size = Math.max(size, MIN_SIZE);
  //console.log(size);
  store.set("fontSize", size);
  contentElement.style.fontSize = size + SIZE_UNITS;
}

function bodyOnLoad() {
  var styles = [
    "background: linear-gradient(#D33106, #571402)",
    "border: 1px solid #3E0E02",
    "color: white",
    "display: block",
    "text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)",
    "box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset",
    "line-height: 40px",
    "text-align: center",
    "font-weight: bold",
  ].join(";");
	console.log("%c Watchu doing here in the console sussybaka👀", styles);
  adjustFontSize();
  document.getElementById("word").value = store.get("word") || "Hogwarts";
  document.getElementById("guesses").value =
    store.get("guesses") || "GGWGTDHSRNHOFDKA";
  updateDisplay();
}

/*
                                          ,~~~~~~~~~~~~~~~~~~~~,
                                        ,'   Um what?? What    ',
                                        |    does that code      |
                                        ',   even MEAN?!        ,'
                                          '~~~~~~.,   ,.~~~~~~~'
                                                  |  /
                                                  | /
                                                  |/
                                                  '
                                           .~-,
                                         .' `,>
                                      .-'   ,>  <7`,
                                    ,`     ,>  <7  }
                                   {   o   !> <7  /
                                   {       j_7`  !
                                   :            j'
                                    `,         ]
                                     F        }
                                    F       , {
                                   F         `.   rr
                                 .F          | `=-"
       _,-`                    .F            `,
     ,`;                     .F               j
    :  7                    F                 ;
    :  `^,                F`                 ,'
    `,    `^,          ,F`     .          ,  /
      `,     `^-^-^-^-`       ;           | ;
        `.                    :          .`/      ,-^,-
          `-.                 }         ,'' `,_.-^ /'
             `-,___           ;      .'` -_      ,7
                   ``=-....-={     ,/      `-','`Q
                              \     |                .-'-.]
                               `,   `.             .`  0  `.
                                `,   l_           `|  __   |`
                               .C.-,___`==,        |  ||   |
*/
