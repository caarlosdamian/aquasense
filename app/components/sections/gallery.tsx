"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";

interface GalleryProps {
  dict: {
    gallery: {
      sectionTag: string;
      title: string;
      subtitle: string;
    };
  };
  sectionBg?: string;
}

const GALLERY_IMAGES = [
  { id: 1, src: "/pool.jpg", alt: "Custom AquaSense Pool 1" },
  { id: 2, src: "/pool.jpg", alt: "Custom AquaSense Pool 2" },
  { id: 3, src: "/pool.jpg", alt: "Custom AquaSense Pool 3" },
  { id: 4, src: "/pool.jpg", alt: "Custom AquaSense Pool 4" },
  { id: 5, src: "/pool.jpg", alt: "Custom AquaSense Pool 5" },
  { id: 6, src: "/pool.jpg", alt: "Custom AquaSense Pool 6" },
];

export default function Gallery({ dict, sectionBg = "bg-background" }: GalleryProps) {
  const t = dict.gallery;
  const ref = useScrollAnimation();

  return (
    <section id="gallery" ref={ref} className={`${sectionBg} py-24 sm:py-32`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="animate-on-scroll font-semibold text-secondary uppercase tracking-wider text-sm">
            {t.sectionTag}
          </span>
          <h2 className="animate-on-scroll stagger-1 mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            {t.title}
          </h2>
          <p className="animate-on-scroll stagger-2 mt-4 text-lg leading-relaxed text-muted">
            {t.subtitle}
          </p>
        </div>

        <div className="animate-on-scroll stagger-3 mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {GALLERY_IMAGES.map((img) => (
            <div
              key={img.id}
              className="group relative overflow-hidden rounded-2xl bg-surface shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[4/3] w-full bg-muted/20">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
