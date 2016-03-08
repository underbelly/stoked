/* @flow */
'use strict';
import React from 'react-native';
import GL from "gl-react";

const shaders = GL.Shaders.create({
  AnimatedProgress: {
    frag: `
      precision mediump float;
      varying vec2 uv;
      uniform vec4 colorInside, colorOutside;
      uniform float radius;
      uniform float progress;
      uniform vec2 dim;
      const vec2 center = vec2(0.5);
      const float PI = acos(-1.0);
      void main () {
        vec2 norm = dim / min(dim.x, dim.y);
        vec2 p = uv * norm - (norm-1.0)/2.0;
        vec2 delta = p - center;
        float inside =
          step(length(delta), radius) *
          step((PI + atan(delta.y, - 1.0 * delta.x)) / (2.0 * PI), progress);
        gl_FragColor = mix(
          colorOutside,
          colorInside,
          inside
        );
      }
    `
  }
});

const AnimatedProgress = GL.createComponent(
  ({
    width,
    height,
    progress,
    colorInside,
    colorOutside,
    radius
  }) =>
  <GL.Node
    shader={ shaders.AnimatedProgress }
    uniforms={{
      dim: [ width, height ],
      progress,
      colorInside,
      colorOutside,
      radius
    }}
  />,
  {
    displayName: 'AnimatedProgress',
    defaultProps: {
      colorInside: [0, 0.78, 0.45, 1],
      colorOutside: [0, 0, 0, 1],
      radius: 1
    }
})

export default AnimatedProgress;
