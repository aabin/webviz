// @flow
//
//  Copyright (c) 2018-present, GM Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.
export default `
  precision mediump float;

  uniform mat4 projection, view;

  #WITH_POSE

  uniform float angle_min;
  uniform float angle_increment;
  uniform float range_min;
  uniform float range_max;

  attribute float index;
  attribute float range;
  attribute float intensity;

  varying vec4 vColor;

  void main () {
    float angle = angle_min + index * angle_increment;
    vec3 p = applyPose(vec3(range * cos(angle), range * sin(angle), 0));

    gl_Position = projection * view * vec4(p, 1);
    gl_PointSize = 4.;

    if (range < range_min || range > range_max || intensity == 0.0) {
      gl_PointSize = 0.;
    } else {
      vColor = vec4(0.5, 0.5, 1, 1);
    }
  }
`;
