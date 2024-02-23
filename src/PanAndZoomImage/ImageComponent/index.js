import React, {forwardRef} from 'react';
export default forwardRef(({position, src, onLoad, onMouseDown, onWheel}, containerRef) => {
    
    return ( <div
      className="PanAndZoomImage-container"
      ref={containerRef}
      onMouseDown={onMouseDown}
      onWheel={onWheel}
    >
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${position.z})`,
        }}
      >
        <img
          className="PanAndZoomImage-image"
          alt="floorplan"
          src={src}
          onLoad={onLoad}
        />
      </div>
    </div>
    )
});