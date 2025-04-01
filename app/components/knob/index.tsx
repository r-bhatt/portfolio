import { useRef, useState } from "react";
import Ticks from "../ticks";
import styles from "./knob.module.css";
import clsx from "clsx";
import throttle from "~/utils/throttle";
import { getClosestValidAngle, getCurrentAngle, TICK_ANGLES } from "./util";

const Knob = () => {
  const [grabbed, setGrabbed] = useState(false);
  const [knobAngle, setKnobAngle] = useState(TICK_ANGLES[0]);
  const [activeTick, setActiveTick] = useState(0);

  const knobRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setGrabbed(true);
  };

  const handleMouseUp = () => {
    setGrabbed(false);
    setKnobAngle(() => TICK_ANGLES[activeTick]);
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = throttle(
    (e) => {
      if (!knobRef.current) return;
      if (!grabbed) return;

      const currentAngle = getCurrentAngle(knobRef.current, e);
      if (Math.abs(currentAngle) > 45) return;

      setKnobAngle(currentAngle);
      setActiveTick(getClosestValidAngle(currentAngle));
    },
    250
  );

  return (
    <div
      ref={knobRef}
      className={clsx(
        "w-[14em] aspect-square rounded-full relative m-[5em] border-light-gray border-[0.25em]",
        styles.knob_surround
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div
        id="knob"
        style={{ rotate: knobAngle + "deg" }}
        className={clsx("absolute size-full", styles.knob)}
      ></div>

      <span className="absolute uppercase text-gray-text text-[80%] opacity-50 bottom-[1em] -left-[2.5em]">
        About
      </span>
      <span className="absolute uppercase text-gray-text text-[80%] opacity-50 -left-[2.5em]">
        Experience
      </span>

      <div className="grid gap-1.5">
        <Ticks activeTick={activeTick} />
      </div>
    </div>
  );
};

export default Knob;
