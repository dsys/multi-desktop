import React from 'react';
import { default as colors } from './colors';


export default (
  <style jsx global>{`
    .screen-container {
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      padding: 10px;
      box-sizing: border-box;

      font-family: Roboto;
      background-color: ${colors.blue2};
    }
    ::selection {
      background: #BC5D29;
    }
  `}</style>
)
