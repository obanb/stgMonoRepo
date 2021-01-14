import React from 'react';
import { useTarget } from './hooks/useTarget';
import { Figure } from './Figure';
import { useBoardDispatchContext } from './state/BoardContext';
import { constVoid } from 'fp-ts/function';

const BoardTile = ({
  positionY,
  positionX,
  uniqueId,
  config,
  figure,
  targeted,
  possibleMove
}) => {
  const [isTargeted, onTarget] = useTarget();

  const dispatch = useBoardDispatchContext();

  const handleClick = () => {
    console.log('tile', {id: uniqueId})
    dispatch({ type: 'SET_TILE_TARGETED', payload: uniqueId });
    onTarget();
  };

  return (
    <div
      onClick={figure ? constVoid :handleClick}
      className={`${targeted ? styles.targeted : styles.tile} ${possibleMove ? styles.possibleMove : styles.tile}`}
      style={{ width: config.tileWidth, height: config.tileHeight }}
    >
      {console.log('render')}
      <div className={devStyles.devInfo}>{uniqueId}</div>
      {figure && <Figure {...figure} />}
    </div>
  );
};

const styles = {
  tile: 'border border-gray-600 float-left z-10',
  targeted: 'border border-orange-900 float-left bg-yellow-100',
  possibleMove: 'border border-orange-900 float-left bg-green-100',
};

const devStyles = {
  devInfo: 'z-0 absolute',
};

export default React.memo(BoardTile);
