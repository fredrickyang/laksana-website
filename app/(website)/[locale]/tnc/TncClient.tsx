"use client";
import Footer from "../../components/Footer";
import RichTextContent from "../../components/RichTextContent";
import Image from "next/image";

const variantStyles: Record<string, string> = {
  default: "bg-white p-8 shadow-sm",
  "highlight-blue": "bg-blue-50 p-8 border-l-4 border-blue-600",
  "highlight-red": "bg-red-50 p-8 border-l-4 border-red-600",
  cta: "bg-gradient-to-r from-blue-600 to-blue-700 p-8 shadow-md text-white",
};

function getMediaUrl(media: any): string {
  if (!media) return "/images/bg-produk.png";
  if (typeof media === "string") return media;
  return media.url || "/images/bg-produk.png";
}

interface TncClientProps {
  termsPage: any;
  settings: any;
}

export default function TncClient({ termsPage, settings }: TncClientProps) {
  const hero = termsPage?.hero;
  const heroTitle = hero?.title || "Terms and Conditions";
  const heroImage = getMediaUrl(hero?.backgroundImage);
  const lastUpdated = termsPage?.lastUpdated
    ? new Date(termsPage.lastUpdated).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    })
    : null;
  const sections = termsPage?.sections || [];
  const contactEmail = termsPage?.contactEmail;

  return (
    <>
      {/* Hero Section with Background Image */}
      <div className="relative min-h-25vh flex flex-col justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            className="w-full h-full object-cover"
            src={heroImage}
            alt="Background Image"
            width={1400}
            height={400}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-20 md:pt-15 lg:pt-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            <div className="lg:flex-1 fade-in-up mb-[10%] mt-[10%] justify-center text-center">
              <h1 className="text-4xl md:text-5xl sm:text-4xl font-medium tracking-tight text-white mb-4 leading-[0.95] brand-font">
                <span className="text-white bg-clip-text uppercase">
                  {heroTitle}
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
            {lastUpdated && (
              <p className="text-lg text-gray-600">
                Last updated:{" "}
                <span className="font-semibold">{lastUpdated}</span>
              </p>
            )}
            {termsPage?.introText && (
              <div className="mt-4 text-lg">
                <RichTextContent data={termsPage.introText} />
              </div>
            )}
            {termsPage?.highlightText && (
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-600">
                <RichTextContent data={termsPage.highlightText} />
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {sections.map((section: any, index: number) => {
              const variant = section.variant || "default";
              const style = variantStyles[variant] || variantStyles.default;
              const isCta = variant === "cta";

              return (
                <section key={section.id || index} className={style}>
                  {section.title && (
                    <h3
                      className={`text-2xl font-bold mb-4 ${isCta
                          ? "text-white"
                          : variant === "highlight-red"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                    >
                      {section.title}
                    </h3>
                  )}
                  {section.content && (
                    <div className="space-y-4">
                      <RichTextContent data={section.content} />
                    </div>
                  )}
                  {isCta && contactEmail && (
                    <div className="mt-6 flex items-center gap-2">
                      <a
                        href={`mailto:${contactEmail}`}
                        className="text-white hover:text-gray-200 font-semibold text-lg underline"
                      >
                        {contactEmail}
                      </a>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
      <Footer settings={settings} />
    </>
  );
}
