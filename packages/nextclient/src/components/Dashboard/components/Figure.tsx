import React from 'react';
import { useTarget } from './hooks/useTarget';
// @ts-ignore
import Vampire from "../../../../public/vampire.svg"
import { PlayerFigure } from './types/GameTypes';
import { useBoardDispatchContext } from './state/BoardContext';


export const Figure = (props: PlayerFigure) => {
  const [isTargeted, onTarget] = useTarget();

  const dispatch = useBoardDispatchContext();

  const handleClick = () => {
    console.log('figure', {bp: props.boardPosition})
    dispatch({ type: 'SET_FIGURE_TARGETED', payload: props.boardPosition });
    onTarget();
  };
  return <div onClick={handleClick} className={styles.body}><Vampire style={vanillaStyles.figure}/></div>;
};





/**
 * Figure styles
 * tailwind
 * vanilla
 */

const styles = {
  body: 'border-2 border-gray-600 bg-yellow-500 z-20',
};

const vanillaStyles = {
  body: {
    width: 35,
    height: 35
  },
  figure: {
    width: 35,
    height: 35
  }
}
