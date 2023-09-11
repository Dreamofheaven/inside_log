// import React from 'react'
// import '../css/Tree.css'

// function Tree({applePositions}) {
//   return (
//     <div className='tree'>
//       {applePositions.map((position, index)=>(
//         <div key = {index} className="apple" style ={{left:position.x,top:position.y}}></div>
//       ))}
//       <img src='/images/real-tree.png'></img>
//     </div>
//   )
// }

// export default Tree


import React from 'react'
import '../css/Tree.css'

function Tree() {
  return (
    <div className='tree'>
      <img src='/images/real-tree.png'></img>
    </div>
  )
}

export default Tree
