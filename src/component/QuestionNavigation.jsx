// eslint-disable-next-line react/prop-types
export default function QuestionNavigation({ toggle, handleNext, handleBack ,tracker, handleFinish}) {
  return (
    <div className="flex justify-around py-3 w-full">
      <button
      onClick={handleBack}
        className={`border-2 text-center ${  toggle ? "hover:text-white hover:bg-black/80" : "hover:bg-white hover:text-black/80" } rounded-lg px-2 font-black `}>
        back {tracker -1}
      </button>
      <button
      onClick={handleFinish}
        className={`border-2 text-center ${  toggle ? "hover:text-white hover:bg-black/80" : "hover:bg-white hover:text-black/80" } rounded-lg px-2 font-black `}>
        Finish {tracker}
      </button>
      <button
      onClick={handleNext}
        className={`border-2 text-center ${  toggle ? "hover:text-white hover:bg-black/80" : "hover:bg-white hover:text-black/80" } rounded-lg px-2 font-black `}>
        next {tracker + 1}
      </button>
    </div>
  );
}
