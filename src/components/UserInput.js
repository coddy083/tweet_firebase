export const UserInput = ({ type, placeholder, value, setValue }) => {
  return (
    <input
      className="p-3 w-96"
      type={type}
      placeholder={placeholder}
      required
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
