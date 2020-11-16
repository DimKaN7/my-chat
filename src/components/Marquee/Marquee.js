import React, {useState, useEffect, useRef} from 'react';
import styled, {keyframes} from 'styled-components';
import './Marquee.scss';

const marqueeAnim = (offset) => keyframes`
  0% {transform: translateX(0px);}
  20% {transform: translateX(0px);}
  40% {transform: translateX(-${offset}px);}
  60% {transform: translateX(-${offset}px);}
  80% {transform: translateX(0px);}
  100% {transform: translateX(0px);}
`;

const MarqueeSpan = styled.span`
  width: 100%;
  white-space: nowrap;
  animation-name: ${props => marqueeAnim(props.offset)};
  animation-duration: 6s;
  animation-iteration-count: infinite;
`;

const Marquee = (props) => {
  const {text, style} = props;

  const marqueeRef = useRef(null);
  const spanRef = useRef(null);

  const [offset, setOffset] = useState(0);
  const [marqueeStyle, setMarqueeStyle] = useState({});

  useEffect(() => {
    if (marqueeRef) {
      // console.log(spanRef.current.offsetWidth - marqueeRef.current.clientWidth );
      const offset = spanRef.current.offsetWidth - marqueeRef.current.clientWidth > 0 
        ? spanRef.current.offsetWidth - marqueeRef.current.clientWidth 
        : 0;
      setOffset(offset);
      let marqueeStyle = {
        ...style
      }
      if (offset <= 0) marqueeStyle = {
        ...marqueeStyle,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }
      setMarqueeStyle(marqueeStyle);
    }
  }, [text]);

  return (
    <div className="marquee" ref={marqueeRef} style={marqueeStyle}>
      <div ref={spanRef}>
        <MarqueeSpan offset={offset}>{text}</MarqueeSpan>
      </div>
    </div>
  );
}

export default Marquee;