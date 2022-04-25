const SpotifySettingsView = function ({
  token,
  expireStamp,
  onLink,
  onUnlink,
}) {
  return (
    <div className="my-10">
      <h1 className="text-3xl mb-3">Spotify</h1>
      {!token && (
        <p className="mb-3 text-red-500">
          To use Bragi 3000, you need to login with a Spotify account
        </p>
      )}
      {token && expireStamp < Date.now() && (
        <p className="mb-3 text-red-500">
          Your Spotify token has expired. To keep using Bragi 3000, you need to
          re-link your Spotify account.
        </p>
      )}
      {token && expireStamp && (
        <>
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="font-bold">Access token (for debugging):</span>{" "}
            <span>{token}</span>
          </p>
          <p>
            <span className="font-bold">Expires:</span>{" "}
            <span>
              {new Intl.DateTimeFormat("en-SE", {
                dateStyle: "long",
                timeStyle: "short",
              }).format(expireStamp)}
            </span>
          </p>
        </>
      )}
      <p className="mt-3">
        <button
          className="text-green-400 hover:underline"
          onClick={() => onLink()}
        >
          {`${token ? "Re-link" : "Link"} your Spotify account`}
        </button>
        {token && (
          <>
            <br />
            <button
              className="text-green-400 hover:underline"
              onClick={() => onUnlink()}
            >
              {`Un-link your Spotify account`}
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default SpotifySettingsView;
