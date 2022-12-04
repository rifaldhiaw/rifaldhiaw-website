function App() {
  return (
    <div className="w-screen h-screen bg-primary flex flex-col">
      <div className="text-[75vmin] text-[#15171b] leading-none  fixed top-0 left-0 font-bold ">
        Rifaldhi AW
      </div>

      <div className="flex flex-1 justify-center items-center h-full z-10 relative">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-[20vmin] text-center leading-none text-inverse">
            Rifaldhi AW
          </h1>

          <h2 className="text-[4vmin] text-inverse text-center flex gap-5 font-bold">
            Software Engineer
            <div className="text-[2vmin] rounded-full border-2 border-inverse px-5 flex items-center">
              Frontend-Heavy
            </div>
          </h2>

          <div className="flex mt-10 text-inverse justify-center text-center w-[80vw]">
            ❤ NextJs - TailwindCSS - React - Flutter - React Native - Cloudflare
            - Sentry - WebRTC ❤
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
