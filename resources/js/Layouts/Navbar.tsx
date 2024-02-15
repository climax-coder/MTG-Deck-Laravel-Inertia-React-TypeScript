import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/Common/ApplicationLogo";
import Dropdown from "@/Components/Common/Dropdown";
import NavLink from "@/Components/Common/NavLink";
import ResponsiveNavLink from "@/Components/Common/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { FaBox, FaFlask, FaNewspaper, FaSearch } from "react-icons/fa";
import { BiSolidCube } from "react-icons/bi";

interface NavbarProps {
    auth: PageProps["auth"];
}

const Navbar: React.FC<NavbarProps> = ({ auth }) => {
    const user = auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <nav className="bg-gray-900 dark:bg-gray-800 border-b border-gray-800 dark:border-gray-700 sticky z-[99] top-0">
            <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="flex justify-between h-14">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/">
                                <div className="flex">
                                    <ApplicationLogo className="block h-9 text-gray-600" />
                                    <h1 className="hidden sm:flex my-auto mx-3 text-gray-200 text-xl">
                                        Magic Game
                                    </h1>
                                </div>
                            </Link>
                        </div>

                        <div className="hidden sm:flex sm:space-x-5 sm:ml-5">
                            <div
                                className={`flex pt-1 items-center text-gray-300 cursor-pointer border-b-2 border-transparent hover:text-gray-100 hover:border-gray-100 ${
                                    route().current("decks.all") ||
                                    route().current("decks.sandbox") ||
                                    route().current("decks.index")
                                        ? "!border-indigo-400"
                                        : ""
                                }`}
                            >
                                <Dropdown>
                                    <Dropdown.Trigger>Decks</Dropdown.Trigger>
                                    <Dropdown.Content align="left">
                                        <Dropdown.Link
                                            href={route("decks.all")}
                                        >
                                            <div className="flex">
                                                <FaSearch className="my-auto" />
                                                <span className="px-3">
                                                    All Decks
                                                </span>
                                            </div>
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("decks.sandbox")}
                                        >
                                            <div className="flex">
                                                <FaFlask className="my-auto" />
                                                <span className="px-3">
                                                    Deck Sandbox
                                                </span>
                                            </div>
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("decks.index")}
                                        >
                                            <div className="flex">
                                                <FaBox className="my-auto" />
                                                <span className="px-3">
                                                    My Decks
                                                </span>
                                            </div>
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>

                            <NavLink
                                href={route("cards")}
                                active={route().current("cards")}
                            >
                                Cards
                            </NavLink>

                            <NavLink
                                href={route("news")}
                                active={route().current("news")}
                            >
                                News
                            </NavLink>
                        </div>

                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* Right side of Navbar */}
                    <div className="flex items-center ml-6">
                        {user ? (
                            // User Dropdown Menu
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-300 hover:text-gray-100 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        ) : (
                            // Login and Register Links
                            <>
                                <Link
                                    href={route("login")}
                                    className="text-sm text-gray-300 underline hover:text-gray-100"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="ml-4 text-sm text-gray-300 underline hover:text-gray-100"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`${
                    showingNavigationDropdown ? "block" : "hidden"
                } sm:hidden`}
            >
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink
                        href={route("decks.all")}
                        onClick={() => setShowingNavigationDropdown(false)}
                        active={route().current("decks.all")}
                    >
                        <FaSearch className="mt-1 mr-3" /> All Decks
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route("decks.sandbox")}
                        onClick={() => setShowingNavigationDropdown(false)}
                        active={route().current("decks.sandbox")}
                    >
                        <FaFlask className="mt-1 mr-3" /> Sandbox
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route("decks.index")}
                        onClick={() => setShowingNavigationDropdown(false)}
                        active={route().current("decks.index")}
                    >
                        <FaBox className="mt-1 mr-3" /> My Decks
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route("cards")}
                        onClick={() => setShowingNavigationDropdown(false)}
                        active={route().current("cards")}
                    >
                        <BiSolidCube className="mt-1 mr-3" />
                        All card packages
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route("news")}
                        onClick={() => setShowingNavigationDropdown(false)}
                        active={route().current("news")}
                    >
                        <FaNewspaper className="mt-1 mr-3" /> News
                    </ResponsiveNavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
