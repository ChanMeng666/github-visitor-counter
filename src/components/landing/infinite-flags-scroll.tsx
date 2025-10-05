"use client";

import { useEffect, useRef, useState } from "react";

// Comprehensive list of countries from around the world
const countries = [
  { code: "us", name: "United States" },
  { code: "gb", name: "United Kingdom" },
  { code: "ca", name: "Canada" },
  { code: "au", name: "Australia" },
  { code: "jp", name: "Japan" },
  { code: "kr", name: "South Korea" },
  { code: "de", name: "Germany" },
  { code: "fr", name: "France" },
  { code: "br", name: "Brazil" },
  { code: "in", name: "India" },
  { code: "cn", name: "China" },
  { code: "mx", name: "Mexico" },
  { code: "it", name: "Italy" },
  { code: "es", name: "Spain" },
  { code: "nl", name: "Netherlands" },
  { code: "ru", name: "Russia" },
  { code: "se", name: "Sweden" },
  { code: "no", name: "Norway" },
  { code: "dk", name: "Denmark" },
  { code: "fi", name: "Finland" },
  { code: "pl", name: "Poland" },
  { code: "ch", name: "Switzerland" },
  { code: "at", name: "Austria" },
  { code: "be", name: "Belgium" },
  { code: "pt", name: "Portugal" },
  { code: "gr", name: "Greece" },
  { code: "cz", name: "Czech Republic" },
  { code: "ie", name: "Ireland" },
  { code: "nz", name: "New Zealand" },
  { code: "sg", name: "Singapore" },
  { code: "hk", name: "Hong Kong" },
  { code: "my", name: "Malaysia" },
  { code: "th", name: "Thailand" },
  { code: "id", name: "Indonesia" },
  { code: "ph", name: "Philippines" },
  { code: "vn", name: "Vietnam" },
  { code: "tw", name: "Taiwan" },
  { code: "ae", name: "United Arab Emirates" },
  { code: "sa", name: "Saudi Arabia" },
  { code: "il", name: "Israel" },
  { code: "tr", name: "Turkey" },
  { code: "za", name: "South Africa" },
  { code: "eg", name: "Egypt" },
  { code: "ng", name: "Nigeria" },
  { code: "ar", name: "Argentina" },
  { code: "cl", name: "Chile" },
  { code: "co", name: "Colombia" },
  { code: "pe", name: "Peru" },
  { code: "ua", name: "Ukraine" },
  { code: "ro", name: "Romania" },
  { code: "hu", name: "Hungary" },
  { code: "bg", name: "Bulgaria" },
  { code: "hr", name: "Croatia" },
  { code: "sk", name: "Slovakia" },
  { code: "si", name: "Slovenia" },
  { code: "lt", name: "Lithuania" },
  { code: "lv", name: "Latvia" },
  { code: "ee", name: "Estonia" },
  { code: "is", name: "Iceland" },
  { code: "pk", name: "Pakistan" },
  { code: "bd", name: "Bangladesh" },
  { code: "lk", name: "Sri Lanka" },
  { code: "kw", name: "Kuwait" },
  { code: "qa", name: "Qatar" },
  { code: "om", name: "Oman" },
  { code: "bh", name: "Bahrain" },
  { code: "jo", name: "Jordan" },
  { code: "lb", name: "Lebanon" },
];

export function InfiniteFlagsScroll() {
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="pt-8">
        <p className="text-sm text-muted-foreground mb-4 text-center">
          Trusted by developers worldwide
        </p>
        <div className="h-12" />
      </div>
    );
  }

  // Duplicate the countries array for seamless infinite scroll
  const duplicatedCountries = [...countries, ...countries];

  return (
    <div className="pt-8">
      <p className="text-sm text-muted-foreground mb-4 text-center">
        Trusted by developers from <span className="font-semibold text-foreground">{countries.length}+</span> countries worldwide
      </p>

      <div className="relative overflow-hidden">
        {/* Gradient fade on left */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

        {/* Gradient fade on right */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <div
          ref={scrollRef}
          className="flex gap-4 animate-infinite-scroll hover:pause-animation"
          style={{
            width: "fit-content",
          }}
        >
          {duplicatedCountries.map((country, index) => (
            <div
              key={`${country.code}-${index}`}
              className="flex-shrink-0 group cursor-pointer"
            >
              <img
                src={`https://flagcdn.com/48x36/${country.code}.png`}
                srcSet={`https://flagcdn.com/96x72/${country.code}.png 2x, https://flagcdn.com/144x108/${country.code}.png 3x`}
                width="48"
                height="36"
                alt={country.name}
                title={country.name}
                loading="lazy"
                className="shadow-md rounded-sm transition-transform hover:scale-110 hover:shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground/60 mt-3 text-center italic">
        Hover to pause • Showing flags from every continent
      </p>
    </div>
  );
}
