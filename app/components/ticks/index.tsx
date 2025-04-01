import clsx from "clsx";
import styles from "./ticks.module.css";

const TICKS_NUMBER = 5;
const STARTING_TICK_ANGLE = -45;
const STEP_SIZE = 90 / (TICKS_NUMBER - 1);

type TTicks = {
  activeTick: number;
};

const Ticks = ({ activeTick }: TTicks) =>
  new Array(TICKS_NUMBER).fill(0).map((_, idx) => {
    return (
      <div
        key={idx}
        style={{ rotate: STARTING_TICK_ANGLE + STEP_SIZE * idx + "deg" }}
        className={clsx(
          "absolute size-full top-0 left-0 overflow-visible",
          styles.tick,
          {
            [styles.activetick]: idx === activeTick,
          }
        )}
      />
    );
  });

export default Ticks;
