import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <section className="py-10">
        <div className="container flex flex-col gap-6 md:gap-8">
          <Skeleton className="h-8 sm:h-9 w-48 mx-auto bg-primary/50" />

          <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
            <div className="flex flex-col gap-4 bg-primary/5 shadow-sm rounded-md p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-primary/5 rounded-md"
                >
                  <Skeleton className="h-[52px] sm:h-9 w-[52px] sm:w-9 rounded-full" />
                  <Skeleton className="h-[52px] sm:h-9 w-full bg-primary/5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col container">
        <Skeleton className="h-9 w-[107.31px] bg-destructive/20 self-end" />
      </section>
    </>
  );
}
