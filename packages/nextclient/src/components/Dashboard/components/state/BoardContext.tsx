import { createContext, useContext, useReducer } from 'react';
import { pipe } from 'fp-ts/lib/pipeable';
import * as O from 'fp-ts/lib/Option';
import { PlayerFigurePositions } from '../types/GameTypes';

/**
 * Types
 */

export interface BoardState {
  tileTargeted: number;
  figureTargeted: number;
  possibleMoves: number[];
  figurePositions: PlayerFigurePositions;
}

type SET_TILE_TARGETED = { type: 'SET_TILE_TARGETED'; payload: number };
type SET_FIGURE_TARGETED = { type: 'SET_FIGURE_TARGETED'; payload: number };

type BoardActions = SET_TILE_TARGETED | SET_FIGURE_TARGETED;

type BoardActionImpl = (state: BoardState, action: BoardActions) => BoardState;

interface ActionHandler {
  [key: string]: BoardActionImpl;
}

/**
 * Impl
 */

const computeBorderTiles = (boardSize: number) => {
  const topBorders = [];
  for (let i = 0; i < boardSize; i++) {
    topBorders.push(i);
  }
  const bottomBorders = [];
  for (
    let i = boardSize * boardSize - boardSize;
    i < boardSize * boardSize;
    i++
  ) {
    topBorders.push(i);
  }
};

const recomputePossibleMoves = (
  boardSize: number,
  range: number,
  position: number,
): number[] => {
  const possiblesMoves = [
    position + range,
    position + range - 1,
    position - range,
    position - range + 1,
    position + boardSize * range,
    position + boardSize * (range - 1),
    position - boardSize * range,
    position - boardSize,
  ];

  return possiblesMoves;
};

const setInitialFigurePositions = (): PlayerFigurePositions =>
  pipe({
    5: {
      id: 'figure1',
      boardPosition: 5,
      owner: 'me',
      figureProps: {
        name: 'vampire',
        desc: 'vampire figure',
        attrs: {},
        move: {},
      },
    },
    22: {
      id: 'figure2',
      boardPosition: 22,
      owner: 'me',
      figureProps: {
        name: 'vampire',
        desc: 'vampire figure',
        attrs: {},
        move: {},
      },
    },
  });

// const recomputeBoardPositions = (figureState: FigureState) => {
//   return [...figureState.player1, ...figureState.player2].reduce(
//     (acu, next) => {
//       acu[next.boardPosition] = next.id;
//       return acu;
//     },
//     {},
//   );
// };

const boardInitialState = {
  tileTargeted: 0,
  figureTargeted: 0,
  possibleMoves: [],
  figurePositions: setInitialFigurePositions(),
};

const setTileTargeted = (
  state: BoardState,
  action: SET_TILE_TARGETED,
): BoardState => {
  console.log('tile targeted', action.payload);
  return pipe({
    ...state,
    tileTargeted: action.payload,
    figureTargeted: undefined,
    figurePositions: {
      ...state.figurePositions,
      [state.figureTargeted]: undefined,
      [action.payload]: state.figureTargeted,
    },
  });
};
const setFigureTargeted = (
  state: BoardState,
  action: SET_FIGURE_TARGETED,
): BoardState => {
  console.log('figure targeted', action.payload);
  return pipe({
    ...state,
    figureTargeted: action.payload,
    possibleMoves: recomputePossibleMoves(20, 2, state.figureTargeted),
  });
};

const actionHandler: ActionHandler = {
  SET_TILE_TARGETED: setTileTargeted,
  SET_FIGURE_TARGETED: setFigureTargeted,
};

const boardReducer = (
  state: BoardState = boardInitialState,
  action: BoardActions,
) => {
  return pipe(
    actionHandler[action.type],
    O.fromNullable,
    O.map((f) => f(state, action)),
    O.getOrElse(() => {
      return state;
    }),
  );
};

const BoardReadContext = createContext<BoardState>(boardInitialState);
const BoardDispatchContext = createContext<React.Dispatch<BoardActions>>(null);

const BoardContext = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, boardInitialState);

  return (
    <BoardReadContext.Provider value={state}>
      <BoardDispatchContext.Provider value={dispatch}>
        {children}
      </BoardDispatchContext.Provider>
    </BoardReadContext.Provider>
  );
};

const useBoardReadContext = () => useContext(BoardReadContext);
const useBoardDispatchContext = () => useContext(BoardDispatchContext);

export { BoardContext, useBoardReadContext, useBoardDispatchContext };
