import * as React from 'react';

export const pattern = { V: 'tatamiV', H: 'tatamiH' };

export default function TatamiPattern() {
  return (
    <defs>
      <pattern id={pattern['V']} x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="2" height="2" fill="#C3D825" />
        <path d="M-.5 1.5L1 .5L2.5 1.5" stroke="#B2C714" strokeWidth="0.5" fill="none" />
      </pattern>
      <pattern id={pattern['H']} x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="2" height="2" fill="#C3D825" />
        <path d="M1.5 -.5L.5 1L1.5 2.5" stroke="#B2C714" strokeWidth="0.5" fill="none" />
      </pattern>
    </defs>
  );
}
