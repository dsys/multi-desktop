import React from 'react';

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     isOpen: false
    };
  }

  open = () =>{
    console.log('OPEN')
    const {isOpen} = this.state;
    if(!isOpen){
      this.setState({isOpen:true});
    }
  }

  close = () =>{
    const {isOpen} = this.state;
    if(isOpen){
      this.setState({isOpen:false});
    }
  }

  handleOptionClick = (child, ...args)=>{
    const {onSelect} = this.props;
    this.close();
    onSelect(child.props.value);
  }

  handleKeyDown = (e) =>{
    const keycodeMappings = {
      ArrowDown: this.open,
      ArrowUp: this.open,
      " ": this.open
    }
    const keycodeAction = keycodeMappings[e.nativeEvent.code];
    console.log(e.nativeEvent.code);
    if(keycodeAction){
      console.log('keycode action found');
      keycodeAction();
    }
  }

  getSelectedChild = () => {
    const {selectedValue, children} = this.props;
    return React.Children.toArray(children).find((child)=>{
      return child.props.value === selectedValue;
    })
  }

  renderAllChildren = () =>{
    const {selectedValue, onSelect, children} = this.props;
    return React.Children.map(children, (child)=>{
      const childProps = {
        ...child.props,
        isSelected: child.props.value === selectedValue,
        onClick: (...args)=>{
          this.handleOptionClick(child)
          if(child.props.onClick){
            child.props.onClick(...args)
          }
        }
      }

      const childComponent = React.cloneElement(child, childProps);
      return childComponent;
    })
  }

  renderSelectedChild = () => {
    return this.getSelectedChild();
  }

  render(){
    const { isOpen } = this.state;
    const {selectedValue, onSelect, children} = this.props;
    return(
      <div tabIndex={0} onKeyDown={this.handleKeyDown} onClick={this.open}>
        {
          isOpen ? this.renderAllChildren() : this.renderSelectedChild()
        }
      </div>
    );

  }
}
