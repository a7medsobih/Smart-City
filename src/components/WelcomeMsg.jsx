import logo from '../assets/logo.jpeg'
function WelcomeMsg({ msg }) {
  return (
    <section className="flex flex-col gap-3 items-center pt-2">
      <img src={logo} alt="Website Logo" className="w-30" />
      <h2 className="font-semibold text-primary text-3xl">{msg}</h2>
      <p className="text-sm text-gray-500">Access Your Smart City Dashboard</p>
    </section>
  );
}

export default WelcomeMsg;
