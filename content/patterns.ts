import { Pattern } from "@/types/pattern";

export const gridPatterns: Pattern[] = [
    {
        id: "dark-radial-glow",
        name: "Dark Radial Glow",
        category: "gradients",
        style: {
          background: "#020617",
          backgroundImage:
            "radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-[#020617] relative">
  {/* Dark Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)\`,
    }}
  />
     {/* Your Content/Components */}
</div>`,
      },
    {
        id: "blue-radial-glow",
        name: "Blue Radial Glow",
        category: "gradients",
        style: {
          background: "#0f172a",
          backgroundImage:
            "radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-[#0f172a] relative">
  {/* Blue Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)\`,
    }}
  />
     {/* Your Content/Components */}
</div>`,
      },
    {
        id: "purple-radial-glow",
        name: "Purple Radial Glow",
        category: "gradients",
        badge: "New",
        style: {
          background: "#020617",
          backgroundImage:
            "radial-gradient(circle 500px at 50% 100px, rgba(139,92,246,0.4), transparent)",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-[#020617] relative">
  {/* Purple Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`radial-gradient(circle 500px at 50% 100px, rgba(139,92,246,0.4), transparent)\`,
    }}
  />
     {/* Your Content/Components */}
</div>`,
      },
    {
        id: "cyan-radial-glow",
        name: "Cyan Radial Glow",
        category: "gradients",
        badge: "New",
        style: {
          background: "#020617",
          backgroundImage:
            "radial-gradient(circle 500px at 50% 100px, rgba(6,182,212,0.4), transparent)",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-[#020617] relative">
  {/* Cyan Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`radial-gradient(circle 500px at 50% 100px, rgba(6,182,212,0.4), transparent)\`,
    }}
  />
  {/* Your Content/Components */}
</div>`,
      },
    {
        id: "orange-radial-glow",
        name: "Orange Radial Glow",
        category: "gradients",
        style: {
          background: "#020617",
          backgroundImage:
            "radial-gradient(circle 500px at 50% 100px, rgba(249,115,22,0.4), transparent)",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-[#020617] relative">
  {/* Orange Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`radial-gradient(circle 500px at 50% 100px, rgba(249,115,22,0.4), transparent)\`,
    }}
  />
  {/* Your Content/Components */}
</div>`,
      },
    {
        id: "pink-radial-glow",
        name: "Pink Radial Glow",
        category: "gradients",
        badge: "New",
        style: {
          background: "#020617",
          backgroundImage:
            "radial-gradient(circle 500px at 50% 100px, rgba(236,72,153,0.4), transparent)",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-[#020617] relative">
  {/* Pink Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`radial-gradient(circle 500px at 50% 100px, rgba(236,72,153,0.4), transparent)\`,
    }}
  />
  {/* Your Content/Components */}
</div>`,
      },
    {
        id: "gold-radial-glow",
        name: "Gold Radial Glow",
        category: "gradients",
        style: {
          background: "#020617",
          backgroundImage:
            "radial-gradient(circle 500px at 50% 100px, rgba(251,191,36,0.4), transparent)",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-[#020617] relative">
  {/* Gold Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`radial-gradient(circle 500px at 50% 100px, rgba(251,191,36,0.4), transparent)\`,
    }}
  />
  {/* Your Content/Components */}
</div>`,
      },
    {
        id: "red-radial-glow",
        name: "Red Radial Glow",
        category: "gradients",
        style: {
          background: "#020617",
          backgroundImage:
            "radial-gradient(circle 500px at 50% 100px, rgba(239,68,68,0.4), transparent)",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-[#020617] relative">
  {/* Red Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`radial-gradient(circle 500px at 50% 100px, rgba(239,68,68,0.4), transparent)\`,
    }}
  />
  {/* Your Content/Components */}
</div>`,
      },
    {
        id: "lime-radial-glow",
        name: "Lime Radial Glow",
        category: "gradients",
        badge: "New",
        style: {
          background: "#020617",
          backgroundImage:
            "radial-gradient(circle 500px at 50% 100px, rgba(132,204,22,0.4), transparent)",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-[#020617] relative">
  {/* Lime Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`radial-gradient(circle 500px at 50% 100px, rgba(132,204,22,0.4), transparent)\`,
    }}
  />
  {/* Your Content/Components */}
</div>`,
      },
    {
        id: "emerald-radial-glow",
        name: "Emerald Radial Glow",
        category: "gradients",
        badge: "New",
        style: {
          background: "#020617",
          backgroundImage:
            "radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-[#020617] relative">
  {/* Emerald Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)\`,
    }}
  />
     {/* Your Content/Components */}
</div>`,
      },
    {
        id: "aurora-waves",
        name: "Aurora Waves",
        category: "gradients",
        badge: "New",
        description: "Dynamic aurora borealis inspired wave pattern",
        style: {
          background: `linear-gradient(45deg, #1a1a1a 0%, #003366 100%),
        repeating-linear-gradient(
          45deg,
          rgba(0, 255, 255, 0.1) 0px,
          rgba(0, 255, 255, 0.1) 20px,
          rgba(0, 255, 0, 0.1) 20px,
          rgba(0, 255, 0, 0.1) 40px
        ),
        radial-gradient(
          circle at 50% 50%,
          rgba(32, 196, 232, 0.3) 0%,
          rgba(76, 201, 240, 0.1) 100%
        )`,
          backgroundBlendMode: "normal, overlay, overlay",
          animation: "aurora 8s linear infinite",
        },
        tailwindCode: `<div className="min-h-screen w-full relative">
  {/* Aurora Waves Pattern */}
  <style>{\`
    @keyframes aurora {
      0% { transform: scale(1) rotate(0deg); opacity: 0.5; }
      50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
      100% { transform: scale(1) rotate(360deg); opacity: 0.5; }
    }
  \`}</style>
  <div
    className="absolute inset-0 z-0"
    style={{
      background: \`linear-gradient(45deg, #1a1a1a 0%, #003366 100%),
        repeating-linear-gradient(
          45deg,
          rgba(0, 255, 255, 0.1) 0px,
          rgba(0, 255, 255, 0.1) 20px,
          rgba(0, 255, 0, 0.1) 20px,
          rgba(0, 255, 0, 0.1) 40px
        ),
        radial-gradient(
          circle at 50% 50%,
          rgba(32, 196, 232, 0.3) 0%,
          rgba(76, 201, 240, 0.1) 100%
        )\`,
      backgroundBlendMode: "normal, overlay, overlay",
      animation: "aurora 8s linear infinite",
    }}
  />
  {/* Your Content/Components */}
</div>`,
      },
    {
        id: "aurora-midnight-glow",
        name: "Aurora Midnight Glow",
        category: "gradients",
        badge: "New",
        style: {
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
        },
        tailwindCode: `<div className="min-h-screen w-full relative bg-black">
    {/* X Organizations Black Background with Top Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
       background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
      }}
    />
  
    {/* Your Content/Components */}
  </div>`,
      },
    {
        id: "crimson-shadow-glow",
        name: "Crimson Shadow Glow",
        category: "gradients",
        badge: "New",
        style: {
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 80, 120, 0.25), transparent 70%), #000000",
        },
        tailwindCode: `<div className="min-h-screen w-full relative bg-black">
    {/* Crimson Shadow Background with Top Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 80, 120, 0.25), transparent 70%), #000000",
      }}
    />
  
    {/* Your Content/Components */}
  </div>`,
      },
    {
        id: "emerald-depths-glow",
        name: "Emerald Depths Glow",
        category: "gradients",
        badge: "New",
        style: {
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000",
        },
        tailwindCode: `<div className="min-h-screen w-full relative bg-black">
    {/* Emerald Depths Background with Top Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000",
      }}
    />
  
    {/* Your Content/Components */}
  </div>`,
      },
    {
        id: "violet-storm-glow",
        name: "Violet Storm Glow",
        category: "gradients",
        badge: "New",
        style: {
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
        },
        tailwindCode: `<div className="min-h-screen w-full relative bg-black">
    {/* Violet Storm Background with Top Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
      }}
    />
  
    {/* Your Content/Components */}
  </div>`,
      },
    {
        id: "golden-horizon-glow",
        name: "Golden Horizon Glow",
        category: "gradients",
        badge: "New",
        style: {
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(251, 191, 36, 0.25), transparent 70%), #000000",
        },
        tailwindCode: `<div className="min-h-screen w-full relative bg-black">
    {/* Golden Horizon Background with Top Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(251, 191, 36, 0.25), transparent 70%), #000000",
      }}
    />
  
    {/* Your Content/Components */}
  </div>`,
      },
    {
        id: "ocean-abyss-glow",
        name: "Ocean Abyss Glow",
        category: "gradients",
        badge: "New",
        style: {
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",
        },
        tailwindCode: `<div className="min-h-screen w-full relative bg-black">
    {/* Ocean Abyss Background with Top Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",
      }}
    />
  
    {/* Your Content/Components */}
  </div>`,
      },
    {
        id: "rose-twilight-glow",
        name: "Rose Twilight Glow",
        category: "gradients",
        badge: "New",
        style: {
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(244, 114, 182, 0.25), transparent 70%), #000000",
        },
        tailwindCode: `<div className="min-h-screen w-full relative bg-black">
    {/* Rose Twilight Background with Top Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(244, 114, 182, 0.25), transparent 70%), #000000",
      }}
    />
  
    {/* Your Content/Components */}
  </div>`,
      },
    {
        id: "copper-forge-glow",
        name: "Copper Forge Glow",
        category: "gradients",
        badge: "New",
        style: {
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249, 115, 22, 0.25), transparent 70%), #000000",
        },
        tailwindCode: `<div className="min-h-screen w-full relative bg-black">
    {/* Copper Forge Background with Top Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249, 115, 22, 0.25), transparent 70%), #000000",
      }}
    />
  
    {/* Your Content/Components */}
  </div>`,
      },
    {
        id: "arctic-lights-glow",
        name: "Arctic Lights Glow",
        category: "gradients",
        badge: "New",
        style: {
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34, 197, 94, 0.25), transparent 70%), #000000",
        },
        tailwindCode: `<div className="min-h-screen w-full relative bg-black">
    {/* Arctic Lights Background with Top Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34, 197, 94, 0.25), transparent 70%), #000000",
      }}
    />
  
    {/* Your Content/Components */}
  </div>`,
      },
    {
        id: "indigo-cosmos-glow",
        name: "Indigo Cosmos Glow",
        category: "gradients",
        badge: "New",
        style: {
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",
        },
        tailwindCode: `<div className="min-h-screen w-full relative bg-black">
    {/* Indigo Cosmos Background with Top Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",
      }}
    />
  
    {/* Your Content/Components */}
  </div>`,
      },
    {
        id: "pearl-mist-glow",
        name: "Pearl Mist Glow",
        category: "gradients",
        badge: "New",
        style: {
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
        },
        tailwindCode: `<div className="min-h-screen w-full relative bg-black">
    {/* Pearl Mist Background with Top Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
      }}
    />
  
    {/* Your Content/Components */}
  </div>`,
      },
    {
        id: "magenta-nebula-glow",
        name: "Magenta Nebula Glow",
        category: "gradients",
        badge: "New",
        style: {
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(236, 72, 153, 0.25), transparent 70%), #000000",
        },
        tailwindCode: `<div className="min-h-screen w-full relative bg-black">
    {/* Magenta Nebula Background with Top Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(236, 72, 153, 0.25), transparent 70%), #000000",
      }}
    />
  
    {/* Your Content/Components */}
  </div>`,
      },
    {
        id: "pink-aurora-top",
        name: "Pink Aurora Top",
        category: "gradients",
        badge: "New",
        style: {
          background: "#000000",
          backgroundImage: `
     radial-gradient(
       circle at top,
       rgba(255, 255, 255, 0.08) 0%,
       rgba(255, 140, 250, 0.08) 20%,
       rgba(0, 0, 0, 0.0) 60%
     )
   `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-black relative overflow-hidden">
 {/* Pink Aurora Top Background */}
 <div
   className="absolute inset-0 z-0 pointer-events-none"
   style={{
     background: \`
       radial-gradient(
         circle at top,
         rgba(255, 255, 255, 0.08) 0%,
         rgba(255, 140, 250, 0.08) 20%,
         rgba(0, 0, 0, 0.0) 60%
       )
     \`,
   }}
 />
 {/* Your Content Here */}
</div>`,
      },
    {
        id: "midnight-aurora-glow",
        name: "Midnight Aurora Glow",
        category: "gradients",
        badge: "New",
        style: {
          background: "#000000",
          backgroundImage: `
      radial-gradient(circle at 50% 50%, 
        rgba(58, 123, 255, 0.25) 0%,       /* Electric Blue */
        rgba(100, 149, 237, 0.15) 25%,    /* Cornflower Blue */
        rgba(123, 104, 238, 0.07) 35%,    /* Medium Slate Blue */
        transparent 50%
      )
    `,
        },
        tailwindCode: `<div className="min-h-screen w-full bg-black relative">
    {/* Midnight Aurora Glow Background */}
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: \`
          radial-gradient(circle at 50% 50%, 
            rgba(58, 123, 255, 0.25) 0%, 
            rgba(100, 149, 237, 0.15) 25%, 
            rgba(123, 104, 238, 0.07) 35%, 
            transparent 50%
          )
        \`,
      }}
    />
    {/* Your Content/Components */}
  </div>`,
      },
    {
        id: "midnight-radial-glow",
        name: "Midnight Radial Glow",
        category: "gradients",
        badge: "New",
        style: {
          background: "#000000",
          backgroundImage: `
      radial-gradient(circle at 50% 50%, 
        rgba(226, 232, 240, 0.2) 0%, 
        rgba(226, 232, 240, 0.1) 25%, 
        rgba(226, 232, 240, 0.05) 35%, 
        transparent 50%
      )
    `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen bg-black w-full relative">
  {/* Midnight Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: \`
        radial-gradient(circle at 50% 50%, 
          rgba(226, 232, 240, 0.2) 0%, 
          rgba(226, 232, 240, 0.1) 25%, 
          rgba(226, 232, 240, 0.05) 35%, 
          transparent 50%
        )
      \`,
    }}
  />
  {/* Your Content/Components */}
</div>`,
      },
    {
        id: "deep-navy-gold",
        name: "Deep Navy & Gold",
        category: "gradients",
        badge: "New",
        style: {
          background: "#0f172a",
          backgroundImage: `
        radial-gradient(circle at 50% 50%, 
          rgba(251, 191, 36, 0.15) 0%, 
          rgba(251, 191, 36, 0.08) 25%, 
          rgba(251, 191, 36, 0.03) 35%, 
          transparent 50%
        )
      `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-slate-900 relative">
  {/* Deep Navy & Gold Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`
        radial-gradient(circle at 50% 50%, 
          rgba(251, 191, 36, 0.15) 0%, 
          rgba(251, 191, 36, 0.08) 25%, 
          rgba(251, 191, 36, 0.03) 35%, 
          transparent 50%
        )
      \`,
      backgroundSize: "100% 100%",
    }}
  />
  {/* Your Content/Components */}
</div>`,
      },
    {
        id: "rich-burgundy",
        name: "Rich Burgundy",
        category: "gradients",
        style: {
          background: "#1c1917",
          backgroundImage: `
        radial-gradient(circle at 50% 50%, 
          rgba(220, 38, 38, 0.2) 0%, 
          rgba(220, 38, 38, 0.12) 25%, 
          rgba(220, 38, 38, 0.06) 35%, 
          transparent 50%
        )
      `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-stone-900 relative">
  {/* Rich Burgundy Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`
        radial-gradient(circle at 50% 50%, 
          rgba(220, 38, 38, 0.2) 0%, 
          rgba(220, 38, 38, 0.12) 25%, 
          rgba(220, 38, 38, 0.06) 35%, 
          transparent 50%
        )
      \`,
      backgroundSize: "100% 100%",
    }}
  />
  {/* Your Content/Components */}
</div>`,
      },
    {
        id: "forest-emerald",
        name: "Forest Emerald",
        category: "gradients",
        style: {
          background: "#111827",
          backgroundImage: `
        radial-gradient(circle at 50% 50%, 
          rgba(34, 197, 94, 0.18) 0%, 
          rgba(34, 197, 94, 0.1) 25%, 
          rgba(34, 197, 94, 0.04) 35%, 
          transparent 50%
        )
      `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-gray-900 relative">
  {/* Forest Emerald Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`
        radial-gradient(circle at 50% 50%, 
          rgba(34, 197, 94, 0.18) 0%, 
          rgba(34, 197, 94, 0.1) 25%, 
          rgba(34, 197, 94, 0.04) 35%, 
          transparent 50%
        )
      \`,
      backgroundSize: "100% 100%",
    }}
  />
  {/* Your Content/Components */}
</div>`,
      },
    {
        id: "royal-purple",
        name: "Royal Purple",
        category: "gradients",
        style: {
          background: "#18181b",
          backgroundImage: `
        radial-gradient(circle at 50% 50%, 
          rgba(147, 51, 234, 0.2) 0%, 
          rgba(147, 51, 234, 0.12) 25%, 
          rgba(147, 51, 234, 0.05) 35%, 
          transparent 50%
        )
      `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-zinc-900 relative">
  {/* Royal Purple Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`
        radial-gradient(circle at 50% 50%, 
          rgba(147, 51, 234, 0.2) 0%, 
          rgba(147, 51, 234, 0.12) 25%, 
          rgba(147, 51, 234, 0.05) 35%, 
          transparent 50%
        )
      \`,
      backgroundSize: "100% 100%",
    }}
  />
  {/* Your Content/Components */}
</div>`,
      },
    {
        id: "copper-bronze",
        name: "Copper & Bronze",
        category: "gradients",
        style: {
          background: "#1c1917",
          backgroundImage: `
        radial-gradient(circle at 50% 50%, 
          rgba(194, 65, 12, 0.18) 0%, 
          rgba(194, 65, 12, 0.1) 25%, 
          rgba(194, 65, 12, 0.04) 35%, 
          transparent 50%
        )
      `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-stone-900 relative">
  {/* Copper & Bronze Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`
        radial-gradient(circle at 50% 50%, 
          rgba(194, 65, 12, 0.18) 0%, 
          rgba(194, 65, 12, 0.1) 25%, 
          rgba(194, 65, 12, 0.04) 35%, 
          transparent 50%
        )
      \`,
      backgroundSize: "100% 100%",
    }}
  />
  {/* Your Content/Components */}
</div>`,
      },
    {
        id: "steel-blue",
        name: "Steel Blue",
        category: "gradients",
        style: {
          background: "#0c0a09",
          backgroundImage: `
        radial-gradient(circle at 50% 50%, 
          rgba(59, 130, 246, 0.16) 0%, 
          rgba(59, 130, 246, 0.09) 25%, 
          rgba(59, 130, 246, 0.04) 35%, 
          transparent 50%
        )
      `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-stone-950 relative">
  {/* Steel Blue Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`
        radial-gradient(circle at 50% 50%, 
          rgba(59, 130, 246, 0.16) 0%, 
          rgba(59, 130, 246, 0.09) 25%, 
          rgba(59, 130, 246, 0.04) 35%, 
          transparent 50%
        )
      \`,
      backgroundSize: "100% 100%",
    }}
  />
  {/* Your Content/Components */}
</div>`,
      },
    {
        id: "warm-amber",
        name: "Warm Amber",
        category: "gradients",
        badge: "New",
        style: {
          background: "#0f0f23",
          backgroundImage: `
        radial-gradient(circle at 50% 50%, 
          rgba(245, 158, 11, 0.14) 0%, 
          rgba(245, 158, 11, 0.08) 25%, 
          rgba(245, 158, 11, 0.03) 35%, 
          transparent 50%
        )
      `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full relative" style={{ backgroundColor: "#0f0f23" }}>
  {/* Warm Amber Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`
        radial-gradient(circle at 50% 50%, 
          rgba(245, 158, 11, 0.14) 0%, 
          rgba(245, 158, 11, 0.08) 25%, 
          rgba(245, 158, 11, 0.03) 35%, 
          transparent 50%
        )
      \`,
      backgroundSize: "100% 100%",
    }}
  />
  {/* Your Content/Components */}
</div>`,
      },
    {
        id: "moonlight-silver",
        name: "Moonlight Silver",
        category: "gradients",
        style: {
          background: "#020617",
          backgroundImage: `
        radial-gradient(circle at 50% 50%, 
          rgba(203, 213, 225, 0.12) 0%, 
          rgba(203, 213, 225, 0.07) 25%, 
          rgba(203, 213, 225, 0.03) 35%, 
          transparent 50%
        )
      `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-slate-950 relative">
  {/* Moonlight Silver Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: \`
        radial-gradient(circle at 50% 50%, 
          rgba(203, 213, 225, 0.12) 0%, 
          rgba(203, 213, 225, 0.07) 25%, 
          rgba(203, 213, 225, 0.03) 35%, 
          transparent 50%
        )
      \`,
      backgroundSize: "100% 100%",
    }}
  />
  {/* Your Content/Components */}
</div>`,
      },
    {
        id: "center-spotlight-white",
        name: "White Spotlight",
        category: "gradients",
        badge: "New",
        style: {
          background: "#000000",
          backgroundImage: `
        radial-gradient(
          circle at center,
          rgba(255, 255, 255, 0.08) 0%,
          rgba(255, 255, 255, 0.04) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-black relative overflow-hidden">
  {/* White Spotlight Background */}
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      background: \`
        radial-gradient(
          circle at center,
          rgba(255, 255, 255, 0.08) 0%,
          rgba(255, 255, 255, 0.04) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      \`,
    }}
  />
  {/* Your Content Here */}
</div>`,
      },
    {
        id: "center-spotlight-blue",
        name: "Blue Spotlight",
        category: "gradients",
        badge: "New",
        style: {
          background: "#000000",
          backgroundImage: `
        radial-gradient(
          circle at center,
          rgba(59, 130, 246, 0.12) 0%,
          rgba(59, 130, 246, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-black relative overflow-hidden">
  {/* Blue Spotlight Background */}
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      background: \`
        radial-gradient(
          circle at center,
          rgba(59, 130, 246, 0.12) 0%,
          rgba(59, 130, 246, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      \`,
    }}
  />
  {/* Your Content Here */}
</div>`,
      },
    {
        id: "center-spotlight-emerald",
        name: "Emerald Spotlight",
        category: "gradients",
        style: {
          background: "#000000",
          backgroundImage: `
        radial-gradient(
          circle at center,
          rgba(34, 197, 94, 0.12) 0%,
          rgba(34, 197, 94, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-black relative overflow-hidden">
  {/* Emerald Spotlight Background */}
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      background: \`
        radial-gradient(
          circle at center,
          rgba(34, 197, 94, 0.12) 0%,
          rgba(34, 197, 94, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      \`,
    }}
  />
  {/* Your Content Here */}
</div>`,
      },
    {
        id: "center-spotlight-crimson",
        name: "Crimson Spotlight",
        category: "gradients",
        style: {
          background: "#000000",
          backgroundImage: `
        radial-gradient(
          circle at center,
          rgba(239, 68, 68, 0.12) 0%,
          rgba(239, 68, 68, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-black relative overflow-hidden">
  {/* Crimson Spotlight Background */}
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      background: \`
        radial-gradient(
          circle at center,
          rgba(239, 68, 68, 0.12) 0%,
          rgba(239, 68, 68, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      \`,
    }}
  />
  {/* Your Content Here */}
</div>`,
      },
    {
        id: "center-spotlight-violet",
        name: "Violet Spotlight",
        category: "gradients",
        badge: "New",
        style: {
          background: "#000000",
          backgroundImage: `
        radial-gradient(
          circle at center,
          rgba(168, 85, 247, 0.12) 0%,
          rgba(168, 85, 247, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-black relative overflow-hidden">
  {/* Violet Spotlight Background */}
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      background: \`
        radial-gradient(
          circle at center,
          rgba(168, 85, 247, 0.12) 0%,
          rgba(168, 85, 247, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      \`,
    }}
  />
  {/* Your Content Here */}
</div>`,
      },
    {
        id: "center-spotlight-amber",
        name: "Amber Spotlight",
        category: "gradients",
        style: {
          background: "#000000",
          backgroundImage: `
        radial-gradient(
          circle at center,
          rgba(245, 158, 11, 0.12) 0%,
          rgba(245, 158, 11, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-black relative overflow-hidden">
  {/* Amber Spotlight Background */}
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      background: \`
        radial-gradient(
          circle at center,
          rgba(245, 158, 11, 0.12) 0%,
          rgba(245, 158, 11, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      \`,
    }}
  />
  {/* Your Content Here */}
</div>`,
      },
    {
        id: "center-spotlight-cyan",
        name: "Cyan Spotlight",
        category: "gradients",
        style: {
          background: "#000000",
          backgroundImage: `
        radial-gradient(
          circle at center,
          rgba(6, 182, 212, 0.12) 0%,
          rgba(6, 182, 212, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-black relative overflow-hidden">
  {/* Cyan Spotlight Background */}
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      background: \`
        radial-gradient(
          circle at center,
          rgba(6, 182, 212, 0.12) 0%,
          rgba(6, 182, 212, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      \`,
    }}
  />
  {/* Your Content Here */}
</div>`,
      },
    {
        id: "center-spotlight-rose",
        name: "Rose Spotlight",
        category: "gradients",
        style: {
          background: "#000000",
          backgroundImage: `
        radial-gradient(
          circle at center,
          rgba(244, 63, 94, 0.12) 0%,
          rgba(244, 63, 94, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-black relative overflow-hidden">
  {/* Rose Spotlight Background */}
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      background: \`
        radial-gradient(
          circle at center,
          rgba(244, 63, 94, 0.12) 0%,
          rgba(244, 63, 94, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      \`,
    }}
  />
  {/* Your Content Here */}
</div>`,
      },
    {
        id: "center-spotlight",
        name: "Center Spotlight",
        category: "gradients",
        badge: "New",
        style: {
          background: "#000000",
          backgroundImage: `
     radial-gradient(
       circle at center,
       rgba(255, 255, 255, 0.08) 0%,
       rgba(255, 255, 255, 0.04) 20%,
       rgba(0, 0, 0, 0.0) 60%
     )
   `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-black relative overflow-hidden">
 {/* Center Spotlight Background */}
 <div
   className="absolute inset-0 z-0 pointer-events-none"
   style={{
     background: \`
       radial-gradient(
         circle at center,
         rgba(255, 255, 255, 0.08) 0%,
         rgba(255, 255, 255, 0.04) 20%,
         rgba(0, 0, 0, 0.0) 60%
       )
     \`,
   }}
 />
 {/* Your Content Here */}
</div>`,
      },
    {
        id: "top-spotlight",
        name: "Top Spotlight",
        category: "gradients",
        badge: "New",
        style: {
          background: "#000000",
          backgroundImage: `
     radial-gradient(
       circle at top,
       rgba(255, 255, 255, 0.08) 0%,
       rgba(255, 255, 255, 0.08) 20%,
       rgba(0, 0, 0, 0.0) 60%
     )
   `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-black relative overflow-hidden">
 {/* Top Spotlight Background */}
 <div
   className="absolute inset-0 z-0 pointer-events-none"
   style={{
     background: \`
       radial-gradient(
         circle at top,
         rgba(255, 255, 255, 0.08) 0%,
         rgba(255, 255, 255, 0.08) 20%,
         rgba(0, 0, 0, 0.0) 60%
       )
     \`,
   }}
 />
 {/* Your Content Here */}
</div>`,
      },
    {
        id: "aurora-edge-glow",
        name: "Aurora Edge Glow",
        category: "gradients",
        badge: "New",
        style: {
          background: "#000000",
          backgroundImage: `
     radial-gradient(ellipse 50% 100% at 10% 0%, rgba(226, 232, 240, 0.15), transparent 65%)
   `,
          backgroundSize: "100% 100%",
        },
        tailwindCode: `<div className="min-h-screen w-full bg-black relative overflow-hidden">
 {/* Aurora Edge Glow Background */}
 <div
   className="absolute inset-0 z-0"
   style={{
     background: "radial-gradient(ellipse 50% 100% at 10% 0%, rgba(226, 232, 240, 0.15), transparent 65%), #000000",
   }}
 />
 {/* Your Content Here */}
</div>`,
      },
    {
        id: "prismatic-aurora-burst",
        name: "Prismatic Aurora Burst",
        category: "gradients",
        badge: "New",
        style: {
          background: `
        radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
        radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
        radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
        radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
        #000000
      `,
        },
        tailwindCode: `<div className="min-h-screen w-full relative bg-black">
    {/* Prismatic Aurora Burst - Multi-layered Gradient */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: \`
          radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
          radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
          radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
          radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
          #000000
        \`,
      }}
    />
    {/* Your Content/Components */}
  </div>`,
      },
    {
        id: "cosmic-nebula",
        name: "Cosmic Nebula",
        category: "gradients",
        badge: "New",
        style: {
          background: `
     radial-gradient(ellipse 110% 70% at 25% 80%, rgba(147, 51, 234, 0.12), transparent 55%),
     radial-gradient(ellipse 130% 60% at 75% 15%, rgba(59, 130, 246, 0.10), transparent 65%),
     radial-gradient(ellipse 80% 90% at 20% 30%, rgba(236, 72, 153, 0.14), transparent 50%),
     radial-gradient(ellipse 100% 40% at 60% 70%, rgba(16, 185, 129, 0.08), transparent 45%),
     #000000
   `,
        },
        tailwindCode: `<div className="min-h-screen w-full bg-black relative">
 {/* Cosmic Nebula */}
 <div
   className="absolute inset-0 z-0"
   style={{
     background: \`
       radial-gradient(ellipse 110% 70% at 25% 80%, rgba(147, 51, 234, 0.12), transparent 55%),
       radial-gradient(ellipse 130% 60% at 75% 15%, rgba(59, 130, 246, 0.10), transparent 65%),
       radial-gradient(ellipse 80% 90% at 20% 30%, rgba(236, 72, 153, 0.14), transparent 50%),
       radial-gradient(ellipse 100% 40% at 60% 70%, rgba(16, 185, 129, 0.08), transparent 45%),
       #000000
     \`,
   }}
 />
 {/* Your Content/Components */}
</div>`,
      },
    {
        id: "stellar-mist",
        name: "Stellar Mist",
        category: "gradients",
        badge: "New",
        style: {
          background: `
     radial-gradient(ellipse 140% 50% at 15% 60%, rgba(124, 58, 237, 0.11), transparent 48%),
     radial-gradient(ellipse 90% 80% at 85% 25%, rgba(245, 101, 101, 0.09), transparent 58%),
     radial-gradient(ellipse 120% 65% at 40% 90%, rgba(34, 197, 94, 0.13), transparent 52%),
     radial-gradient(ellipse 100% 45% at 70% 5%, rgba(251, 191, 36, 0.07), transparent 42%),
     radial-gradient(ellipse 80% 75% at 90% 80%, rgba(168, 85, 247, 0.10), transparent 55%),
     #000000
   `,
        },
        tailwindCode: `<div className="min-h-screen w-full bg-black relative">
 {/* Stellar Mist */}
 <div
   className="absolute inset-0 z-0"
   style={{
     background: \`
       radial-gradient(ellipse 140% 50% at 15% 60%, rgba(124, 58, 237, 0.11), transparent 48%),
       radial-gradient(ellipse 90% 80% at 85% 25%, rgba(245, 101, 101, 0.09), transparent 58%),
       radial-gradient(ellipse 120% 65% at 40% 90%, rgba(34, 197, 94, 0.13), transparent 52%),
       radial-gradient(ellipse 100% 45% at 70% 5%, rgba(251, 191, 36, 0.07), transparent 42%),
       radial-gradient(ellipse 80% 75% at 90% 80%, rgba(168, 85, 247, 0.10), transparent 55%),
       #000000
     \`,
   }}
 />
 {/* Your Content/Components */}
</div>`,
      }
];
