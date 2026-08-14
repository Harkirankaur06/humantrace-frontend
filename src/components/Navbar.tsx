export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center p-6">

        <h1 className="text-2xl font-bold gradientText">
          HumanTrace
        </h1>

        <div className="flex gap-8 text-sm">

          <a href="/">Home</a>

          <a href="/detect">Detect</a>

          <a href="/about">About</a>

        </div>

      </div>

    </nav>
  );
}