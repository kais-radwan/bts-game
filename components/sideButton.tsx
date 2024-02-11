"use client";

export default function SideButton({
  children,
  onClick,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={() => (onClick ? onClick() : () => {})}
      className="w-full flex items-center justify-start h-9 pl-3 pr-3 rounded-xl text-white/70 hover:bg-white/5 text-sm gap-3 transition-all"
    >
      {children}
    </button>
  );
}
