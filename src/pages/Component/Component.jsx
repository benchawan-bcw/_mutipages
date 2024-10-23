import Counter from './Counter/Counter'
import Timer from './Timer/Timer'
import Add from './Add/Add'
import Temperatures from './Temperatures/Temperatures';
import './Component.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
function Component() {
  return (
    <div className='component-container'>

      <div className='component-title'>
      <h3 className='badge bg-dark'>REACT COMPONENT</h3></div>

      <div className='component-content'>
        
        <div className='div1'>
        <Counter />
        <Timer />
        </div>

        <div className='div2'>
        <Add />
        </div>   
      </div>

      <Temperatures />

      <div className='studentName'>
      <h1 className='badge bg-dark'>เบญจวรรณ พูลทรัพย์ รหัส 66066266</h1></div>
    </div>
  );
}

export default Component;
