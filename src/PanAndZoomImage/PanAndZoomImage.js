import React, { useEffect, useRef, useState } from 'react';
import './PanAndZoomImage.css';
import PanZoomImage from './ImageComponent'

const PanAndZoomImage = ({ src }) => {
  const [isPanning, setPanning] = useState(false);
  const [image, setImage] = useState();
  const [position, setPosition] = useState({
    oldX: 0,
    oldY: 0,
    x: 0,
    y: 0,
    z: 1,
  });

  const containerRef = useRef();

  const onLoad = (e) => {
    setImage({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight,
    });
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    setPanning(true);
    console.log(e)
    setPosition({
      ...position,
      oldX: e.clientX,
      oldY: e.clientY
    });
  };

  const onWheel = (e) => {
    if (e.deltaY) {
      const sign = Math.sign(e.deltaY) / 10;
      const scale = 1 - sign;
      const rect = containerRef.current.getBoundingClientRect();

      setPosition({
        ...position,
        x: position.x * scale - (rect.width / 2 - e.clientX + rect.x) * sign,
        y: position.y * scale - (image.height * rect.width / image.width / 2 - e.clientY + rect.y) * sign,
        z: position.z * scale,
      });
    }
  };

  useEffect(() => {
    const mouseup = () => {
      setPanning(false);
    };

    const mousemove = (event) => {
      if (isPanning) {
        setPosition({
          ...position,
          x: position.x + event.clientX - position.oldX,
          y: position.y + event.clientY - position.oldY,
          oldX: event.clientX,
          oldY: event.clientY,
        });
      }
    };

    window.addEventListener('mouseup', mouseup);
    window.addEventListener('mousemove', mousemove);

    return () => {
      window.removeEventListener('mouseup', mouseup);
      window.removeEventListener('mousemove', mousemove);
    };
  });

  return (
    <PanZoomImage ref={containerRef} position={position} src={src} onLoad={onLoad} onMouseDown={onMouseDown} onWheel={onWheel}/>
  );
};

export default PanAndZoomImage;
