import Navbar from "./Navbar";

export default function NestedLayout({ children }) {
    return (
        <main>
            <Navbar />
            {children}
        </main>
    );
}