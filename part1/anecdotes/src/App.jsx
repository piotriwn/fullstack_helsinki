import { useState } from 'react'



const ButtonNext = ({ anecdotesLen, selected, setSelected }) => {
  const onClick = () => {
    let randomInd;
    do {
      randomInd = Math.floor(Math.random() * anecdotesLen);
    } while (randomInd === selected);
    setSelected(randomInd);
  }

  return (
    <button onClick={onClick}>
      next anecdote
    </button>
  )
}

const ButtonVote = ({ votes, setVotes, selected, greatest, setGreatest }) => {
  const onClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);

    // we have to pass copy here, if we pass votes, then we'll use "old" array
    // state update in React happens asynchronously
    setGreatest(FindGreatestArray(greatest, copy));    
  }

  return (
    <button onClick={onClick}>
      vote
    </button>
  )
}

const FindGreatestArray = (currentGreatest,arr) => {
  let greatestNew = currentGreatest ?? 0; // initially greatest is null
  for (let i =0; i< arr.length; i++) {
    if (arr[i] > arr[greatestNew]) {
      greatestNew = i;
    }
  }
  return greatestNew;
}

const AnecdoteMostVotes = ({greatest, anecdotes}) => {
  if (greatest === null) {
    return ("Cast at least 1 vote.")
  } else {
    return (
      <div>
      {anecdotes[greatest]}
    </div>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const anecdotesLen = anecdotes.length;
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotesLen).fill(0));
  const [greatest, setGreatest] = useState(null);

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <div>
          {anecdotes[selected]}
        </div>
        <div>
          <ButtonVote votes={votes} selected={selected} setVotes={setVotes} greatest={greatest} setGreatest={setGreatest}></ButtonVote>
          <ButtonNext anecdotesLen={anecdotesLen} selected={selected} setSelected={setSelected}></ButtonNext>
        </div>
      </div>
      <div>
        <h1>Anecodote with most votes</h1>
        <AnecdoteMostVotes greatest={greatest} anecdotes={anecdotes}></AnecdoteMostVotes>
      </div>
    </div>
  )
}

export default App;