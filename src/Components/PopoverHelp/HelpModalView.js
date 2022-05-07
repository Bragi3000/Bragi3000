import {
  ArrowSquareRight,
  XCircle,
} from "phosphor-react";
/**
 * View for the help modal.
 * @param isOpen - Whether the modal is open or not.
 * @param closeHelp - Function to close the modal.
 * @param nextHelp Function to go to the next help page.
 */
const ModalView = function ({isOpen, closeHelp, nextHelp}) {
  return (isOpen &&
    <>
      <div
        className="p-4 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto mx-auto max-w-2xl">
          <div
            className="border-0 bg-green-600 text-[#000] rounded-lg shadow-lg flex flex-col w-full">
            <div className="flex items-start justify-between  border-solid">
              <h3 className="text-3xl p-5 font-semibold">
                Interactive Help
              </h3>
            </div>
            <div className="relative p-5 flex-auto">
              <p className="my-4 text-lg">
                Everyone wants to hear their favorite songs.
                The idea behind this application is to give each person a chance to hear their favorite song.
                You have to win a game to add your song to the playlist.
                A bragi3000 playlist will be created automatically for you.
                <br/><br/>
                Use your arrow keys or arrow buttons to navigate through the interactive help and learn about all
                the features of the application.
              </p>
            </div>
            <div
              className="flex justify-between p-2">
              <button
                className="bg-transparent hover:scale-110 p-2 float-right w-20"
                onClick={closeHelp}>
                <XCircle/>
              </button>
              <button onClick={nextHelp}
                className="bg-transparent hover:scale-110 w-16">
                <ArrowSquareRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalView;
