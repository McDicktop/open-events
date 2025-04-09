import { useEffect } from 'react';

function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      // Если клик был за пределами элемента (и элемент существует)
      if (ref.current && !ref.current.contains(event.target)) {

        callback(); // Вызываем переданную функцию
      }
    }

    // Добавляем слушатель кликов при монтировании
    document.addEventListener('mousedown', handleClickOutside);
    
    // Удаляем слушатель при размонтировании
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]); // Зависимости для эффекта
}

export default useOutsideClick;
