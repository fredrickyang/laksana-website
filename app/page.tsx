"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import Image from "next/image";

export default function Home() {
  const images: { [key: string]: string } = {
    "1": "/images/img1.jpg",
    "2": "/images/img2.jpg",
    "3": "/images/img1.jpg",
  };

  const [currentImage, setCurrentImage] = useState(images["1"]);

  useEffect(() => {
    const initInViewAnimations = function (
      selector = ".animate-on-scroll"
    ) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
      );

      document.querySelectorAll(selector).forEach((el) => {
        observer.observe(el);
      });
    };

    initInViewAnimations();

    const stats = document.querySelectorAll(".stat-item");
    const mainImage = document.getElementById("main-image") as HTMLImageElement;

    stats.forEach((stat) => {
      stat.addEventListener("click", () => {
        stats.forEach((s) => s.classList.remove("active"));
        stat.classList.add("active");
        const imgId = (stat as HTMLElement).dataset.imgId;
        if (mainImage && imgId && images[imgId]) {
          mainImage.classList.add("fade-out");
          setTimeout(() => {
            setCurrentImage(images[imgId]);
            mainImage.onload = () => {
              mainImage.classList.remove("fade-out");
            };
          }, 500);
        }
      });
    });
  }, []);

  return (
    <>
      <Head>
        <title>Novus Arc Studio</title>
      </Head>
      <Script
        src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
        strategy="lazyOnload"
      />
      <div className="text-neutral-800 min-h-screen flex flex-col overflow-x-hidden selection:bg-[#FACC15] selection:text-black">
        <style jsx global>{`
          body {
            font-family: "Manrope", sans-serif;
            background-color: #ffffff;
          }
          .grid-bg {
            background-image: linear-gradient(
                to right,
                rgba(0, 0, 0, 0.05) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.05) 1px,
                transparent 1px
              );
            background-size: 80px 80px;
          }
          .animate-on-scroll {
            animation-play-state: paused !important;
          }
          .animate-on-scroll.animate {
            animation-play-state: running !important;
          }
          @keyframes fadeSlideIn {
            0% {
              opacity: 0;
              transform: translateY(30px);
              filter: blur(8px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0px);
            }
          }
          .beam-border-v {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 1px;
            background: rgba(0, 0, 0, 0.05);
            overflow: hidden;
            z-index: 10;
          }
          .beam-border-v::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: linear-gradient(
              to bottom,
              transparent,
              #facc15,
              transparent
            );
            transform: translateY(-100%);
            animation: beam-drop 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            opacity: 0.5;
          }
          .beam-border-h {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: rgba(0, 0, 0, 0.05);
            overflow: hidden;
            z-index: 10;
          }
          .beam-border-h::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: linear-gradient(
              to right,
              transparent,
              #facc15,
              transparent
            );
            transform: translateX(-100%);
            animation: beam-slide 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            animation-delay: 2.5s;
            opacity: 0.5;
          }
          @keyframes beam-drop {
            0% {
              transform: translateY(-100%);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(100%);
              opacity: 0;
            }
          }
          @keyframes beam-slide {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateX(100%);
              opacity: 0;
            }
          }
          .stat-item {
            cursor: pointer;
            transition: all 0.3s ease;
            opacity: 0.5;
          }
          .stat-item:hover {
            opacity: 0.8;
          }
          .stat-item.active {
            opacity: 1;
          }
          .stat-item.active .stat-value {
            color: #facc15;
            text-shadow: 0 0 20px rgba(250, 204, 21, 0.3);
          }
          #main-image {
            transition: opacity 0.5s ease-in-out, transform 0.7s ease-out;
          }
          .fade-out {
            opacity: 0 !important;
            transform: scale(1.05);
          }
          .btn-wrapper::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            pointer-events: none;
            background-color: #ffff;
            background-image: repeating-linear-gradient(
              45deg,
              var(--grid-color) 0 1px,
              transparent 2px 5px
            );
            opacity: 0;
            z-index: -1;
          }
          .btn-wrapper:has(.btn:hover)::after {
            animation: opacity-anim calc(var(--animation-speed) * 4)
              ease-in-out forwards;
          }
          @keyframes opacity-anim {
            80% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          .btn-wrapper .btn {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1rem 1.5rem;
            background-color: #0000;
            border: 1px solid var(--grid-color);
            color: #000d;
            font-family: "Manrope", sans-serif;
            letter-spacing: -0.01em;
            font-size: 1rem;
            font-weight: 600;
            text-transform: uppercase;
            border-radius: 0px;
            cursor: pointer;
            transition: transform 0.2s ease-in-out,
              letter-spacing 0.2s ease-in-out;
          }
          .btn-wrapper .btn:hover {
            background-color: #facc15;
            color: #fff;
            border-color: #facc15;
            transform: scale(1.05);
            letter-spacing: 0.06em;
          }
          .btn-wrapper .btn:active {
            background-color: #eab308;
            transform: scale(0.98);
            letter-spacing: 0.02em;
          }
          .btn-wrapper .btn-svg {
            margin-left: 0.5rem;
            height: 20px;
            width: 20px;
            stroke-width: 1.5;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke: currentColor;
            fill: none;
            transition: all 0.2s ease-in-out;
          }
          .btn-wrapper .dot {
            position: absolute;
            width: var(--dot-size);
            aspect-ratio: 1;
            border-radius: 0px;
            background-color: var(--dot-color);
            transition: all 0.3s ease-in-out;
            opacity: 0;
          }
          .btn-wrapper:has(.btn:hover) .dot.top.left {
            top: 50%;
            left: 20%;
            animation: move-top-left var(--animation-speed) ease-in-out
              forwards;
          }
          @keyframes move-top-left {
            90% {
              opacity: 0.6;
            }
            100% {
              top: calc(var(--dot-size) * -0.5);
              left: calc(var(--dot-size) * -0.5);
              opacity: 1;
            }
          }
          .btn-wrapper:has(.btn:hover) .dot.top.right {
            top: 50%;
            right: 20%;
            animation: move-top-right var(--animation-speed) ease-in-out
              forwards;
            animation-delay: calc(var(--animation-speed) * 0.6);
          }
          @keyframes move-top-right {
            80% {
              opacity: 0.6;
            }
            100% {
              top: calc(var(--dot-size) * -0.5);
              right: calc(var(--dot-size) * -0.5);
              opacity: 1;
            }
          }
          .btn-wrapper:has(.btn:hover) .dot.bottom.right {
            bottom: 50%;
            right: 20%;
            animation: move-bottom-right var(--animation-speed) ease-in-out
              forwards;
            animation-delay: calc(var(--animation-speed) * 1.2);
          }
          @keyframes move-bottom-right {
            80% {
              opacity: 0.6;
            }
            100% {
              bottom: calc(var(--dot-size) * -0.5);
              right: calc(var(--dot-size) * -0.5);
              opacity: 1;
            }
          }
          .btn-wrapper:has(.btn:hover) .dot.bottom.left {
            bottom: 50%;
            left: 20%;
            animation: move-bottom-left var(--animation-speed) ease-in-out
              forwards;
            animation-delay: calc(var(--animation-speed) * 1.8);
          }
          @keyframes move-bottom-left {
            80% {
              opacity: 0.6;
            }
            100% {
              bottom: calc(var(--dot-size) * -0.5);
              left: calc(var(--dot-size) * -0.5);
              opacity: 1;
            }
          }
          .btn-wrapper .line {
            position: absolute;
            transition: all 0.3s ease-in-out;
          }
          .btn-wrapper .line.horizontal {
            height: var(--line-weight);
            width: 100%;
            background-image: repeating-linear-gradient(
              90deg,
              #ffff 0 calc(var(--line-weight) * 2),
              var(--line-color) calc(var(--line-weight) * 2)
                calc(var(--line-weight) * 4)
            );
          }
          .btn-wrapper .line.vertical {
            width: var(--line-weight);
            height: 100%;
            background-image: repeating-linear-gradient(
              0deg,
              #ffff 0 calc(var(--line-weight) * 2),
              var(--line-color) calc(var(--line-weight) * 2)
                calc(var(--line-weight) * 4)
            );
          }
          .btn-wrapper .line.top {
            top: calc(var(--line-weight) * -0.5);
            transform-origin: top left;
            transform: rotate(5deg) scaleX(0);
          }
          .btn-wrapper:has(.btn:hover) .line.top {
            animation: draw-top var(--animation-speed) ease-in-out forwards;
            animation-delay: calc(var(--animation-speed) * 0.8);
          }
          @keyframes draw-top {
            100% {
              transform: rotate(0deg) scaleX(1);
            }
          }
          .btn-wrapper .line.bottom {
            bottom: calc(var(--line-weight) * -0.5);
            transform-origin: bottom right;
            transform: rotate(5deg) scaleX(0);
          }
          .btn-wrapper:has(.btn:hover) .line.bottom {
            animation: draw-bottom var(--animation-speed) ease-in-out forwards;
            animation-delay: calc(var(--animation-speed) * 2);
          }
          @keyframes draw-bottom {
            100% {
              transform: rotate(0deg) scaleX(1);
            }
          }
          .btn-wrapper .line.left {
            left: calc(var(--line-weight) * -0.5);
            transform-origin: bottom left;
            transform: rotate(0deg) scaleY(0);
          }
          .btn-wrapper:has(.btn:hover) .line.left {
            animation: draw-left var(--animation-speed) ease-in-out forwards;
            animation-delay: calc(var(--animation-speed) * 2.4);
          }
          @keyframes draw-left {
            100% {
              transform: rotate(0deg) scaleY(1);
            }
          }
          .btn-wrapper .line.right {
            right: calc(var(--line-weight) * -0.5);
            transform-origin: top right;
            transform: rotate(5deg) scaleY(0);
          }
          .btn-wrapper:has(.btn:hover) .line.right {
            animation: draw-right var(--animation-speed) ease-in-out forwards;
            animation-delay: calc(var(--animation-speed) * 1.4);
          }
          @keyframes draw-right {
            100% {
              transform: rotate(0deg) scaleY(1);
            }
          }
        `}</style>

        <div
          className="aura-background-component top-0 w-full h-screen -z-10 mix-blend-darken saturate-0 brightness-150 absolute opacity-50"
          data-alpha-mask="80"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, white 0%, white 80%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, white 0%, white 80%, transparent)",
          }}
        >
          <div className="aura-background-component top-0 w-full -z-10 absolute h-full">
            <div
              data-us-project="inzENTvhzS9plyop7Z6g"
              className="absolute w-full h-full left-0 top-0 -z-10"
              data-us-initialized="true"
              data-scene-id="id-e069jmsq6g6thr8klsgcd"
            ></div>
          </div>
        </div>

        <nav className="w-full px-6 py-6 lg:px-12 flex justify-between items-center relative z-50 [animation:fadeSlideIn_0.8s_ease-out_0s_both] animate-on-scroll animate">
          <div className="beam-border-h"></div>

          <div className="flex gap-12 gap-x-12 gap-y-12 items-center">
            <div className="flex items-center gap-3 text-black hover:text-[#FACC15] transition-colors cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ color: "currentColor", width: "24px", height: "24px" }}
                className="w-[24px] h-[24px]"
                strokeWidth="2"
              >
                <path
                  fill="currentColor"
                  d="M4.929 4.929c-3.905 3.905-3.905 10.237 0 14.142s10.237 3.905 14.142 0s3.905-10.237 0-14.142s-10.237-3.905-14.142 0"
                  opacity=".5"
                ></path>
                <path
                  fill="currentColor"
                  d="M18.521 4.418L4.418 18.521a10 10 0 0 0 1.06 1.061L19.583 5.479a10 10 0 0 0-1.06-1.06"
                ></path>
              </svg>
            </div>

            <div className="hidden md:block h-5 w-[1px] bg-neutral-200"></div>

            <button className="hidden md:flex items-center gap-2 text-lg font-normal text-neutral-600 hover:text-black transition-colors group">
              Expertise
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="text-xl opacity-70 group-hover:opacity-100 transition-all"
              >
                <path
                  fill="currentColor"
                  d="m8.303 12.404l3.327 3.431c.213.22.527.22.74 0l6.43-6.63C19.201 8.79 18.958 8 18.43 8h-5.723z"
                ></path>
                <path
                  fill="currentColor"
                  d="M11.293 8H5.57c-.528 0-.771.79-.37 1.205l2.406 2.481z"
                  opacity=".5"
                ></path>
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-sm font-medium tracking-widest uppercase hidden sm:block text-neutral-600">
              Get in touch
            </span>
            <button className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#FACC15] transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ width: "24px", height: "24px" }}
                strokeWidth="2"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M17.47 15.53a.75.75 0 0 0 1.28-.53V6a.75.75 0 0 0-.75-.75H9a.75.75 0 0 0-.53 1.28z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="currentColor"
                  d="M5.47 17.47a.75.75 0 1 0 1.06 1.06l6.97-6.97l-1.06-1.06z"
                  opacity=".5"
                ></path>
              </svg>
            </button>
          </div>
        </nav>

        <main className="flex-grow grid grid-cols-1 lg:px-12 lg:grid-cols-12 my-32 pb-12 relative gap-x-8 gap-y-8">
          <div className="lg:col-span-5 flex flex-col lg:pt-10 z-20 relative justify-center">
            <h1 className="text-6xl lg:text-[5rem] leading-[0.9] font-normal tracking-tighter text-black mb-6 uppercase [animation:fadeSlideIn_0.8s_ease-out_0.1s_both] animate-on-scroll animate">
              Shaping
              <br />
              Void
              <br />
              Into
              <br />
              Matter
            </h1>

            <p className="text-lg text-neutral-600 max-w-md leading-relaxed mb-12 font-light [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
              Constructing the ethereal through parametric design and brutalist
              principles. We redefine the skyline one artifact at a time.
            </p>

            <div className="flex flex-col items-start gap-3 [animation:fadeSlideIn_0.8s_ease-out_0.3s_both] animate-on-scroll animate">
              <a
                href="#"
                className="btn-wrapper"
                style={
                  {
                    "--dot-size": "6px",
                    "--line-weight": "1px",
                    "--line-distance": "0.8rem 1rem",
                    "--animation-speed": "0.35s",
                    "--dot-color": "#FACC15",
                    "--line-color": "#FACC15",
                    "--grid-color": "#0003",
                    position: "relative",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "auto",
                    height: "auto",
                    padding: "var(--line-distance)",
                    userSelect: "none",
                  } as React.CSSProperties
                }
              >
                <div className="line horizontal top"></div>
                <div className="line vertical right"></div>
                <div className="line horizontal bottom"></div>
                <div className="line vertical left"></div>

                <div className="dot top left"></div>
                <div className="dot top right"></div>
                <div className="dot bottom right"></div>
                <div className="dot bottom left"></div>

                <button className="btn">
                  <span className="btn-text tracking-tight">
                    Start Creating
                  </span>
                  <svg
                    className="btn-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </a>

              <span className="text-xs text-neutral-500 uppercase tracking-widest pl-4 opacity-70">
                View Showreel (01:20)
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 relative flex items-center justify-center py-20 lg:py-0 [animation:fadeSlideIn_1s_ease-out_0.2s_both] animate-on-scroll animate">
            <div className="absolute inset-0 grid-bg opacity-100 z-0 mx-[-2rem] mask-image-linear-gradient(to bottom, black, transparent)"></div>

            <div className="absolute top-1/4 right-0 text-neutral-300 text-2xl font-light z-10">
              +
            </div>
            <div className="absolute bottom-20 left-0 text-neutral-300 text-2xl font-light z-10">
              +
            </div>

            <div className="relative z-10 w-full aspect-[3/4] overflow-hidden shadow-2xl border border-black/10 group">
              <img
                id="main-image"
                src={currentImage}
                alt="Architectural Detail"
                className="group-hover:grayscale-0 opacity-90 w-full h-full object-cover grayscale scale-110"
              />
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col relative z-20 pt-10 pl-6 [animation:fadeSlideIn_0.8s_ease-out_0.4s_both] animate-on-scroll animate">
            <div className="beam-border-v"></div>

            <div className="flex-1 flex flex-col justify-between h-full pb-10">
              <div className="stat-item mt-10" data-img-id="1">
                <span className="stat-value text-7xl font-light tracking-tighter text-neutral-300 block transition-colors">
                  142
                </span>
                <span className="text-sm text-neutral-500 uppercase tracking-widest mt-2 block pl-2 group-hover:text-black">
                  Global Awards
                </span>
              </div>

              <div
                className="stat-item py-12 border-t border-black/5 border-dashed"
                data-img-id="2"
              >
                <span className="stat-value text-7xl font-light tracking-tighter text-neutral-300 block transition-colors">
                  08
                </span>
                <span className="text-sm text-neutral-500 uppercase tracking-widest mt-2 block pl-2 group-hover:text-black">
                  Regional Offices
                </span>
              </div>

              <div
                className="stat-item border-t border-black/5 border-dashed pt-12"
                data-img-id="3"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative group cursor-pointer">
                    <Image
                      src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/63a6abea-fa7c-44e7-b134-9d70239f3d3f_320w.webp"
                      alt="Lead Architect"
                      width={320}
                      height={320}
                      className="w-14 h-14 rounded-full border border-neutral-200 object-cover relative z-10 grayscale group-hover:grayscale-0 transition-all"
                    />
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#FACC15] rounded-full flex items-center justify-center z-0 translate-x-full -ml-6 transition-transform group-hover:translate-x-[110%]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        className="text-black text-xl"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M17.47 15.53a.75.75 0 0 0 1.28-.53V6a.75.75 0 0 0-.75-.75H9a.75.75 0 0 0-.53 1.28z"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M5.47 17.47a.75.75 0 1 0 1.06 1.06l6.97-6.97l-1.06-1.06z"
                          opacity=".5"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <p className="text-base font-normal text-neutral-700 uppercase leading-relaxed tracking-tight max-w-[200px] mt-6 pointer-events-none">
                  Redefining urban landscapes since 2024
                </p>
              </div>
            </div>
          </div>
        </main>

        <section className="relative w-full border-t border-black/5 bg-[#F5F5F5]">
          <div className="w-full px-6 lg:px-12 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
            <div className="lg:col-span-3 relative h-48 lg:h-full w-full [animation:fadeSlideIn_0.8s_ease-out_0.3s_both] animate-on-scroll">
              <div className="w-full h-full overflow-hidden relative opacity-50 hover:opacity-100 transition-opacity duration-700 border border-black/5">
                <Image
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/df7a2dd9-504b-4462-9e25-8f9322d8a718_1600w.webp"
                  alt="Architecture Detail"
                  layout="fill"
                  objectFit="cover"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#F5F5F5] to-transparent opacity-50"
                ></div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8 relative z-10 [animation:fadeSlideIn_0.8s_ease-out_0.1s_both] animate-on-scroll lg:pl-8">
              <p className="text-lg lg:text-xl text-neutral-600 leading-relaxed font-light">
                Novus Arc creates environments that challenge perception. We
                fuse{" "}
                <span className="text-black font-medium">
                  brutalist principles
                </span>{" "}
                with organic fluidity to build the monuments of tomorrow.
              </p>

              <div className="flex gap-4">
                <span className="inline-block border border-black/10 text-neutral-600 text-xs font-medium py-2 px-4 rounded-full uppercase tracking-wider hover:border-[#FACC15] hover:text-[#FACC15] transition-colors cursor-default">
                  #Minimalism
                </span>
                <span className="inline-block border border-black/10 text-neutral-600 text-xs font-medium py-2 px-4 rounded-full uppercase tracking-wider hover:border-[#FACC15] hover:text-[#FACC15] transition-colors cursor-default">
                  #Futurism
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 relative z-10 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll lg:text-right">
              <h2 className="text-3xl lg:text-4xl font-light text-black tracking-tight leading-tight">
                Architecture for the post-digital era.
              </h2>
            </div>
          </div>
        </section>
        <footer className="w-full bg-[#FAFAFA] relative pt-32 pb-0 overflow-hidden">
          <div className="absolute top-12 left-0 right-0 flex justify-center z-30 px-6">
          </div>

          <div className="max-w-[90%] mx-auto flex items-end gap-4 relative z-10 translate-y-2 opacity-50 hover:opacity-100 transition-opacity duration-500">
            <div className="h-16 w-48 bg-[#F5F5F5] border-t border-x border-black/10 rounded-t-2xl flex items-center justify-center gap-2 relative z-20">
              <iconify-icon
                icon="solar:code-square-bold-duotone"
                className="text-black"
              ></iconify-icon>
              <span className="text-xs font-semibold text-black uppercase tracking-widest">
                System
              </span>
            </div>
            <div className="h-12 w-40 bg-[#FAFAFA] border-t border-x border-black/5 rounded-t-xl flex items-center justify-center gap-2 relative z-10 hover:bg-[#F5F5F5] hover:h-14 transition-all cursor-pointer group">
              <iconify-icon
                icon="solar:users-group-rounded-bold-duotone"
                className="text-neutral-400 group-hover:text-black transition-colors"
              ></iconify-icon>
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest group-hover:text-black transition-colors">
                Studio
              </span>
            </div>
            <div className="h-12 w-40 bg-[#FAFAFA] border-t border-x border-black/5 rounded-t-xl flex items-center justify-center gap-2 relative z-10 hover:bg-[#F5F5F5] hover:h-14 transition-all cursor-pointer group">
              <iconify-icon
                icon="solar:document-text-bold-duotone"
                className="text-neutral-400 group-hover:text-black transition-colors"
              ></iconify-icon>
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest group-hover:text-black transition-colors">
                Legal
              </span>
            </div>
          </div>

          <div className="w-full bg-[#F5F5F5] border-t border-black/10 rounded-t-[3rem] relative z-20 overflow-hidden">
            <div className="w-full px-6 lg:px-12 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 relative z-20">
              <div className="lg:col-span-7 flex flex-col justify-center">
                <h2 className="flex flex-col text-6xl lg:text-[7rem] leading-[0.85] font-normal text-black tracking-tighter mb-24">
                  Systematic.
                  <span className="text-neutral-400 pt-10">Parametric.</span>
                  <span className="pt-10">Adaptive.</span>
                </h2>

                <div className="flex flex-wrap gap-8 items-center mt-auto opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                  <iconify-icon
                    icon="simple-icons:framer"
                    width="24"
                    className="hover:text-black transition-colors"
                  ></iconify-icon>
                  <iconify-icon
                    icon="simple-icons:github"
                    width="24"
                    className="hover:text-black transition-colors"
                  ></iconify-icon>
                  <div className="h-6 w-px bg-black/10"></div>
                  <iconify-icon
                    icon="simple-icons:x"
                    width="22"
                    className="hover:text-black transition-colors"
                  ></iconify-icon>
                  <iconify-icon
                    icon="simple-icons:discord"
                    width="24"
                    className="hover:text-black transition-colors"
                  ></iconify-icon>
                </div>
              </div>

              <div className="lg:col-span-5 flex lg:justify-end items-center">
                <div className="w-full max-w-md bg-[#FACC15] p-8 lg:p-12 rounded-xl relative overflow-hidden group rotate-1 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                  <iconify-icon
                    icon="solar:settings-bold-duotone"
                    className="absolute -right-8 -top-8 text-black/10 text-[12rem] rotate-12 group-hover:rotate-45 transition-transform duration-700"
                  ></iconify-icon>

                  <div className="relative z-10">
                    <h3 className="text-3xl font-medium text-black tracking-tight leading-tight mb-6">
                      Optimized structures,at every node.
                    </h3>
                    <p className="text-black/70 text-sm font-medium leading-relaxed mb-10 font-mono">
                      // Where every constraint is met with calculation and
                      every blueprint is a revolution.
                    </p>

                    <div className="flex items-center justify-between border-t border-black/10 pt-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-black/50 font-semibold">
                          Status
                        </span>
                        <span className="text-xs font-semibold text-black mt-1">
                          Operational
                        </span>
                      </div>
                      <button className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform group/btn">
                        <iconify-icon
                          icon="solar:arrow-right-up-bold-duotone"
                          className="group-hover/btn:rotate-45 transition-transform"
                        ></iconify-icon>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full overflow-hidden pointer-events-none select-none pt-20">
              <h1 className="text-[22vw] leading-none font-bold text-black/5 text-center -mb-12 lg:-mb-24 tracking-tighter font-space-grotesk">
                NOVUS
              </h1>
              <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#F5F5F5] to-transparent"></div>
            </div>

            <div className="absolute bottom-6 w-full flex justify-center z-30">
              <p className="text-[10px] text-neutral-300 font-mono uppercase tracking-widest hover:text-neutral-500 transition-colors cursor-default">
                © 2024 Novus Arc Systems. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
