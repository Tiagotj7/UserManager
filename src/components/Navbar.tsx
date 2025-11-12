export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-[#2b2d31]">
      <h1 className="text-2xl font-bold text-[#5865f2]">Impact Discord</h1>
      <ul className="flex gap-6 text-gray-300">
        <li className="hover:text-white cursor-pointer">Início</li>
        <li className="hover:text-white cursor-pointer">Sobre</li>
        <li className="hover:text-white cursor-pointer">Contato</li>
      </ul>
    </nav>
  );
}
