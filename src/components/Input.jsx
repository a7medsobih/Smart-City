function Input({ label, name, type, register, options = {}, error }) {
  return (
    <div className="flex flex-col  gap-1 py-1 ">
      <label htmlFor={name} className="font-heading text-sm text-gray-500">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name, options)}
        className=" border border-gray-300 rounded-lg h-8 p-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default Input;
