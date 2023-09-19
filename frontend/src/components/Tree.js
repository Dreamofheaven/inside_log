// import React from 'react';
// import '../css/Tree.css';

// function Tree({ applePositions }) {
//   return (
//     <div className='tree'>
//       <img src='/images/real-tree.png' alt='Apple Tree' />
//       <div className='apple-container'>
//         {applePositions.map((position, index) => (
//           <img key={index} src="/images/apple.png" className='apple' style={{ width: 100, marginLeft: position.x, marginTop: position.y }}  alt="나는 사과" />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Tree


import React from 'react'
import '../css/Tree.css'

function Tree() {
  const token=sessionStorage.getItem('userInfo')
  if (!token){
      window.location.href='/';
  }
  return (
    <div className='tree'>
      <img src='/images/real-tree.png'></img>
    </div>
  )
}

export default Tree
