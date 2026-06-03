import React from "react";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { products } from "../../../data/products";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import FloatingContactCenter from "../../../components/FloatingContactCenter";
import { FadeIn } from "../../../components/ui/FadeIn";
import { Check, Star, Download } from "lucide-react";
import RequestQuoteClient from "./RequestQuoteClient"; // We'll create this to handle the client-side button

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);
  
  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} | PT Acewin Mello International`,
    description: product.overview,
    openGraph: {
      images: [{ url: product.image }],
    },
  };
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  // JSON-LD Product Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.overview,
    brand: {
      "@type": "Brand",
      name: "PT Acewin Mello International"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Inject Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-grow pt-[96px] md:pt-[112px]">
        {/* Product Hero */}
        <section className="bg-zinc-950 text-white">
          <div className="grid lg:grid-cols-2">
            <FadeIn direction="right" className={`relative aspect-square lg:aspect-auto lg:h-[600px] ${product.containImage ? 'bg-gray-100' : ''}`}>
              <img 
                src={product.image} 
                alt={product.name}
                className={`absolute inset-0 w-full h-full ${product.containImage ? 'object-contain p-12' : 'object-cover'}`}
              />
            </FadeIn>
            <div className="flex flex-col justify-center p-8 lg:p-16 max-w-2xl">
              <FadeIn direction="left">
                <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4 block">
                  {product.category}
                </span>
                <h1 className="text-3xl lg:text-5xl font-bold mb-6">{product.name}</h1>
                <p className="text-gray-300 text-lg leading-relaxed mb-10">
                  {product.overview}
                </p>
                <div className="flex flex-wrap gap-4">
                  <RequestQuoteClient defaultProduct={product.name} />
                  <a 
                    href="/PT_AcewinMello.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-all duration-300 rounded-md bg-white/5 hover:bg-white/15 border border-gray-500 hover:border-white shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
                  >
                    <Download className="w-5 h-5 mr-2 transition-transform group-hover:-translate-y-1" />
                    Download Brochure
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Features & Benefits */}
        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16">
              <FadeIn>
                <h2 className="text-2xl font-bold text-zinc-950 mb-8 flex items-center gap-3">
                  <Star className="text-amber-500 w-6 h-6" /> Key Features
                </h2>
                <ul className="space-y-4">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <Check className="w-5 h-5 text-emerald-900 shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <h2 className="text-2xl font-bold text-zinc-950 mb-8 flex items-center gap-3">
                  <Check className="text-emerald-900 w-6 h-6" /> Business Benefits
                </h2>
                <ul className="space-y-4">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <FloatingContactCenter />
    </div>
  );
}
