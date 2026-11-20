import Image from "next/image";

// Isologo oficial (recortado del logo en alta: scripts/brand-isologo.mjs).
// `mono` lo pinta en blanco para usarlo como marca de agua sobre fondos oscuros.
export function Isotipo({ className = "h-9 w-9", mono = false }: { className?: string; mono?: boolean }) {
  return (
    <Image
      src="/brand/isologo-hd.png"
      alt=""
      width={365}
      height={375}
      priority
      className={`object-contain ${mono ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}

// Logotipo: replica la composición oficial (Ethos + línea teal + eslogan) en texto vivo,
// para que se vea nítido a cualquier tamaño y funcione sobre fondo claro u oscuro.
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className={light ? "grid h-11 w-11 place-items-center rounded-xl bg-white p-1.5" : ""}>
        <Isotipo className={light ? "h-full w-full" : "h-10 w-10"} />
      </span>
      <span className="leading-none">
        <span className={`block text-[1.55rem] font-bold tracking-tight ${light ? "text-white" : "text-ethos"}`}>
          Ethos
        </span>
        <span className="hidden sm:block">
          <span className="mt-1 block h-px bg-teal" />
          <span className={`mt-1 block text-[0.58rem] font-medium ${light ? "text-white/70" : "text-slogan"}`}>
            Distribución y soluciones para la salud
          </span>
        </span>
      </span>
    </span>
  );
}
