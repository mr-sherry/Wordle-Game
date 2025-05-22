import React, { useEffect, useState } from "react";
import useApiFetch from "../Hooks/useApiFetch";
import styles from "./Game.module.css";

function Game() {
  const randomWord = useApiFetch();
  const [word, setWord] = useState("")
  const [letters, setLetters] = useState([[], [], [], [], [], []]);
  const [rowNum, setRowNum] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  console.log(gameOver);



  useEffect(() => {
    setWord('aslam');
    const eventManage = (e) => {
      const key = e.key.toLowerCase();

      if (/^[a-z]$/.test(key)) {
        if (letters[rowNum].length < 5) {
          const newLetters = [...letters];
          newLetters[rowNum] = [...newLetters[rowNum], key];
          setLetters(newLetters);
        }
      }

      else if (key === "enter") {
        setLetters((prevLetters) => {
          const currentRow = prevLetters[rowNum];
          if (currentRow.length === 5) {
            const currentWord = currentRow.join("").toLowerCase();

            if (currentWord === word.toLowerCase()) {
              setGameOver(true);
              alert("You Win! 🎉");
              window.location.reload()
            } else if (rowNum < 5) {
              setRowNum((prevRowNum) => prevRowNum + 1);
            } else {
              setGameOver(true);
              alert(`Game Over! The word was "${word}".`);
              window.location.reload()

            }
          }
          return prevLetters;
        });
      }
      else if (key === 'backspace') {
        if (letters[rowNum].length > 0) {
          const newLetters = [...letters];
          newLetters[rowNum] = newLetters[rowNum].slice(0, -1);
          setLetters(newLetters);
        }
      }
    }

    window.addEventListener('keydown', eventManage)
    return () => {
      window.removeEventListener('keydown', eventManage)
    }
  }, [letters, rowNum])


  const divLetters = (i, j) => {
    return letters[i][j] ? letters[i][j].toUpperCase() : '';
  };

  const divClass = (i, j) => {
    const currentLetter = letters[i][j];
    if (!currentLetter) return 'white';

    if (currentLetter === word[j]) {
      return 'green';
    } else if (word.includes(currentLetter)) {
      return 'yellow';
    }
  };

  const rows = [];

  for (let i = 0; i < 6; i++) {
    const innerRows = [];

    for (let j = 0; j < 5; j++) {
      innerRows.push(
        <div key={j} className={`${styles.wordleRow} ${styles[divClass(i, j)]}`}>
          {divLetters(i, j)}
        </div>
      );
    }

    rows.push(
      <div key={i} className={styles.wordleColumn}>
        {innerRows}
      </div>
    );
  }

  return (
    <>
      <div className={styles.mainDiv}>
        <h1>Wordle Game By Ahmed</h1>
        {/* <h1>Random Word:{word}</h1> */}
        <div>

          {rows}
        </div>
      </div>
    </>
  );
}

export default Game;
