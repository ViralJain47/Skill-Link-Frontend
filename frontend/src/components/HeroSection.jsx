import Button from "./Button"

export default function HeroSection() {
  return (
    <section className="w-full py-12 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Communicate.
          <br />
          Collaborate.
          <br />
          Create.
        </h1>
        <p className="text-lg text-gray-700 max-w-md">
          WeDu provides an effective and powerful way to manage your projects
        </p>
        <Button className="bg-black hover:bg-gray-800 text-white px-6">Get Started</Button>
      </div>

      <div className="w-full md:w-1/2 mt-12 md:mt-0">
        <div className="relative w-full h-[400px]">
          <IllustrationComponent />
        </div>
      </div>
    </section>
  )
}

//we have to replace an image here
function IllustrationComponent() {
  return (
    <div className="relative w-full h-full">
      {/* Background elements */}
      <div className="absolute right-10 top-10 w-32 h-32 rounded-full bg-green-400 opacity-70"></div>
      <div className="absolute right-40 bottom-20 w-20 h-20 rounded-full bg-amber-300 opacity-70"></div>

      {/* Main board */}
      <div className="absolute right-20 top-20 w-64 h-80 bg-gray-200 rounded-lg shadow-lg overflow-hidden">
        {/* Red card */}
        <div className="absolute top-4 left-4 right-4 h-16 bg-red-400 rounded-md shadow"></div>

        {/* Yellow card */}
        <div className="absolute top-24 left-4 right-4 h-16 bg-amber-400 rounded-md shadow"></div>

        {/* Pink card */}
        <div className="absolute top-44 left-4 w-28 h-16 bg-pink-200 rounded-md shadow"></div>

        {/* Green card */}
        <div className="absolute top-44 right-4 w-28 h-16 bg-green-400 rounded-md shadow"></div>

        {/* Blue card */}
        <div className="absolute bottom-4 left-4 right-4 h-16 bg-blue-400 rounded-md shadow"></div>
      </div>

      {/* Characters */}
      <div className="absolute top-0 right-24 w-20 h-20 flex justify-center items-center">
        <div className="w-12 h-12 rounded-full bg-blue-200"></div>
        <div className="absolute top-6 w-8 h-8 rounded-full bg-black"></div>
      </div>

      <div className="absolute bottom-10 right-10 w-20 h-20 flex justify-center items-center">
        <div className="w-12 h-12 rounded-full bg-amber-200"></div>
      </div>

      <div className="absolute bottom-10 right-40 w-20 h-20 flex justify-center items-center">
        <div className="w-12 h-12 rounded-full bg-green-200"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-20 top-40 w-24 h-12 bg-green-500 rounded-full"></div>
      <div className="absolute left-10 bottom-10 w-16 h-8 bg-amber-500 rounded-full"></div>
      <div className="absolute right-60 bottom-20 w-12 h-6 bg-red-400 rounded-full"></div>
    </div>
  )
}

