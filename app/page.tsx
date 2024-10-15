"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

// List of possible target words
const WORDS = [
   "apple",
   "bread",
   "chair",
   "dream",
   "eagle",
   "flake",
   "ghost",
   "heart",
   "ivory",
   "joker",
   "kitev",
   "leafy",
   "mango",
   "noise",
   "ocean",
   "peach",
   "quirk",
   "raven",
   "snake",
   "table",
   "urban",
   "vapor",
   "whale",
   "xenia",
   "yogurt",
   "zebra",
   "alarm",
   "brave",
   "clash",
   "devil",
   "ember",
   "fling",
   "great",
   "haze",
   "index",
   "jolly",
   "knock",
   "laugh",
   "money",
   "night",
   "olive",
   "plumb",
   "quilt",
   "rigid",
   "shade",
   "tiger",
   "unzip",
   "visit",
   "watch",
   "youth",
   "adobe",
   "blend",
   "clear",
   "dwell",
   "elope",
   "flint",
   "grant",
   "honey",
   "inner",
   "juicy",
   "knoll",
   "lemon",
   "merge",
   "noble",
   "orbit",
   "pluck",
   "quick",
   "raven",
   "shore",
   "toast",
   "unity",
   "vexed",
   "weary",
   "avian",
   "berry",
   "chase",
   "douse",
   "elbow",
   "fancy",
   "gloat",
   "hazel",
   "ideal",
   "jiffy",
   "knead",
   "lurch",
   "medal",
   "nervy",
   "ounce",
   "plump",
   "quirky",
   "regal",
   "scale",
   "tango",
   "upset",
   "vigor",
   "wharf",
   "agile",
   "brand",
   "cider",
   "dwell",
   "eager",
   "feign",
   "glint",
   "husky",
   "ivory",
   "joint",
   "keenly",
   "leafy",
   "modal",
   "noble",
   "oval",
   "pearly",
   "quiet",
   "ravel",
   "swish",
   "taffy",
   "upper",
   "vouch",
   "woken",
   "alpha",
   "bleak",
   "caddy",
   "dough",
   "earth",
   "feuds",
   "groan",
   "hazed",
   "ivory",
   "jetty",
   "keen",
   "laugh",
   "mimic",
   "north",
   "opine",
   "prime",
   "quack",
   "royal",
   "stony",
   "tryst",
   "urge",
   "vault",
   "whirl",
   "yacht",
   "angus",
   "blush",
   "crank",
   "dove",
   "ember",
   "flowy",
   "globe",
   "humor",
   "index",
   "joyed",
   "kayak",
   "lemon",
   "munch",
   "nectar",
   "ogive",
   "pluck",
   "quirk",
   "razor",
   "scale",
   "tepid",
   "upend",
   "vowee",
   "waver",
   "yappy",
   "apple",
   "bardy",
   "chaty",
   "dreck",
   "elfin",
   "frenzy",
   "grump",
   "hoist",
   "ivory",
   "jiffy",
   "keen",
   "laugh",
   "mimic",
   "north",
   "opine",
   "prime",
   "quack",
   "royal",
   "stony",
   "tryst",
   "urge",
   "vault",
   "whirl",
   "yacht",
   "alien",
   "bratty",
   "cheer",
   "devil",
   "empty",
   "fussy",
   "grape",
   "handy",
   "irked",
   "jolly",
   "kicky",
   "leafy",
   "merry",
   "nifty",
   "ovule",
   "poise",
   "quilt",
   "rocky",
   "shock",
   "trace",
   "unity",
   "vouch",
   "weight",
   "yield",
   "zesty",
   "abode",
   "brave",
   "chuck",
   "diggy",
   "earth",
   "feath",
   "glary",
   "human",
   "inchy",
   "jovial",
   "knead",
   "livid",
   "moody",
   "nacho",
   "odeon",
   "pitch",
   "quail",
   "rhythm",
   "squib",
   "topsy",
   "unzip",
   "vouch",
   "wacky",
   "yacht",
   "zebra",
   "ample",
   "berry",
   "cling",
   "dodge",
   "equal",
   "furry",
   "great",
   "hasty",
   "ivory",
   "joint",
   "kelpy",
   "loggy",
   "murky",
   "nitro",
   "obits",
   "point",
   "quiet",
   "reset",
   "socky",
   "tarty",
   "upscale",
   "vibe",
   "xray",
   "yawns",
   "zest",
   "alpha",
];

