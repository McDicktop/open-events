import PropTypes from "prop-types";
import CloseIcon from "../../assets/CloseIcon";

const Modal = (props) => {

  return (
    <div
      style={{
        visibility: props.show ? "visible" : "hidden",
        opacity: props.show ? "1" : "0",
        pointerEvents: props.show ? 'all' : 'none'
      }}
      className='fixed top-0 bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-sm duration-300 z-20'
    >
      <div className='absolute top-[calc(50%)] left-[calc(50%)] -translate-x-1/2 -translate-y-1/2 w-[500px] '>
        <span
          className='absolute top-4 right-4 bg-gray-200 w-6 h-6 pl-[2px] pt-[2px] rounded-lg cursor-pointer hover:bg-gray-300 duration-100 z-40'
          onClick={props.onClose}
        >
          <CloseIcon className='w-5 h-5' strokeWidth='3' />
        </span>
        <div className=''>{props.children}</div>
        {/* max-height: 30%;
        overflow: auto; */}
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;



// Profile (data, map)
// General
// Security
// Admin
// Friends
// __________
// Logout




























// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';



// const PopupComponent = () => (
//     <Popup trigger={<button>Add product</button>} position="top center">
//             <form action="" className='form'>
//             <label htmlFor="name">Product name</label>
//             <input name="name" type="text" />

//             <label htmlFor="code">Product code</label>
//             <input name="code" type="text" />

//             <label htmlFor="price">Product price</label>
//             <input name="price" type="text" />

//             <label htmlFor="quantity">Product quantity</label>
//             <input name="quantity" type="text" />

//             <button>Submit</button>
//         </form>
//     </Popup>
// )




// export default PopupComponent;