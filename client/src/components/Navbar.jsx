import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className=" bg-zinc-700 flex justify-between px-20 py-2">
      <Link to={"/"}>
        <h1 className="transition duration-300 text-zinc-400 hover:text-white font-semibold">React MySQL</h1>
      </Link>
      <ul className="flex gap-2">
        <li>
          <Link className="transition duration-300 text-zinc-400 hover:text-white" to={"/"}>
            Home
          </Link>
        </li>
        <li>
          <Link className="transition duration-300 text-zinc-400 hover:text-white" to={"/new"}>
            Create task
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