// Keyboard layout
const KEYBOARD = [
   ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
   ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
   ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

interface NotificationProps {
   message: string;
   type: "success" | "error";
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
   return (
      <div
         className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-md ${
            type === "success" ? "bg-green-500" : "bg-red-500"
         } text-white`}
      >
         {message}
      </div>
   );
};

export default function WordleClone() {
   const [targetWord, setTargetWord] = useState("");
   const [currentGuess, setCurrentGuess] = useState("");
   const [guesses, setGuesses] = useState<string[]>([]);
   const [gameOver, setGameOver] = useState(false);
   const [keyColors, setKeyColors] = useState<{ [key: string]: string }>({});
   const [notification, setNotification] = useState<NotificationProps | null>(
      null
   );

   useEffect(() => {
      // Choose a random word when the component mounts
      setTargetWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
   }, []);

   const showNotification = (message: string, type: "success" | "error") => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
   };

   const handleKeyPress = useCallback(
      (key: string) => {
         if (gameOver) return;

         if (key === "ENTER") {
            if (currentGuess.length !== 5) {
               showNotification("Your guess must be 5 letters long!", "error");
               return;
            }
            const newGuesses = [...guesses, currentGuess];
            setGuesses(newGuesses);
            updateKeyColors(currentGuess);
            setCurrentGuess("");

            if (currentGuess.toUpperCase() === targetWord.toUpperCase()) {
               showNotification(
                  "Congratulations! You've guessed the word!",
                  "success"
               );
               setGameOver(true);
            } else if (newGuesses.length >= 6) {
               showNotification(
                  `Game over! The word was ${targetWord}`,
                  "error"
               );
               setGameOver(true);
            }
         } else if (key === "BACKSPACE") {
            setCurrentGuess((prev) => prev.slice(0, -1));
         } else if (currentGuess.length < 5) {
            setCurrentGuess((prev) => prev + key);
         }
      },
      [currentGuess, gameOver, guesses, targetWord]
   );

   useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
         if (event.key === "Enter") {
            handleKeyPress("ENTER");
         } else if (event.key === "Backspace") {
            handleKeyPress("BACKSPACE");
         } else {
            const key = event.key.toUpperCase();
            if (key.length === 1 && key >= "A" && key <= "Z") {
               handleKeyPress(key);
            }
         }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, [handleKeyPress]);

   const updateKeyColors = (guess: string) => {
      const newColors = { ...keyColors };
      for (let i = 0; i < guess.length; i++) {
         const letter = guess[i].toUpperCase();
         if (targetWord[i].toUpperCase() === letter) {
            newColors[letter] = "bg-green-600 hover:bg-green-700";
         } else if (
            targetWord.toUpperCase().includes(letter) &&
            newColors[letter] !== "bg-green-600 hover:bg-green-700"
         ) {
            newColors[letter] = "bg-yellow-500 hover:bg-yellow-600";
         } else if (
            !newColors[letter] ||
            newColors[letter] === "bg-gray-400 hover:bg-gray-500"
         ) {
            newColors[letter] = "bg-gray-500 hover:bg-gray-600";
         }
      }
      setKeyColors(newColors);
   };

   const getLetterColor = (letter: string, index: number, guess: string) => {
      if (!letter) return "bg-white";
      if (letter.toUpperCase() === targetWord[index].toUpperCase())
         return "bg-green-600";
      if (targetWord.toUpperCase().includes(letter.toUpperCase()))
         return "bg-yellow-500";
      return "bg-gray-500";
   };

   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
         <h1 className="text-4xl font-bold mb-8">Wordle Clone</h1>
         {notification && (
            <Notification
               message={notification.message}
               type={notification.type}
            />
         )}
         <div className="grid grid-cols-5 gap-2 mb-4">
            {[...Array(6)].map((_, rowIndex) =>
               [...Array(5)].map((_, colIndex) => (
                  <div
                     key={`${rowIndex}-${colIndex}`}
                     className={`w-12 h-12 flex items-center justify-center text-xl font-bold border-2 ${
                        guesses[rowIndex]
                           ? getLetterColor(
                                guesses[rowIndex][colIndex],
                                colIndex,
                                guesses[rowIndex]
                             )
                           : rowIndex === guesses.length &&
                             colIndex < currentGuess.length
                           ? "bg-gray-200"
                           : "bg-white"
                     }`}
                  >
                     {guesses[rowIndex]?.[colIndex] ||
                        (rowIndex === guesses.length
                           ? currentGuess[colIndex]
                           : "")}
                  </div>
               ))
            )}
         </div>
         <div className="mb-4">
            {KEYBOARD.map((row, rowIndex) => (
               <div key={rowIndex} className="flex justify-center gap-1 my-1">
                  {row.map((key) => (
                     <Button
                        key={key}
                        onClick={() => handleKeyPress(key)}
                        className={`${
                           key === "ENTER" || key === "BACKSPACE"
                              ? "w-16"
                              : "w-10"
                        } h-14 ${
                           keyColors[key] || "bg-gray-400 hover:bg-gray-500"
                        } text-white font-semibold`}
                        disabled={gameOver}
                     >
                        {key === "BACKSPACE" ? "←" : key}
                     </Button>
                  ))}
               </div>
            ))}
         </div>
         {gameOver && (
            <Button onClick={() => window.location.reload()}>Play Again</Button>
         )}
      </div>
   );
}
