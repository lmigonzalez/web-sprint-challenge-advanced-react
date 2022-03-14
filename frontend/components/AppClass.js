import React from 'react'
import axios from 'axios';


const grid = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const coordinates = [
  ['1, 1'], ['2, 1'], ['3, 1'],
  ['1, 2'], ['2, 2'], ['3, 2'],
  ['1, 3'], ['2, 3'], ['3, 3']
];


const initialState = {
   initialMSG: '',
   initialPos: grid[4],
   initialMove: 0,
   initialCoord: coordinates[4],
   postData:{
    'x': 2,
    'y': 2,
    'steps': 0,
    'email': ''
  }
}






export default class AppClass extends React.Component {
  
  constructor(){
    super();
    this.state = initialState;
  }


  topArrow = () =>{
  
    if(this.state.initialPos - 3 <= 0){
    this.setState({
     initialMSG: "You can't go up",
     initialPos: this.state.initialPos,
     
    })

  }
  else{
    this.setState({
      initialMSG: '',
      initialPos: this.state.initialPos - 3,
      initialCoord: coordinates[this.state.initialPos],
      initialMove: this.state.initialMove + 1
    })
   
    }
  }


  rightArrow = () =>{
  
  if(this.state.initialPos + 1 === 4 || this.state.initialPos + 1 === 7 || this.state.initialPos === 9){
    this.setState({
     initialMSG: "You can't go right",
     initialPos: this.state.initialPos
    })

  }
  else{
    this.setState({
      initialMSG: '',
      initialPos: this.state.initialPos + 1,
      initialCoord: coordinates[this.state.initialPos],
      initialMove: this.state.initialMove + 1
    })
   
    }
  }

  downArrow = () =>{
  
  if(this.state.initialPos + 3 > 9){
    this.setState({
     initialMSG: "You can't go down",
     initialPos: this.state.initialPos
    })

  }
  else{
    this.setState({
      initialMSG: '',
      initialPos: this.state.initialPos + 3,
      initialCoord: coordinates[this.state.initialPos],
      initialMove: this.state.initialMove + 1
  })
   
    }
  }


  leftArrow = () =>{
  
  if(this.state.initialPos - 1 === 0 || this.state.initialPos - 1 === 3 || this.state.initialPos - 1 === 6){
    this.setState({
     initialMSG: "You can't go left",
     initialPos: this.state.initialPos
    })

  }
  else{
    this.setState({
      initialMSG: '',
      initialPos: this.state.initialPos - 1,
      initialCoord: coordinates[this.state.initialPos],
      initialMove: this.state.initialMove + 1
  })
   
    }

  }



  reset = () => {
  this.setState({
    initialMSG: '',
    initialPos: grid[4],
    initialMove: 0,
    initialCoord: coordinates[4],
    initialMove: 0

  })
  }

  handleChange = (e) => {
  this.setState(
    prev => ({
      ...prev, postData: {...prev.postData, email: e.target.value}
    })
  )
  console.log(this.state.postData)
  }


  handleSubmit = (event) =>{
  event.preventDefault();
  axios.post('http://localhost:9000/api/result', this.state.postData)
  .then(res =>{
    console.log(res.data)
    this.setState({
      ...this.state, initialMSG: res.data.message
      
    })
    
    
  })
  .catch(error =>{
    // setErrorMsg('Ouch: email is required')
    // console.log(error)
    console.log(error)
    this.setState({
      
      ...this.state, initialMSG: 'Ouch: email is required'
      
    })
  })
}



  render() {

    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.initialCoord})</h3>
        
          <h3 id="steps">You moved {this.state.initialMove} times</h3>
        </div>
      
        <div id="grid">
         {
           grid.map((element, index)=>{
                 
            return (
            <div
            value={element} 
            key={index} 
            className= {element === this.state.initialPos ? 'square active': 'square'}> 
            
            {element === this.state.initialPos ? 'B': ''}
            
            </div>)

          })
         }
        </div>
        <div className="info">
          <h3 id="message">{this.state.initialMSG}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.leftArrow}>LEFT</button>
          <button id="up" onClick={this.topArrow}>UP</button>
          <button id="right" onClick={this.rightArrow}>RIGHT</button>
          <button id="down" onClick={this.downArrow}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.handleChange}></input>
          <input id="submit" type="submit" ></input>
        </form>
      </div>
    )
  }
  
  
}