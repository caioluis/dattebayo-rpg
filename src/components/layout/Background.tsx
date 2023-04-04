import Image from "next/image";

export default function Background({ src }: { src: string }) {
  return (
    <div className="fixed z-[-1] h-screen w-screen">
      <Image
        src={src}
        alt="Background"
        fill={true}
        className="aspect-w-16 aspect-h-9 object-cover"
        style={{
          WebkitMaskImage: "-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,0)), to(rgba(0,0,0,0.2)))"
        }}
      />
    </div>
  );
}
