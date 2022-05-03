import { Popover, Transition } from "@headlessui/react";
import { useState } from "react";
import { usePopper } from "react-popper";
import cx from "Utils/classNames";

/**
 * An icon with an openable popover in the controlbar.
 * This view is only meant to be used by the presenter.
 * @param icon Icon component to show in control bar
 * @param children Component to show in the popover
 * @returns The view for the component
 */
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
              open ? "text-green-400" : "hover:text-gray-400",
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
              <div className="overflow-hidden m-2 mb-5 rounded-xl ring-1 ring-gray-700 bg-gray-900 shadow-lg shadow-gray-900">
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
