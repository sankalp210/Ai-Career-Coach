import { AiToolCard } from "./AiToolCard";

export const AiTools = () => {

    const aiToolsList = [
        {
            name:'AI Career Q&A Chat', 
            description: 'Ask questions about AI careers and get expert advice.',
            icon: '/ai_chatbot.png',
            path: '/ai-chat',
            button: 'Lets Chat',
        },
        {
            name: 'Career Roadmap Generator',
            description: 'Generate personalized career roadmaps based on your skills and interests.',
            icon: '/roadmap_generator.png',
            path: '/roadmap-generator',
            button: 'Generate Roadmap',
        },
        {
            name: 'Cover Letter Generator',
            description: 'Create tailored cover letters for job applications.',
            icon: '/cover_letter_generator.png',
            button: 'Generate Cover Letter',
            path: '/cover-letter-generator',
        },
        {
            name: 'AI Resume Analyzer',
            description: 'Analyze your resume with AI to improve its effectiveness.',
            icon: '/resume_analyzer.png',
            button: 'Analyze Resume',
            path: '/resume-analyzer',
        },        
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiToolsList.map((tool, index) => (
                <AiToolCard key={index} tool={tool} />
            ))}
        </div>
    )
}