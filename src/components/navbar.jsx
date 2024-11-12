import Image from "next/image";
    export default function NavBar({children}) {
        return (
            <>
                <header id="main-header" className="text-black fixed w-full top-0 z-50 transition-all duration-300 bg-white shadow-md">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between py-4">
                        <div className="flex items-center">
                        <Image 
                                src="/assets/images/logo.png" 
                                alt="Logo" // Tambahkan alt untuk aksesibilitas
                                width={150} // Tentukan lebar gambar
                                height={50} // Tentukan tinggi gambar
                            />
                        </div>
                            <button id="menu-toggle" className="md:hidden focus:outline-none z-50">
                                <svg id="menu-icon" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                                </svg>
                                <svg id="close-icon" className="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <nav id="main-nav" className="fixed inset-y-0 right-0 transform translate-x-full md:relative md:translate-x-0 bg-white md:bg-transparent w-64 md:w-auto h-full md:h-auto overflow-y-auto md:overflow-visible transition-transform duration-300 ease-in-out md:transition-none">
                                <ul className="pt-16 md:pt-0 px-4 md:px-0 md:flex space-y-2 md:space-y-0 md:space-x-4">
                                    <li><a href="#" className="block py-2 md:py-0 hover:text-gray-500 transition duration-200">Home</a></li>
                                    <li className="relative group">
                                        <a href="#" className="block py-2 md:py-0 hover:text-gray-500 transition duration-200 flex items-center justify-between">
                                            About
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </a>
                                        <ul className="hidden mt-2 space-y-2 bg-white text-gray-800 rounded shadow-lg md:absolute md:left-0 w-full md:w-48">
                                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 transition duration-200">Electronics</a></li>
                                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 transition duration-200">Clothing</a></li>
                                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 transition duration-200">Home & Garden</a></li>
                                            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 transition duration-200">Sports & Outdoors</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#" className="block py-2 md:py-0 hover:text-gray-500 transition duration-200">Pesanan</a></li>
                                    <li><a href="#" className="block py-2 md:py-0 hover:text-gray-500 transition duration-200">Masuk</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>
                {children}
            </>
        );
    }
