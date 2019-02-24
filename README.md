# Hangman Helper
Hangman Helper is an assistant for the person holding a hangman word that others are trying to guess. Enter the word and the letters guessed so far, and it gives you back the text to tell other players.

Written for my wife, who sometimes plays with friends over email.

EXAMPLE
````
Word: ANTIQUITY
Guesses: ETOA
Explain last 3 letter(s) (you pick how many)

Gives this output:

A _ T _ _ _ _ T _ 
9 letters
There are two T's, no O's, and one A.
Guessed Letters: E, T, O, A
````
It has controls to adjust font size, which it remembers for your next visit.

It also remembers the word and guesses. Unfortunately, that means it doesn't handle participating in more than one game at once, unless you use a separate copy for each one.

## Use
It's live <a href="http://dave-merrill.com/hangman/index.html">here</a>, on my tiny personal site.

You can also download it and run it from a local hard drive. No installation needed, just grab the files, and double click index.html.

## Credits
Hangman Helper was written by Dave Merrill, (c) 2014-2019.<br>It's free software, released under the MIT license.

It uses Marcus Westin's wonderful <a href="https://github.com/marcuswestin">store.js</a> library to remember things.