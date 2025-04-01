export const getCurrentAngle = (
  element: HTMLDivElement,
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
  const { x, y, width, height } = element.getBoundingClientRect();
  const { clientX, clientY } = event;

  const centerX = x + width / 2;
  const centerY = y + height / 2;

  const oppositeSide = centerY - clientY;
  const adjacentSide = centerX - clientX;

  const currentRadianAngle = Math.atan2(oppositeSide, adjacentSide);

  return (currentRadianAngle * 180) / Math.PI;
};

export const TICK_ANGLES = [45, 22.5, 0, -22.5, -45];

export const getClosestValidAngle = (angle: number): number => {
  let minIdx = 0;
  let min = Math.abs(TICK_ANGLES[0] - angle);

  for (let i = 1; i < TICK_ANGLES.length; ++i) {
    const currDiff = Math.abs(TICK_ANGLES[i] - angle);
    if (currDiff < min) {
      min = currDiff;
      minIdx = i;
    }
  }

  return minIdx;
};
