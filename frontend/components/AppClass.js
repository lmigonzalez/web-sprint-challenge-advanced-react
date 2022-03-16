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


  // getCoord = (position) =>{
  //   // setCoord(coordinates[position])
  //   this.setState({

  //   })
  // }


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
      initialCoord: coordinates[this.state.initialPos - 4],
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
      initialCoord: coordinates[this.state.initialPos + 2],
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
      initialCoord: coordinates[this.state.initialPos - 2],
      initialMove: this.state.initialMove + 1
  })
   
    }

  }

  resetEmail = () =>{
    this.setState({postData: {...this.state.postData, email: ''}});
  
  }


  reset = () => {
  this.setState({
    initialMSG: '',
    initialPos: grid[4],
    initialMove: 0,
    initialCoord: coordinates[4],
    postData: {email: ''}
    // postData: {...this.state.postData, email: ''}
  })
  
  }



  handleChange = (e) => {
    
  this.setState({
      ...this.state, postData: {...this.state.postData, email: e.target.value, steps: this.state.initialMove, x: parseInt(this.state.initialCoord[0].split('')[0]), y: parseInt(this.state.initialCoord[0].split('')[this.state.initialCoord[0].length - 1])}
    })
  
 
  }

//  validateEmail = (email) =>{
//   if(email === ''){
//     this.setState({
//       ...this.state, initialMSG: 'Ouch: email is required'
//     })
//   }
//   // else if(email === 'foo@bar.baz'){
//   //   this.setState({
//   //     ...this.state, initialMSG: 'foo@bar.baz failure #71'
//   //   })
//   // }
//   else{
//     this.setState({
//       ...this.state, initialMSG: 'Ouch: email must be a valid email'
//     })
//   }
//  }


  handleSubmit = (event) =>{
  event.preventDefault();
  // console.log(this.state)
  axios.post('http://localhost:9000/api/result', this.state.postData)
  .then(res =>{
  
    this.setState({
      ...this.state, initialMSG: res.data.message,
      postData: {...this.state.postData, email: ''}
      
    })
    
    
  })
  .catch(error =>{

  
    this.setState({
      ...this.state, initialMSG: error.response.data.message,
      
      postData: {...this.state.postData, email: ''}
      
    })

 })


  // this.setState({
  //   initialPos: grid[4],
  //   initialMove: 0,
  //   initialCoord: coordinates[4],
  
  // })
  }
 



  render() {

    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.initialCoord})</h3>
        
          <h3 id="steps">You moved {this.state.initialMove} {this.state.initialMove === 1? 'time': 'times'}</h3>
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
          <input id="email" type="email" value={this.state.postData.email} placeholder="type email" onChange={this.handleChange}></input>
          <input id="submit" type="submit" ></input>
        </form>
      </div>
    )
  }
  
  
}