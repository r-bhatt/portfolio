function throttle<T extends unknown>(cb: (...args: T[]) => void, delay = 100) {
  let waiting = false;
  let waitingArgs: T[] | null = null;

  return function throttled(...args: T[]) {
    if (waiting) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    waiting = true;
    setTimeout(() => {
      waiting = false;
      if (waitingArgs) {
        const executedArgs = waitingArgs;
        waitingArgs = null;
        return throttled(...executedArgs);
      }
    }, delay);
  };
}

export default throttle;
