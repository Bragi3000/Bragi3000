/**
 * Settings section showing configuration for the Firebase account.
 * This view is only meant to be used by the presenter.
 * @param email Email of the logged-in user
 * @param uid Unique ID of the logged-in user
 * @param onLogout Event fired when the 'log out' button is pressed
 * @returns The view for the component
 */
const AccountSettingsView = function ({ email, uid, onLogout }) {
  return (
    <div className="my-10">
      <h1 className="text-3xl mb-3">Your account</h1>
      <p>
        <span className="font-bold">Email:</span> <span>{email}</span>
      </p>
      <p>
        <span className="font-bold">Unique ID (for debugging):</span>{" "}
        <span>{uid}</span>
      </p>
      <p className="mt-3">
        <button className="text-green-400 hover:underline" onClick={() => onLogout()}>
          Log out
        </button>
      </p>
    </div>
  );
};

export default AccountSettingsView;
