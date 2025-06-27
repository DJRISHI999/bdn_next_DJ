import type { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
    title: "Bhoodhan Infratech | Projects",
    description: "Explore our real estate projects and find your dream property with Bhoodhan Infratech.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <div className="min-h-screen w-full max-w-full overflow-x-hidden">
            {children}
        </div>
    );
}