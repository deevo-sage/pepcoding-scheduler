import * as React from "react";
import { useSpring, animated, config } from "react-spring";
export const Modal: React.FunctionComponent<{
  showModal: boolean;
  setshowModal: Function;
}> = ({ showModal, setshowModal, children }) => {
  const animation = useSpring({
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0)` : `translateY(-200%)`,
    config: config.gentle,
  });
  return (
    <animated.div style={animation} className="modalWrapper">
      <div>{children}</div>
    </animated.div>
  );
};
