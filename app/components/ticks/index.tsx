import clsx from "clsx";
import styles from "./ticks.module.css";
import { TICK_ANGLES } from "../knob/util";

type TTicks = {
  activeTick: number;
};

const Ticks = ({ activeTick }: TTicks) =>
  TICK_ANGLES.map((angle, idx) => (
    <div
      key={angle}
      style={{ rotate: angle + "deg" }}
      className={clsx(
        "absolute size-full top-0 left-0 overflow-visible",
        styles.tick,
        {
          [styles.activetick]: idx === activeTick,
        }
      )}
    />
  ));

export default Ticks;
