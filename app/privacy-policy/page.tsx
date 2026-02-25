"use client";
import Footer from "../components/Footer";
import Image from "next/image";
export default function Terms() {
  return (
    <>
      {/* Hero Section with Background Image */}
      <div className="relative min-h-25vh flex flex-col justify-center px-6 overflow-hidden">
        <title>
          Laksana Business Park - Solusi Gudang & Properti Strategis
        </title>
        {/* Background Video (fixed) */}
        <div className="absolute inset-0 z-0">
          <Image
            className="w-full h-full object-cover"
            src="/images/bg-produk.png"
            alt="Background Image"
            width={1400}
            height={400}
          />
          {/* Gradient overlay from top to bottom - 50% black to transparent */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
          {/* Left-right gradient overlay for additional text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-20 md:pt-15 lg:pt-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            {/* Left side - Title and description */}
            <div className="lg:flex-1 fade-in-up mb-[10%] mt-[10%] justify-center text-center">
              <h1 className="text-4xl md:text-5xl sm:text-4xl font-medium tracking-tight text-white mb-4 leading-[0.95] brand-font">
                <span className="text-white bg-clip-text uppercase">
                  Privacy Policy
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 pb-8 border-b-2 border-gray-200">
            <p className="text-lg text-gray-600">
              Last updated: <span className="font-semibold">February 09, 2026</span>
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed text-lg">
              This Privacy Policy describes Our policies and procedures on the collection,
              use and disclosure of Your information when You use the Service and tells
              You about Your privacy rights and how the law protects You.
            </p>
            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-600">
              <p className="text-gray-700 leading-relaxed">
                We use Your Personal Data to provide and improve the Service. By using the
                Service, You agree to the collection and use of information in accordance
                with this Privacy Policy.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Interpretation and Definitions */}
            <section className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-blue-600">
                Interpretation and Definitions
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Interpretation</h4>
                  <p className="text-gray-700 leading-relaxed">
                    The words whose initial letters are capitalized have meanings defined under
                    the following conditions. The following definitions shall have the same
                    meaning regardless of whether they appear in singular or in plural.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Definitions</h4>
                  <p className="text-gray-700 leading-relaxed mb-4">For the purposes of this Privacy Policy:</p>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        <strong>Account</strong> means a unique account created for You to
                        access our Service or parts of our Service.
                      </span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        <strong>Affiliate</strong> means an entity that controls, is controlled
                        by, or is under common control with a party, where "control" means
                        ownership of 50% or more of the shares, equity interest or other
                        securities entitled to vote for election of directors or other managing
                        authority.
                      </span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        <strong>Company</strong> (referred to as either "the Company", "We",
                        "Us" or "Our" in this Privacy Policy) refers to PT Bangun Laksana
                        Persada, Jl. Pantai Indah Selatan No.9 Blok DC, RT.9/RW.6, Kapuk Muara,
                        Penjaringan, North Jakarta 14460.
                      </span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        <strong>Cookies</strong> are small files that are placed on Your
                        computer, mobile device or any other device by a website, containing the
                        details of Your browsing history on that website among its many uses.
                      </span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Country</strong> refers to: Indonesia</span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        <strong>Device</strong> means any device that can access the Service
                        such as a computer, a cell phone or a digital tablet.
                      </span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        <strong>Personal Data</strong> (or "Personal Information") is any
                        information that relates to an identified or identifiable individual.
                        We use "Personal Data" and "Personal Information" interchangeably unless
                        a law uses a specific term.
                      </span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Service</strong> refers to the Website.</span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        <strong>Service Provider</strong> means any natural or legal person who
                        processes the data on behalf of the Company. It refers to third-party
                        companies or individuals employed by the Company to facilitate the
                        Service, to provide the Service on behalf of the Company, to perform
                        services related to the Service or to assist the Company in analyzing
                        how the Service is used.
                      </span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        <strong>Usage Data</strong> refers to data collected automatically,
                        either generated by the use of the Service or from the Service
                        infrastructure itself (for example, the duration of a page visit).
                      </span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        <strong>Website</strong> refers to Laksana Business Park | Solusi Gudang
                        Strategis, accessible from{" "}
                        <a
                          href="https://www.laksanabusinesspark.id"
                          rel="external nofollow noopener"
                          target="_blank"
                          className="text-blue-600 hover:text-blue-800 font-semibold underline"
                        >
                          https://www.laksanabusinesspark.id
                        </a>
                        .
                      </span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        <strong>You</strong> means the individual accessing or using the
                        Service, or the company, or other legal entity on behalf of which such
                        individual is accessing or using the Service, as applicable.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            {/* Collecting and Using Your Personal Data */}
            <section className="bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-blue-600">
                Collecting and Using Your Personal Data
              </h3>

              {/* Types of Data */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Types of Data Collected</h4>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    Personal Data
                    </h5>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      While using Our Service, We may ask You to provide Us with certain
                      personally identifiable information that can be used to contact or identify
                      You. Personally identifiable information may include, but is not limited to:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li className="text-gray-700 flex gap-2">
                        <span>✓</span> Email address
                      </li>
                      <li className="text-gray-700 flex gap-2">
                        <span>✓</span> First name and last name
                      </li>
                      <li className="text-gray-700 flex gap-2">
                        <span>✓</span> Phone number
                      </li>
                      <li className="text-gray-700 flex gap-2">
                        <span>✓</span> Address, State, Province, ZIP/Postal code, City
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    Usage Data
                    </h5>
                    <p className="text-gray-700 leading-relaxed">
                      Usage Data is collected automatically when using the Service. Usage Data may include information such as Your Device's Internet Protocol
                      address (e.g. IP address), browser type, browser version, the pages of our
                      Service that You visit, the time and date of Your visit, the time spent on
                      those pages, unique device identifiers and other diagnostic data.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    Mobile Device Information
                    </h5>
                    <p className="text-gray-700 leading-relaxed">
                      When You access the Service by or through a mobile device, We may collect
                      certain information automatically, including, but not limited to, the type
                      of mobile device You use, Your mobile device's unique ID, the IP address of
                      Your mobile device, Your mobile operating system, the type of mobile
                      Internet browser You use, unique device identifiers and other diagnostic
                      data.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    Tracking Technologies and Cookies
                    </h5>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      We use Cookies and similar tracking technologies to track the activity on
                      Our Service and store certain information. Tracking technologies We use
                      include beacons, tags, and scripts to collect and track information and to
                      improve and analyze Our Service.
                    </p>
                    <ul className="space-y-3 ml-4">
                      <li className="text-gray-700">
                        <span className="font-semibold">Cookies or Browser Cookies:</span> A cookie is a small file
                        placed on Your Device. You can instruct Your browser to refuse all Cookies
                        or to indicate when a Cookie is being sent. However, if You do not accept
                        Cookies, You may not be able to use some parts of our Service.
                      </li>
                      <li className="text-gray-700">
                        <span className="font-semibold">Web Beacons:</span> Certain sections of our Service and our
                        emails may contain small electronic files known as web beacons (also
                        referred to as clear gifs, pixel tags, and single-pixel gifs).
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cookie Types */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Cookie Usage Purposes</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use both Session and Persistent Cookies for the purposes set out below:
                </p>
                <ul className="space-y-4">
                  <li className="bg-blue-50 p-4 border-l-4 border-blue-600">
                    <p className="font-semibold text-gray-900 mb-2">Necessary / Essential Cookies</p>
                    <p className="text-sm text-gray-700 mb-1"><strong>Type:</strong> Session Cookies</p>
                    <p className="text-gray-700 leading-relaxed">These Cookies are essential to provide You with services
                      available through the Website and to enable You to use some of its
                      features. They help to authenticate users and prevent fraudulent use of
                      user accounts.</p>
                  </li>
                  <li className="bg-green-50 p-4 border-l-4 border-green-600">
                    <p className="font-semibold text-gray-900 mb-2">Cookies Policy / Notice Acceptance Cookies</p>
                    <p className="text-sm text-gray-700 mb-1"><strong>Type:</strong> Persistent Cookies</p>
                    <p className="text-gray-700 leading-relaxed">These Cookies identify if users have accepted the use of
                      cookies on the Website.</p>
                  </li>
                  <li className="bg-purple-50 p-4 border-l-4 border-purple-600">
                    <p className="font-semibold text-gray-900 mb-2">Functionality Cookies</p>
                    <p className="text-sm text-gray-700 mb-1"><strong>Type:</strong> Persistent Cookies</p>
                    <p className="text-gray-700 leading-relaxed">These Cookies allow Us to remember choices You make when You
                      use the Website, such as remembering your login details or language
                      preference.</p>
                  </li>
                </ul>
              </div>
            </section>
            {/* Use of Your Personal Data */}
            <section className="bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-blue-600">
                Use of Your Personal Data
              </h3>
              
              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-gray-900 mb-4">The Company may use Personal Data for the following purposes:</p>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service.</span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased.</span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.</span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>To provide You</strong> with news, special offers, and general information about other goods, services and events.</span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>For business transfers:</strong> We may use Your Personal Data to evaluate or conduct a merger, divestiture, or restructuring.</span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>For other purposes</strong>: We may use Your information for data analysis, identifying usage trends, and to evaluate and improve our Service.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t pt-6">
                  <p className="font-semibold text-gray-900 mb-4">We may share Your Personal Data in the following situations:</p>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-gray-700">
                      <span><strong>With Service Providers:</strong> We may share Your Personal Data with Service Providers to monitor and analyze the use of our Service.</span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span><strong>For business transfers:</strong> We may share or transfer Your Personal Data in connection with a merger or sale of Company assets.</span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span><strong>With Affiliates:</strong> We may share Your Personal Data with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy.</span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span><strong>With business partners:</strong> We may share Your Personal Data with Our business partners to offer You certain products, services or promotions.</span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span><strong>With other users:</strong> When You share Personal Data in public areas of the Service, such information may be viewed by all users.</span>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <span><strong>With Your consent</strong>: We may disclose Your Personal Data for any other purpose with Your consent.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            {/* Retention of Personal Data */}
            <section className="bg-blue-50 p-8 border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-blue-600">
                Retention of Your Personal Data
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The Company will retain Your Personal Data only for as long as is necessary
                  for the purposes set out in this Privacy Policy. We will retain and use Your
                  Personal Data to the extent necessary to comply with our legal obligations.
                </p>
                <p className="font-semibold">
                  We apply different retention periods to different categories of Personal Data:
                </p>
                <ul className="space-y-3 ml-4">
                  <li className="flex gap-3">
                    <span className="text-blue-600">▪</span>
                    <span><strong>User Accounts:</strong> retained for the duration of your account relationship plus up to 24 months after account closure</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600">▪</span>
                    <span><strong>Support Tickets:</strong> up to 24 months from the date of ticket closure</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600">▪</span>
                    <span><strong>Website Analytics:</strong> up to 24 months from the date of collection</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600">▪</span>
                    <span><strong>Server Logs:</strong> up to 24 months for security monitoring</span>
                  </li>
                </ul>
              </div>
            </section>
            {/* Transfer of Personal Data */}
            <section className="bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-blue-600">
                Transfer of Your Personal Data
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Your information, including Personal Data, is processed at the Company's
                  operating offices and in any other places where the parties involved in the
                  processing are located. It means that this information may be transferred to
                  computers located outside of Your state, province, country or other governmental
                  jurisdiction where the data protection laws may differ from those from Your jurisdiction.
                </p>
                <p>
                  Where required by applicable law, We will ensure that international
                  transfers of Your Personal Data are subject to appropriate safeguards and
                  supplementary measures where appropriate. The Company will take all steps
                  reasonably necessary to ensure that Your data is treated securely and in
                  accordance with this Privacy Policy and no transfer of Your Personal Data
                  will take place to an organization or a country unless there are adequate
                  controls in place.
                </p>
              </div>
            </section>

            {/* Delete Your Personal Data */}
            <section className="bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-blue-600">
                Delete Your Personal Data
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  You have the right to delete or request that We assist in deleting the
                  Personal Data that We have collected about You.
                </p>
                <p>
                  Our Service may give You the ability to delete certain information about You
                  from within the Service. You may update, amend, or delete Your information at any time by signing in
                  to Your Account, if you have one, and visiting the account settings section
                  that allows you to manage Your personal information.
                </p>
                <p className="bg-yellow-50 p-4 border-l-4 border-yellow-600">
                  We may need to retain certain information when we
                  have a legal obligation or lawful basis to do so.
                </p>
              </div>
            </section>

            {/* Disclosure of Personal Data */}
            <section className="bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-blue-600">
                Disclosure of Your Personal Data
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    Business Transactions
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    If the Company is involved in a merger, acquisition or asset sale, Your
                    Personal Data may be transferred. We will provide notice before Your
                    Personal Data is transferred and becomes subject to a different Privacy
                    Policy.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    Law Enforcement
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Under certain circumstances, the Company may be required to disclose Your
                    Personal Data if required to do so by law or in response to valid requests
                    by public authorities (e.g. a court or a government agency).
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  Other Legal Requirements
                  </h4>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The Company may disclose Your Personal Data in the good faith belief that
                    such action is necessary to:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="text-gray-700 flex gap-2">
                      <span>✓</span> Comply with a legal obligation
                    </li>
                    <li className="text-gray-700 flex gap-2">
                      <span>✓</span> Protect and defend the rights or property of the Company
                    </li>
                    <li className="text-gray-700 flex gap-2">
                      <span>✓</span> Prevent or investigate possible wrongdoing in connection with the Service
                    </li>
                    <li className="text-gray-700 flex gap-2">
                      <span>✓</span> Protect the personal safety of Users of the Service or the public
                    </li>
                    <li className="text-gray-700 flex gap-2">
                      <span>✓</span> Protect against legal liability
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Security */}
            <section className="bg-red-50 p-8 border-l-4 border-red-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-red-600">
                Security of Your Personal Data
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The security of Your Personal Data is important to Us, but remember that no
                method of transmission over the Internet, or method of electronic storage is
                100% secure. While We strive to use commercially reasonable means to protect
                Your Personal Data, We cannot guarantee its absolute security.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-blue-600">
                Children's Privacy
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Our Service does not address anyone under the age of 16. We do not knowingly
                  collect personally identifiable information from anyone under the age of 16.
                  If You are a parent or guardian and You are aware that Your child has
                  provided Us with Personal Data, please contact Us.
                </p>
                <p>
                  If We become aware that We have collected Personal Data from anyone under the age of 16 without
                  verification of parental consent, We take steps to remove that information
                  from Our servers.
                </p>
              </div>
            </section>

            {/* Links to Other Websites */}
            <section className="bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-blue-600">
                Links to Other Websites
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Our Service may contain links to other websites that are not operated by Us.
                  If You click on a third party link, You will be directed to that third
                  party's site. We strongly advise You to review the Privacy Policy of every
                  site You visit.
                </p>
                <p>
                  We have no control over and assume no responsibility for the content,
                  privacy policies or practices of any third party sites or services.
                </p>
              </div>
            </section>

            {/* Changes */}
            <section className="bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-blue-600">
                Changes to this Privacy Policy
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We may update Our Privacy Policy from time to time. We will notify You of
                  any changes by posting the new Privacy Policy on this page.
                </p>
                <p>
                  We will let You know via email and/or a prominent notice on Our Service,
                  prior to the change becoming effective and update the "Last updated" date at
                  the top of this Privacy Policy.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for any changes.
                  Changes to this Privacy Policy are effective when they are posted on this
                  page.
                </p>
              </div>
            </section>

            {/* Contact Us */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 shadow-md text-white">
              <h3 className="text-2xl font-bold mb-4">
                Contact Us
              </h3>
              <p className="mb-6">
                If you have any questions about this Privacy Policy, You can contact us:
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="/cdn-cgi/l/email-protection"
                  className="__cf_email__ text-white hover:text-gray-200 font-semibold text-lg underline"
                  data-cfemail="e4878b8a90858790a48583918a838d8a908d88858a80ca878b89"
                >
                  [contact@agungintiland.com]
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
