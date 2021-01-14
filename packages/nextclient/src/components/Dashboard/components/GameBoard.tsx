import React, { ReactElement } from 'react';
import { useBoardReadContext } from './state/BoardContext';
import BoardTile from './BoardTile';

interface Props {
  input: {
    boardsize: number;
    playername: string;
  };
  config: {
    tile: {
      tileWidth: number;
      tileHeight: number;
    };
  };
}

interface TileDesc {
  positionX: number;
  positionY: number;
  normalizedPosition: number;
  uniqueId: number;
  component: ReactElement<any, any>;
}

const GameBoard = ({ input, config }: Props) => {
  const tiles: TileDesc[] = [];

  const boardWidth = config.tile.tileWidth * input.boardsize;
  const boardHeith = config.tile.tileHeight * input.boardsize;

  const state = useBoardReadContext();

  console.log(JSON.stringify(state));

  const renderTiles = () => {
    let uniqueId = 0;

    for (let x = 0; x < input.boardsize; x++) {
      for (let y = 0; y < input.boardsize; y++) {
        uniqueId++;
        // console.log(`tile ${x} ${y} from ${input.boardsize}`);

        const tileFigure = state.figurePositions[uniqueId];

        const isPossibleMove = state.possibleMoves.filter(pos => pos === uniqueId)[0];

        // console.log(tileFigure);

        tiles.push({
          positionX: x,
          positionY: y,
          normalizedPosition: x + y,
          uniqueId,
          component: (
            <BoardTile
              key={uniqueId}
              positionX={x}
              positionY={y}
              uniqueId={uniqueId}
              config={config.tile}
              figure={
                tileFigure
                  ? { ...tileFigure, boardPosition: uniqueId }
                  : undefined
              }
              targeted={state.tileTargeted === uniqueId ? true : false}
              possibleMove={isPossibleMove}
            />
          ),
        });
      }
    }
  };
  renderTiles();

  return (
    <div
      style={{ height: boardHeith, width: boardWidth }}
      className={styles.board}
    >
      {tiles.map((tile) => {
        return tile.component;
      })}
    </div>
  );
};

const styles = {
  board: 'float-left',
};

export default React.memo(GameBoard);
