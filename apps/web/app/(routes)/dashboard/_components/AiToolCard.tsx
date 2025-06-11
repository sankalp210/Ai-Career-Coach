import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';


interface AiToolCardProps {
    tool: {
        name: string;
        description: string;
        icon: string;
        path: string;
        button: string;
    };
}       

export const AiToolCard: React.FC<AiToolCardProps> = ({ tool }) => {
    return (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
            <div className="flex items-center">
                <Image src={tool.icon} alt={tool.name} width={48} height={48} className="w-12 h-12 mr-4 rounded-full" /> 
                <div>
                    <h3 className="text-lg text-gray-900 dark:text-white font-semibold">
                        {tool.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {tool.description}
                    </p>
                    <Link href={tool.path}>
                        <Button className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">{tool.button}</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

