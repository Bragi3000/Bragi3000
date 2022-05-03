import { RadioGroup } from "@headlessui/react";
import cx from "Utils/classNames";
import { SpeakerHigh as SoundIcon } from "phosphor-react";

/**
 * A list of Spotify devices from which the active device can be chosen.
 * This view is only meant to be used by the presenter.
 * @param devices List of devices to show
 * @param activeDeviceId Id of the currently active device
 * @param onSelectDeviceId Event fired when a device a selected
 * @returns The view for the component
 */
const DeviceSelectorView = function ({
  devices = [],
  activeDeviceId,
  onSelectDeviceId = (deviceId) => {},
}) {
  return (
    <div className="w-72 max-h-96 overflow-auto">
      <RadioGroup value={activeDeviceId} onChange={onSelectDeviceId}>
        <RadioGroup.Label>
          <h1 className="text-xl text-center p-4 pb-2">Devices</h1>
        </RadioGroup.Label>

        {devices.map((device) => (
          <RadioGroup.Option key={device.id} value={device.id}>
            {({ checked }) => (
              <div
                className={cx([
                  "px-5 space-x-3 cursor-pointer hover:bg-gray-800 flex items-center",
                  checked && "text-green-400",
                ])}
              >
                <span className="py-3 flex-auto">{device.name}</span>
                {checked ? (
                  <SoundIcon className="flex-none h-8 w-8" weight="light" />
                ) : (
                  <div className="flex-none h-8 w-8" />
                )}
              </div>
            )}
          </RadioGroup.Option>
        ))}

        {devices.length === 0 && (
          <div className="px-5 pt-3 pb-5 text-center">
            <p>No devices were found</p>
            <p className="text-gray-400">
              Please open Spotify on the device you want to use
            </p>
          </div>
        )}
      </RadioGroup>
    </div>
  );
};

export default DeviceSelectorView;
