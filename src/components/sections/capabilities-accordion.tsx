"use client";

import { LandingAccordionItem, AccordionItemData } from "@/components/ui/interactive-image-accordion";

const customAccordionItems: AccordionItemData[] = [
  {
    id: 1,
    title: 'Grounded RAG',
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Agentic Workflows',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Backend Systems',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Product Delivery',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Evals & Refusal QA',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop',
  },
];

export function CapabilitiesAccordion() {
  return (
    <section id="capabilities" className="px-4 py-12 sm:px-6 lg:px-8 bg-slate-950/20">
      <div className="mx-auto max-w-6xl border-t border-white/5 pt-12">
        <LandingAccordionItem
          items={customAccordionItems}
          title="Architecting Production AI"
          description="Deploying generative AI into user-facing products requires bridging the gap between stochastic model outputs and deterministic software quality. I specialize in building across these core systems to deliver observable and factual solutions."
          ctaText="Explore Tech Stack"
          ctaHref="#stack"
        />
      </div>
    </section>
  );
}
