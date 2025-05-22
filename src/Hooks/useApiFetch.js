import React, { useState } from 'react'

function useApiFetch() {
    const fetchApi=async ()=> {
        const response = await fetch('https://random-word.ryanrk.com/api/en/word/random/?length=5')
      const word = await response.json()
      const randomWord = word[0].toLowerCase();
        setWordApi(randomWord)
        return randomWord;
    }
    const [wordApi, setWordApi] = useState(fetchApi)
    

  return wordApi
}

export default useApiFetch