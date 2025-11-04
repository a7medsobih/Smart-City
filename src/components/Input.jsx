function Input({ label, name, type }) {
  return (
    <div className="flex flex-col  gap-1 py-1 ">
      <label htmlFor={name} className="font-heading text-primary">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        className=" border border-primary-dark rounded-lg h-8 focus:outline-primary"
      />
    </div>
  );
}

export default Input;
