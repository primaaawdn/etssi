'use client';

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default ProductsLayout;
