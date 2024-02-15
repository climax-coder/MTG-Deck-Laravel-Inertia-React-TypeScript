import BackgroundImage from "@/Components/Common/BackgroundImage";
import { Head } from "@inertiajs/react";

export default function Index() {
    return (
        <div className="relative min-h-[88vh]">
            <Head title="News" />
            <BackgroundImage className="bg-news" />
            <div className="relative p-30 flex justify-center items-center min-h-[88vh]">
                <h1 className="text-3xl text-white">This is our news</h1>
            </div>
        </div>
    );
}
