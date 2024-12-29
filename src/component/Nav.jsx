// eslint-disable-next-line react/prop-types
export default function Nav({ theme, toggle }) {
  return (
    <div className="flex justify-between px-5 w-full">
      <h1 className="font-bold">Quiz game</h1>
      <div className="flex space-x-10 font-bold">
      <button
        onClick={theme}
        className={`${
          toggle ? "fa fa-moon" : "fa fa-sun"
        }  hover:cursor-pointer hover:text-blue-500 rounded-full w-5 h-5`}></button>
      </div>
    </div>
  );
}
