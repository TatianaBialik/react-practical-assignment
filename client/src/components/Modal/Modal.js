import { closeAllModals } from '../../services/modal/modalSlice';
import { useDispatch } from 'react-redux';

export default function Modal(props) {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeAllModals())
  }

  return (
    <div 
      className={`modal ${props.isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__box">
        <h2 className="modal__title">{ props.name }</h2>
        <button
          type='button' 
          className="modal__close-button" 
          aria-label='Close' 
          onClick={handleCloseModal} />
        {props.children}
      </div>
    </div>
  )
}