export default function Ownership() {
    return (
        <main className="min-h-screen bg-[#faf8f3] px-6 py-20">
            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <section className="mb-12 text-center">
                    <p className="text-sm uppercase tracking-[0.2em] text-[#c9862f]">
                        Legal Information
                    </p>

                    <h1 className="mt-4 text-4xl font-semibold text-[#1c2b23]">
                        Website Ownership Details
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Information regarding website ownership, development, and management.
                    </p>
                </section>


                {/* Content */}
                <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">

                    <div className="space-y-8">

                        {/* Owner */}
                        <div>
                            <h2 className="text-xl font-semibold text-[#1c2b23]">
                                Website Owner
                            </h2>

                            <p className="mt-3 leading-relaxed text-gray-600">
                                This website is owned, designed, developed, and maintained by{" "}
                                <strong>9X Solutions</strong>, a software development and digital
                                solutions company specializing in modern web applications,
                                business websites, and digital experiences.
                            </p>
                        </div>


                        {/* Company Details */}
                        <div>
                            <h2 className="text-xl font-semibold text-[#1c2b23]">
                                Ownership Information
                            </h2>

                            <div className="mt-3 space-y-2 text-gray-600">
                                <p>
                                    <strong>Company Name:</strong> 9X Solutions
                                </p>

                                <p>
                                    <strong>Ownership Type:</strong> Website Design & Development Ownership
                                </p>

                                <p>
                                    <strong>Website Management:</strong> 9X Solutions
                                </p>

                                <p>
                                    <strong>Website Development:</strong> 9X Solutions
                                </p>
                            </div>
                        </div>


                        {/* Client Information */}
                        <div>
                            <h2 className="text-xl font-semibold text-[#1c2b23]">
                                Website Purpose
                            </h2>

                            <p className="mt-3 leading-relaxed text-gray-600">
                                This website has been developed for{" "}
                                <strong>Lanka Lagoon Tours</strong>, a local lagoon tour
                                operator based in Negombo, Sri Lanka. All tour-related
                                information, services, and business content belong to the
                                respective business owner.
                            </p>
                        </div>


                        {/* Intellectual Property */}
                        <div>
                            <h2 className="text-xl font-semibold text-[#1c2b23]">
                                Intellectual Property Rights
                            </h2>

                            <p className="mt-3 leading-relaxed text-gray-600">
                                The website structure, design implementation, user interface,
                                custom software components, and development work created by
                                9X Solutions remain the intellectual property of 9X Solutions
                                unless otherwise agreed through a separate agreement.
                            </p>
                        </div>


                        {/* Copyright */}
                        <div>
                            <h2 className="text-xl font-semibold text-[#1c2b23]">
                                Copyright Notice
                            </h2>

                            <p className="mt-3 leading-relaxed text-gray-600">
                                © {new Date().getFullYear()} 9X Solutions. All rights reserved.
                                Unauthorized copying, reproduction, modification, or
                                redistribution of the website design, code, or digital assets
                                is prohibited.
                            </p>
                        </div>


                        {/* Contact */}
                        <div>
                            <h2 className="text-xl font-semibold text-[#1c2b23]">
                                Contact Information
                            </h2>

                            <div className="mt-3 space-y-2 text-gray-600">
                                <p>
                                    <strong>Company:</strong> 9X Solutions
                                </p>

                                <p>
                                    <strong>Email:</strong> info@9xsolutions.com
                                </p>

                                <p>
                                    <strong>Website:</strong> www.9xsolutions.com
                                </p>
                            </div>
                        </div>

                    </div>

                </section>

            </div>
        </main>
    );
}