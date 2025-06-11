"use client";

import { useState } from 'react'; 
export const History = () => {
    
    const [userHistory, setUserHistory] = useState([]);

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">History</h2>
            <p className="text-gray-600 dark:text-gray-400">Your recent activities will be displayed here.</p>  
            <div className="mt-4">
                {userHistory.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
                        {userHistory.map((item, index) => (
                            <li key={index} className="text-gray-700 dark:text-gray-300">
                                {item}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No history available.</p>
                )}          
        </div>
        </div>
    )
}