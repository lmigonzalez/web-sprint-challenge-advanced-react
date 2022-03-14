import React, {useState} from 'react';
import axios from 'axios';

export default function AppFunctional(props) {

const coordinates = [
  ['1, 1'], ['2, 1'], ['3, 1'],
  ['1, 2'], ['2, 2'], ['3, 2'],
  ['1, 3'], ['2, 3'], ['3, 3']
];

const grid = [1, 2, 3, 4, 5, 6, 7, 8, 9];


const initialMSG = '';
const initialPos = grid[4];
const initialMove = 0;
const initialCoord = coordinates[4];




const [pos, setPos] = useState(initialPos);
const [errorMsg, setErrorMsg] = useState(initialMSG);
const [moved, setMoved] = useState(initialMove);
const [coord, setCoord] = useState(initialCoord);

const postData = {
  'x': 2,
  'y': 2,
  'steps': 0,
  'email': ''
}

const[data, setData] = useState(postData)

const getCoord = () =>{
  setCoord(coordinates[pos])
}

const whenMoved = () =>{
  setMoved(moved + 1)
}

const topArrow = () =>{
  
  if(pos - 3 <= 0){
    setPos(pos)
    setErrorMsg("You can't go up")
  }
  else{
    setPos(pos - 3)
    setErrorMsg(initialMSG)
    whenMoved()
    getCoord()
    }
}

const rightArrow = () =>{
  
  if(pos + 1 === 4 || pos + 1 === 7 || pos + 1 === 9){
    setPos(pos)
    setErrorMsg("You can't go right")
  }
  else{
    setPos(pos + 1)
    setErrorMsg(initialMSG)
    whenMoved()
    getCoord()
    }
}


const downArrow = () =>{
  
  if(pos + 3 > 9){
    setPos(pos)
    setErrorMsg("You can't go down")
  }
  else{
    setPos(pos + 3)
    setErrorMsg(initialMSG)
    whenMoved()
    getCoord()
    }
}


 

const leftArrow = () =>{
  
  if(pos - 1 === 0 || pos - 1 === 3 || pos - 1 === 6){
    setPos(pos)
    setErrorMsg("You can't go left")
  }
  else{
    setPos(pos - 1)
    setErrorMsg(initialMSG)
    whenMoved()
    getCoord()
    }
}

const reset = () =>{
  setPos(initialPos)
  setMoved(initialMove)
  setCoord(initialCoord)
}



const handleChange = (e) =>{
 setData({...data, email: e.target.value})  
 
  console.log(e.target.value)
  console.log(data)
}



const handleSubmit = (event) =>{
  event.preventDefault();
  axios.post('http://localhost:9000/api/result', data)
  .then(res =>{
    console.log(res.data.message)
    setErrorMsg(res.data.message)
    
  })
  .catch(error =>{
    setErrorMsg('Ouch: email is required')
    console.log(error)
  })

}
 


 
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({coord})</h3>
        <h3 id="steps">You moved {moved} times</h3>
      </div>
      <div id="grid">
        {
          grid.map((element, index)=>{
                 
            return (
            <div
            value={element} 
            key={index} 
            className= {element === pos ? 'square active': 'square'}> 
            
            {element === pos ? 'B': ''}
            
            </div>)

          })
          
        }
      </div>
      <div className="info">
        <h3 id="message">{errorMsg}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={leftArrow}>LEFT</button>
        <button id="up" onClick={topArrow}>UP</button>
        <button id="right" onClick={rightArrow}>RIGHT</button>
        <button id="down" onClick={downArrow}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input id="email" value={data.email} type="email" placeholder="type email" onChange={handleChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}


