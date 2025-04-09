import popupStyles from "./custom-popup.module.css";
import PropTypes from "prop-types";


const Modal = (props) => {

  return (
    <div
      style={{
        visibility: props.show ? "visible" : "hidden",
        opacity: props.show ? "1" : "0",
        pointerEvents: props.show ? 'all' : 'none',
        zIndex: 20
      }}
      className={popupStyles.overlay}
    >
      <div className={popupStyles.popup}>
        <h2>{props.title}</h2>
        <span className={popupStyles.close} onClick={props.onClose}>
          &times;
        </span>
        <div className={popupStyles.content}>{props.children}</div>
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