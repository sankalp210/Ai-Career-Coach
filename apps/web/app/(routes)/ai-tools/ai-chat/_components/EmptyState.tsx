import { Button } from "@/components/ui/button";

export const EmptyState = ({selectedQuestion}:any) => {

    const quesionList = [
        "How to switch careers to Ui/UX design?",
        "What are the skills to become a data scientist?",
        "How to prepare for a machine learning interview?",
        "What are the best resources to learn AI?",
    ]

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <img src="/empty_state.png" alt="Empty State" className="w-24 h-24 mb-4" />
      <h2 className="text-xl font-semibold mb-2">No Chats Yet</h2>
      <p className="text-gray-500 text-center mb-1">
        Start a conversation by asking a question about AI careers.
      </p>
      <Button className="w-full max-w-md">+ Ask a Question</Button>
      <div className="mt-4 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">Popular Questions</h3>
        <ul className="list-disc pl-5 space-y-1">
          {quesionList.map((question, index) => (
            <li key={index} className="cursor-pointer hover:text-blue-500" onClick={() => selectedQuestion(question)}>
              {question}
            </li>
          ))}
        </ul>
      </div>  
    </div>
  );
}