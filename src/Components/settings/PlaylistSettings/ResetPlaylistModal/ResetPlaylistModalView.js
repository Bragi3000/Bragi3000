import { Warning as WarningIcon, X as CloseIcon } from "phosphor-react";

/**
 * Pop-up Modal for reset confirmation
 * @param onCancel method being called when canceling reset
 * @param onConfirm method being called when confirming reset
 */
const ResetPlaylistModalView = ({ onCancel, onConfirm }) => {
  return (
    <div
      tabIndex="-1"
      className="p-4 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative rounded-lg bg-gray-700 shadow-lg shadow-gray-900">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
            onClick={() => {
              onCancel();
            }}
          >
            <CloseIcon size={24} />
          </button>
          <div className="p-6 text-center">
            <WarningIcon size={48} className="mx-auto mb-3" />
            <h3 className="mb-5 text-lg font-normal text-gray-400">
              Are you sure you want to reset the playlist?
            </h3>
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              onClick={() => {
                onConfirm();
              }}
            >
              Yes, I'm sure
            </button>
            <button
              type="button"
              className="focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
              onClick={() => {
                onCancel();
              }}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPlaylistModalView;
