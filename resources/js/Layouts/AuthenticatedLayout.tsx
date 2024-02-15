import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/Common/ApplicationLogo";
import Dropdown from "@/Components/Common/Dropdown";
import NavLink from "@/Components/Common/NavLink";
import ResponsiveNavLink from "@/Components/Common/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-[88vh] bg-gray-100 dark:bg-gray-900">
            {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
