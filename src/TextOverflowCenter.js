/* eslint-disable */
import React from "react";
import ReactResizeDetector from 'react-resize-detector';

import { default as colors } from "./colors";

export default class TextOverflowCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      truncatedText: props.text | ""
    };
  }

  /**
   * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
   *
   * @param {String} text The text to be rendered.
   * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
   *
   * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
   */
  getTextWidth = (text, font) => {
      // re-use canvas object for better performance
      var canvas = this.canvas || (this.canvas = document.createElement("canvas"));
      var context = canvas.getContext("2d");
      context.font = font;
      var metrics = context.measureText(text);
      return metrics.width;
  }

  getTruncatedText = (containerWidth)=>{
    const {text, font} = this.props;
    const textWidth = this.getTextWidth(text, font);
    if(textWidth<containerWidth) return text;

    const textMiddleIndex = Math.floor(text.length/2);
    let firstHalf = text.slice(0,textMiddleIndex-1);
    let secondHalf = text.slice(textMiddleIndex+1);
    let separator = '...';
    let truncatedText = `${firstHalf}${separator}${secondHalf}`;

    while(this.getTextWidth(truncatedText, font)>containerWidth){
      firstHalf = firstHalf.slice(0,firstHalf.length-1);
      secondHalf = secondHalf.slice(1);
      if(firstHalf.length<=0 && secondHalf.length<=0){
        truncatedText = "";
      } else {
        truncatedText = `${firstHalf}${separator}${secondHalf}`;
      }
    }
    return truncatedText;
  }

  setContainerRef = (element) =>{
    if(!element){return};
    const bounds = element.getBoundingClientRect();
    const truncatedText = this.getTruncatedText(bounds.width);
    if(truncatedText!=this.state.truncatedText){
      this.setState({truncatedText});
    }
  }

  handleResize = (width) =>{
    const truncatedText = this.getTruncatedText(width);
    if(truncatedText!=this.state.truncatedText){
      this.setState({truncatedText});
    }
  }

  render() {
    const { text="", font="", css="" } = this.props;
    const { truncatedText } = this.state;

    return (
      <div ref={this.setContainerRef} className="container">
        <ReactResizeDetector handleWidth onResize={this.handleResize} />
        {truncatedText}
        <style jsx>{`
          .container{
            width: 100%;
            height: 100%;
          }
          ${css};
        `}</style>
      </div>
    );
  }
}
