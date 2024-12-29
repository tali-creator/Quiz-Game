/* eslint-disable react/prop-types */
import QuestionNavigation from "./QuestionNavigation";

export default function Questions({
  toggle,
  handleNext,
  handleBack,
  questions,
  handleScore,
  handleFinish,
  
})

{
  
  if (!questions) {
    return 
  }

  return (
    <div className="w-full my-10 flex flex-col items-center justify-center">
      <h1 className="text-3xl pb-4">Question {questions.id}</h1>
      <div className="border p-5 rounded-2xl space-y-5 flex-col flex items-center">
        <h2 className="font-black text-wrap text-center">
          {questions.questionText}
        </h2>
        <div className=" w-full md:w-3/4 lg:w/1/2 gap-5  grid grid-cols-12">
          {questions.options &&
            questions.options.map((option, index) => (
              <div
                key={`${questions.id}-${index}`}
                className="flex hover:text-blue-400 px-3 py-1 space-x-5 col-span-12 md:col-span-6 text-sm font-bold md:text-base items-center">
                <input
                  type="radio"
                  id={`${questions.id}-${index}`}
                  name={`question-${questions.id}`}
                  className="cursor-pointer"
                  value={option}
                  onClick={(e) => handleScore(e)}
                />
                <label
                  htmlFor={`${questions.id}-${index}`}
                  className="cursor-pointer w-full">
                  {option}
                </label>
              </div>
            ))}
        </div>
      </div>
      <QuestionNavigation
        toggle={toggle}
        handleNext={handleNext}
        handleBack={handleBack}
        handleFinish={handleFinish}
        tracker={questions.id}
      />
    </div>
  );
}
