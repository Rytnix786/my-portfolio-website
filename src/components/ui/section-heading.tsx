import { Reveal } from "@/components/motion/reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-7 text-slate-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
