import { Slide, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export const Toast = () => {
  return (
    <ToastContainer
      autoClose={2000}
      closeOnClick
      draggable
      hideProgressBar={false}
      limit={2}
      newestOnTop={false}
      pauseOnFocusLoss
      pauseOnHover
      position={'top-right'}
      rtl={false}
      stacked
      theme={'dark'}
      transition={Slide}
    />
  )
}
