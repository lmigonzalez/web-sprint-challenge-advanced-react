import React, {useState} from 'react'

export default function AppFunctional(props) {

const coordinates = [
  ['1, 1'], ['2, 1'], ['3, 1'],
  ['1, 2'], ['2, 2'], ['3, 2'],
  ['1, 3'], ['2, 3'], ['3, 3']
];

const grid = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const initialValues = {
   initialMSG: '',
   initialPos: grid[4],
   initialMove: 0,
   initialCoord: coordinates[4]
}


const [pos, setPos] = useState(initialValues.initialPos);
const [errorMsg, setErrorMsg] = useState(initialValues.initialMSG);
const [moved, setMoved] = useState(initialValues.initialMove);
const [coord, setCoord] = useState(initialValues.initialCoord)

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
  
  if(pos + 1 === 4 || pos + 1 === 7 || pos + 1 === 10){
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
 




 
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({coord})</h3>
        <h3 id="steps">You moved {moved} times</h3>
      </div>
      <div id="grid">
        {
          grid.map((element, index)=>{
          //  console.log(JSON.stringify(element) === JSON.stringify(pos))

          // const newStyle = JSON.stringify(element) === JSON.stringify(pos) ? 'square active': 'square';
          // setStyle(newStyle)
         
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
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}


  {/* <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square active">B</div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div> */}