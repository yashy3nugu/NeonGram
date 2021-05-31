import { useCallback, useRef, useEffect} from 'react'

const useClickOutsideListener = (onClose) => {
    const ref = useRef(null);

    const escapeListener = useCallback((e) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }, [onClose])
      const clickListener = useCallback(
        (e) => {
              
        if (ref.current && !(ref.current).contains(e.target)) {
                onClose && onClose()
        }
            
          
        },
        [onClose],
      )

      useEffect(() => {
        document.addEventListener('click', clickListener)
        document.addEventListener('keyup', escapeListener);

        return () => {
            document.removeEventListener('click', clickListener)
            document.removeEventListener('keyup', escapeListener)
        }
      })

      return ref;
}

export default useClickOutsideListener
