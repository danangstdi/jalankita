import TentangAplikasi from "./_partials/TentangAplikasi";
import TentangKami from "./_partials/TentangKami";

export default function Tentang() {
  return (
    <div className="font-sans p-8 bg-slate-900 text-slate-200">
      <TentangKami />
      <TentangAplikasi />
    </div>
  );
}