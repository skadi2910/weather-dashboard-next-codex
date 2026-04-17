import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#102038,#07101a)] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/6 p-4 backdrop-blur-xl lg:grid-cols-[1.45fr_0.85fr] lg:p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <Skeleton className="h-4 w-32 bg-white/10" />
                <Skeleton className="h-14 w-72 bg-white/14" />
                <Skeleton className="h-4 w-52 bg-white/10" />
              </div>
              <Skeleton className="h-12 w-44 rounded-full bg-white/10" />
            </div>

            <Skeleton className="h-12 w-full rounded-full bg-white/10" />

            <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
              <Skeleton className="min-h-[20rem] rounded-[2rem] bg-white/10" />
              <Skeleton className="min-h-[20rem] rounded-[2rem] bg-white/10" />
            </div>
          </div>

          <Skeleton className="min-h-[24rem] rounded-[2rem] bg-white/10" />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Skeleton className="min-h-[28rem] rounded-[2rem] bg-white/10" />
          <div className="grid gap-6">
            <Skeleton className="min-h-[12rem] rounded-[2rem] bg-white/10" />
            <Skeleton className="min-h-[16rem] rounded-[2rem] bg-white/10" />
          </div>
        </section>
      </div>
    </main>
  );
}
