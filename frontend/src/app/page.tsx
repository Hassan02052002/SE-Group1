import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <div className="flex flex-col items-center justify-center sm:w-1/2 p-8 pb-20 gap-16 sm:p-20 bg-black">
        <main className="flex flex-col gap-8 items-center sm:items-start">
          <Image
            className="dark:invert scale-190"
            src="/nomad.svg"
            alt="Nomad logo"
            width={300}
            height={30}
            priority
          />
          <ol className="text-sm text-center sm:text-left text-white">
            <h3 className="mb-2 font-bold ">
              Welcome to Nomad
            </h3>
            <h3 className="w-96">Tired of spending hours planning your trips? Let Nomad do the work for you. Powered by cutting-edge AI, Nomad crafts personalized, efficient, and adventure-packed itineraries tailored to your interests, schedule, and budget.</h3>
          </ol>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full w-32 border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-700 text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] duration-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Login
            </a>
            <a
              className="rounded-full border border-black/[.08] dark:border-white/[.145] transition-colors duration-800 flex items-center justify-center hover:bg-[#383838] dark:hover:bg-[#383838] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 outline outline-white"
              href="/register"
              target="_blank"
              rel="noopener noreferrer"
            >
              Signup
            </a>
          </div>
        </main>
        <footer className="flex gap-6 flex-wrap items-center justify-center text-white">
          {/* footer */}
        </footer>
      </div>
      <div className="hidden sm:flex sm:w-1/2 bg-cover bg-center items-center justify-center" style={{ backgroundImage: "url('/profilegrid.svg'), linear-gradient(to bottom, #000000,rgb(0, 0, 0))", backgroundSize: "contain, cover", backgroundRepeat: "no-repeat" }}>
        {/* <Image
          className="dark:invert scale-190 p-2"
          src="/nomad.svg"
          alt="Nomad logo"
          width={300}
          height={30}
          priority
        /> */}
      </div>
    </div>
  );
}
