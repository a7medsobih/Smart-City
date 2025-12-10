export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="w-full max-w-sm bg-white border border-color focus:ring-3 focus:ring-primary-light focus:outline-none focus:caret-primary rounded-md px-4 py-2 lg:max-h-10 shadow-sm"
      placeholder="Search users..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
