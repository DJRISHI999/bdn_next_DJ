import type {Metadata} from "next"
import { ReactNode } from 'react'
export const metadata: Metadata = {
  title: "Bhoodhan Infratech | Project Details",
  description: "Explore detailed information about our real estate projects.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
