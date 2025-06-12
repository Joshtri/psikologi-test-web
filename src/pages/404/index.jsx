import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <section className="bg-white flex items-center min-h-screen p-6">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 text-center">
                <div className="mx-auto max-w-screen-sm">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold text-primary-600 dark:text-primary-500">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 dark:text-white">Halaman tidak ditemukan</p>
                    <p className="mb-8 text-lg font-medium text-gray-500 dark:text-gray-400">Maaf, halaman yang Anda cari tidak dapat ditemukan.</p>
                    <Link to="/" className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </section>
    )
}
