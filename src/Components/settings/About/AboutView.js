/**
 * Settings section showing information about Bragi 3000.
 * This view is only meant to be used by the presenter.
 * @returns The view for the component
 */
const AccountSettingsView = function () {
  return (
    <div className="my-10">
      <h1 className="text-3xl mb-3">About us</h1>
      <p className="mb-3">
        Bragi 3000 was developed with ♡ by{" "}
        <a
          className="text-green-400 hover:underline"
          href="https://github.com/Atema"
        >
          Martijn Atema
        </a>
        ,{" "}
        <a className="text-green-400 hover:underline" href="https://nikolim.de">
          Nikolai Limbrunner
        </a>
        , and{" "}
        <a
          className="text-green-400 hover:underline"
          href="https://github.com/vanFrZy"
        >
          Frederick van der Windt
        </a>
        .
      </p>
      <p>
        Also check out{" "}
        <a
          className="text-green-400 hover:underline"
          href="https://github.com/Bragi3000/Bragi3000"
        >
          our GitHub repository
        </a>{" "}
        for the source code!
      </p>
    </div>
  );
};

export default AccountSettingsView;
