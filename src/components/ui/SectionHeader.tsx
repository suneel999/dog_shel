interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-14 ${centered ? 'text-center' : ''}`}>
      <div className={`eyebrow ${centered ? 'mx-auto' : ''}`}>Second Chance Tails</div>
      <h2 className="mt-5 text-3xl font-black leading-tight text-[#13233d] md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-7 h-[3px] w-24 rounded-full bg-[linear-gradient(90deg,#9d5c2f_0%,#287271_100%)] ${
          centered ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
}
