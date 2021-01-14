import { useState } from 'react';

/**
 * useTarget hook
 * implements entity after target behavior
 */

export type UseTarget = () => [boolean, () => void];


/**
 * inner functions / hooks
 */

type OnTarget = () => void;


/**
 * impl
 */

export const useTarget: UseTarget = () => {
  const [isTargeted, setShowIsTargeted] = useState(false);

  const onTarget: OnTarget = () => {
    console.log(isTargeted ? 'already targeted' : 'new target');
    setShowIsTargeted(isTargeted ? false : true);
  };

  return [isTargeted, onTarget];
};
