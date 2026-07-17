import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import PromptSection from "@/components/dashboard/PromptSection";
import ConfigCard from "@/components/dashboard/ConfigCard";
import DashboardContent from "@/components/dashboard/DashboardContent";

export default function Home() {
  return (
    <main
      className="
      min-h-screen
      bg-background
      text-foreground
      "
    >
      <div className="flex min-h-screen">

        {/* Sidebar */}

        <aside
          className="
          hidden
          lg:flex
          lg:w-[270px]
          lg:flex-shrink-0
          border-r
          border-white/5
          bg-[#0b0b0b]/90
          backdrop-blur-xl
          "
        >
          <Sidebar />
        </aside>

        {/* Main */}

        <div className="flex min-h-screen flex-1 flex-col">

          <Topbar />

          <div className="flex-1 overflow-y-auto">

            <div
              className="
              mx-auto
              w-full
              max-w-[1650px]
              px-8
              py-10
              xl:px-12
              "
            >

              {/* Hero */}

              <section className="mb-10">

                <h1
                  className="
                  text-4xl
                  font-semibold
                  tracking-tight
                  text-white
                  "
                >
                  Greetings,
                  <span className="ml-2 text-red-500">
                    Dev User
                  </span>
                </h1>

                <p
                  className="
                  mt-3
                  max-w-4xl
                  text-[15px]
                  leading-7
                  text-zinc-400
                  "
                >
                  Describe your application idea and let the pipeline generate
                  a production-ready architecture, schema, application
                  specification and validation report.
                </p>

              </section>

              {/* Prompt */}

              <section
                className="
                grid
                gap-7
                xl:grid-cols-[2.35fr_1fr]
                "
              >

                <PromptSection />

                <ConfigCard />

              </section>

              {/* Dashboard */}

              <section className="mt-9">

                <DashboardContent />

              </section>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}