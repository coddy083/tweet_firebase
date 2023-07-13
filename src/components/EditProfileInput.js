const { updateProfile } = require("firebase/auth");
const { authService } = require("firebase_init");
const { useState } = require("react");

export const EditProfileInput = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const displayNameChange = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      // update profile
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <form onSubmit={displayNameChange}>
      <input type="file" accept="image/*" />
      <input
        type="text"
        value={newDisplayName}
        onChange={(e) => setNewDisplayName(e.target.value)}
        placeholder="이름"
      />
      <input type="submit" value="프로필 업데이트" />
    </form>
  );
};
