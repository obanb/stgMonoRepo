import React, { Fragment } from 'react';
import { NewGameForm } from './NewGameForm';
import GameBoard from './GameBoard';
import { GameInfo } from './GameInfo';
import { EntityInfo } from './EntityInfo';
import { BoardContext } from './state/BoardContext';

interface Props {}

interface NewGameInput {
  playername: string;
  boardsize: number;
}

const GameController = ({}: Props) => {
  const [showBoard, setShowBoard] = React.useState(false);
  const [showForm, setShowForm] = React.useState(true);
  const [boardInput, setBoardInput] = React.useState({
    playername: '',
    boardsize: 0,
  });

  const handleInitBoard = (input: NewGameInput) => {
    setShowBoard(true);
    setShowForm(false);
    setBoardInput(input);
    console.log(`handle input board`, input);
  };

  return (
    <Fragment>
      <GameInfo/>
      {showBoard && (
        <BoardContext>
          <GameBoard
            input={boardInput}
            config={{ tile: { tileHeight: 40, tileWidth: 40 } }}
          />
        </BoardContext>
      )}
      {showForm && <NewGameForm onSubmit={handleInitBoard} />}
      <EntityInfo/>
    </Fragment>
  );
};

export default GameController;
