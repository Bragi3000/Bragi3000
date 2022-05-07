const ModalView = function ({isOpen}) {
  return (isOpen &&
    <>
      <div
        className="p-4 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-2xl">
          <div
            className="border-0 bg-green-600 rounded-lg shadow-lg relative flex flex-col w-full">
            <div
              className="flex items-start justify-between p-5 border-solid">
              <h3 className="text-3xl font-semibold">
                Welcome to the interactive help of Bragi3000.
              </h3>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-lg">
                Explain what the app does and how to use the helping section.
                Use the arrow keys to navigate through the help content.
              </p>
            </div>
            <div
              className="flex items-center justify-end p-3 border-solid border-slate-200 rounded-b">
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalView;
