import React from "react";
import Link from "next/link";
import Image from "next/image";
import BankCard from "./BankCard";

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
    const displayName = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.name?.trim() || "Guest" : "Guest";
    const displayInitial = displayName.charAt(0).toUpperCase() || "G";
    const displayEmail = user?.email || "guest@example.com";
    const displayUserName = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.name?.trim() || "Guest" : "Guest";

    return (
        <aside className="right-sidebar">
            <section className="flex flex-col pb-8">
                <div className="profile-banner" />
                <div className="profile">
                    <div className="profile-img">
                        <span className="text-5xl font-bold text-blue-500">{displayInitial}</span>
                    </div>
                    <div className="profile-details">
                        <h1 className="profile-name">{displayName}</h1>
                        <p className="profile-email">
                            {displayEmail}
                        </p>
                    </div>
                </div>
            </section>

            <section className="banks">
                <div className="flex w-full justify-between">
                    <h2 className="header-2">
                        My banks
                    </h2>
                    <Link href="/" className="flex gap-2">
                        <Image
                            src="/icons/plus.svg"
                            width={20}
                            height={20}
                            style={{ width: "auto" }}
                            alt="plus"
                        />
                        <h2 className="text-14 font-semibold text-gray-600"> Add Bank</h2>
                    </Link>
                </div>
                {banks?.length > 0 && (
                    <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
                        <div className="relative z-10">
                            <BankCard
                                key={banks[0].$id}
                                account={banks[0]}
                                userName={displayUserName}
                                showBalance={false}
                            />
                        </div>
                        {banks[1] && (
                            <div className="absolute right-0 top-8 z-0 w-[90%]">
                                <BankCard
                                    key={banks[1].$id}
                                    account={banks[1]}
                                    userName={displayUserName}
                                    showBalance={false}
                                />
                            </div>
                        )}
                    </div>
                )}
            </section>
        </aside>
    );
};

export default RightSidebar