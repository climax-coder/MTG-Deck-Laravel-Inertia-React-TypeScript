import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import BackgroundImage from "@/Components/Common/BackgroundImage";

export default function Dashboard({ auth }: PageProps) {
    return (
        <div className="relative min-h=[88vh]">
            <Head title="Dashboard" />
            <BackgroundImage className="bg-dashboard" />
        </div>
    );
}
