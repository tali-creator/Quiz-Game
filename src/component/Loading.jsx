/* eslint-disable react/prop-types */

export default function Loading({toggle}) {
  return (
    <div className={`w-full h-full flex  items-center justify-center`}>
        <span className={`loader ${toggle ? "text-black" : "text-white"}`}></span>
    </div>
  )
}
