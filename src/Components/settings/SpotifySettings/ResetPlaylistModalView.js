import {Info as InfoIcon, X as CloseIcon} from "phosphor-react"
/**
 * Pop-up Modal for reset confirmation
 * @param onCancel method being called when canceling reset
 * @param onConfirm method being called when confirming reset
 * @constructor
 */
const ResetPlaylistModalView = ({onCancel, onConfirm}) => {
  return (
    <div id="popup-modal" tabIndex="-1"
      className="p-4 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={onCancel}>
            <CloseIcon size={24}/>
          </button>
          <div className="p-6 text-center">
            <InfoIcon size={48} className="mx-auto mb-3"/>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to reset the playlist?</h3>
            <button type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              onClick={onConfirm}>
              Yes, I'm sure
            </button>
            <button type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={onCancel}>
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ResetPlaylistModalView;
