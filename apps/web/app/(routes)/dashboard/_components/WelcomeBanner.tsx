import { Button } from "@/components/ui/button";

export const WelcomeBanner = () => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-lg text-gray-900 dark:text-white mb-2 font-bold text-2xl">
                Ai Career Coach Agent
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-semibold ">
                Smarter Career decidions start here.
                Discover personalized career insights, skill development paths, and AI-driven recommendations tailored to your unique profile.
            </p>
            <Button className="mt-4 bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                Get Started
            </Button>
        </div>
    );
}