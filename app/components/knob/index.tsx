import { useRef, useState } from "react";
import Ticks from "../ticks";
import styles from "./knob.module.css";
import clsx from "clsx";

const Knob = () => {
  const [grabbed, setGrabbed] = useState(true);
  const [knobAngle, setKnobAngle] = useState(0);

  const knobRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    console.log("down");
  };

  const handleMouseUp = () => {
    console.log("up");
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!knobRef.current) return;
    if (!grabbed) return;

    const { x, y, width, height } = knobRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;

    const centerX = x + width / 2;
    const centerY = y + height / 2;

    const oppositeSide = centerY - clientY;
    const adjacentSide = centerX - clientX;

    const currentRadianAngle = Math.atan2(oppositeSide, adjacentSide);

    const currentDegreeAngle = (currentRadianAngle * 180) / Math.PI;

    if (Math.abs(currentDegreeAngle) <= 45) setKnobAngle(currentDegreeAngle);
  };

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
        Min
      </span>
      <span className="absolute uppercase text-gray-text text-[80%] opacity-50 -left-[2.5em]">
        Max
      </span>

      <div className="grid gap-1.5">
        <Ticks activeTick={2} />
      </div>
    </div>
  );
};

export default Knob;
