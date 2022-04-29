import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { usePopper } from "react-popper";
import cx from "Utils/classNames";

const PopoverIconView = function ({ icon, children }) {
  const [buttonRef, setButtonRef] = useState();
  const [panelRef, setPanelRef] = useState();
  const { styles, attributes } = usePopper(buttonRef, panelRef, {
    placement: "top",
  });

  return (
    <Popover className="flex-none">
      {({ open }) => (
        <>
          <Popover.Button
            ref={setButtonRef}
            className={cx([
              "block",
              open ? "text-green-400" : "hover:text-main-400",
            ])}
          >
            {icon}
          </Popover.Button>

          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              ref={setPanelRef}
              style={styles.popper}
              {...attributes.popper}
            >
              <div className="overflow-hidden m-2 mb-5 rounded-xl ring-1 ring-main-700 bg-main-900 shadow-lg shadow-main-900">
                {children}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default PopoverIconView;
