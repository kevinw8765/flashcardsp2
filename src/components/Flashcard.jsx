import React, {useState} from 'react' 


const Flashcard = ({ flashcards, chapter }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // New functionality
  const [userGuess, setUserGuess] = useState(''); // user guess
  const [feedback, setFeedback] = useState(''); // feedback

  const filteredFlashcards = flashcards.filter(card => card.chapter === chapter);

  const handleFlip = () => {
    setFlipped(!flipped);
  };
  
  const handleNextCard = () => {
    const nextIndex = (currentIndex + 1) % filteredFlashcards.length;
    setCurrentIndex(nextIndex);
    setFlipped(false);
    setFeedback('');
    setUserGuess('');
  };

  const handlePrevCard = () => {
    setCurrentIndex((currentIndex - 1 + filteredFlashcards.length) % filteredFlashcards.length);
    setFlipped(false);
    setFeedback('');
    setUserGuess('');
  };

  const handleGuessChange = (e) => {
    setUserGuess(e.target.value);
  };

  const handleSubmitGuess = () => {
    if (userGuess.trim().toLowerCase() === filteredFlashcards[currentIndex].answer.toLowerCase()) {
      setFeedback('Correct! ✅');
    } else {
      setFeedback('Incorrect ❌');
    }
  };

  return (
    <div className="container">
        <h1>Java Trivia Flashcards</h1>
        <p>Test your Java knowledge with these flashcards!</p>

        {filteredFlashcards.length > 0 ? (
            <div className="flashcard" onClick={handleFlip} >
            {flipped ? filteredFlashcards[currentIndex].answer : filteredFlashcards[currentIndex].question}
            </div>
            ) 
            : (
            <p>No flashcards available for this chapter.</p>)
        }
        <input
          type="text"
          value={userGuess}
          onChange={handleGuessChange}
          placeholder="Enter your guess"
        />
        
        <button onClick={handleSubmitGuess}>Submit Guess</button>
        <p>{feedback}</p>

        <button onClick={handlePrevCard}>Back</button>
        <button onClick={handleNextCard}>Next</button>

        <p className="card-count">Card {currentIndex + 1} of {filteredFlashcards.length}</p>
    </div>
  )
}

export default Flashcard