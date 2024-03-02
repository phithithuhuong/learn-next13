import React from "react";

export const metadata = {
    title: "Detail ",
    description: "bla blaaa...."
};
export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return <>
        {children}
    </>

}