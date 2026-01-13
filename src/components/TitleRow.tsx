export default function TitleRow({ title }: { title: string }) {
  return (
    <div className="mx-auto flex max-w-[1400px] items-end justify-between px-4 md:px-8">
      <h2 className="text-base font-bold tracking-wide text-zinc-100 md:text-lg">
        {title}
      </h2>
    </div>
  );
}
