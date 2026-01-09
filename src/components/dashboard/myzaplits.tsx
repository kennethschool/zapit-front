import React, { useState } from "react";
import { motion } from "framer-motion";

// simple placeholder SVG icons from the internet
const DragonSVG = () => (
  <svg viewBox="0 0 80 80" className="w-28 h-28">
    <g>
      <circle cx="40" cy="40" r="34" fill="#FFB2A6" />
      <path d="M24 50c6-14 32-14 36-2" fill="#F25C54" />
    </g>
  </svg>
);
const CatSVG = () => (
  <svg viewBox="0 0 80 80" className="w-28 h-28">
    <circle cx="40" cy="40" r="34" fill="#C79EFF" />
    <path d="M28 42c6-8 24-8 28 0" fill="#8A56F5" />
  </svg>
);
const UniSVG = () => (
  <svg viewBox="0 0 80 80" className="w-28 h-28">
    <rect x="12" y="12" width="56" height="56" rx="12" fill="#CFF5FF" />
    <circle cx="40" cy="36" r="10" fill="#6BC8FF" />
  </svg>
);
const AquaSVG = () => (
  <svg viewBox="0 0 80 80" className="w-28 h-28">
    <rect x="10" y="10" width="60" height="60" rx="30" fill="#9EE0FF" />
  </svg>
);

const sampleZaplits = [
  {
    id: 1,
    name: "Flare",
    level: 4,
    type: "Fire",
    mood: 0.8,
    hp: 0.7,
    energy: 0.6,
    xp: 0.45,
    svg: DragonSVG,
    ability: "Fire boost",
  },
  {
    id: 2,
    name: "Whiskers",
    level: 5,
    type: "Earth",
    mood: 0.9,
    hp: 0.9,
    energy: 0.8,
    xp: 0.7,
    svg: CatSVG,
    ability: "Luck",
  },
  {
    id: 3,
    name: "Shimmer",
    level: 8,
    type: "Myth",
    mood: 0.6,
    hp: 0.5,
    energy: 0.7,
    xp: 0.95,
    svg: UniSVG,
    ability: "Revive",
  },
  {
    id: 4,
    name: "Aqua",
    level: 2,
    type: "Water",
    mood: 0.5,
    hp: 0.6,
    energy: 0.4,
    xp: 0.12,
    svg: AquaSVG,
    ability: "Shield",
  },
];

export default function MyZaplits() {
  const [zaplits, setZaplits] = useState(sampleZaplits);
  const [selected, setSelected] = useState(zaplits[0]);
  const [inventory, setInventory] = useState({ food: 3, toys: 2, eggs: 1 });

  function feedPet(petId) {
    setZaplits((prev) =>
      prev.map((z) =>
        z.id === petId
          ? {
              ...z,
              energy: Math.min(1, z.energy + 0.15),
              mood: Math.min(1, z.mood + 0.08),
            }
          : z
      )
    );
  }
  function playPet(petId) {
    setZaplits((prev) =>
      prev.map((z) =>
        z.id === petId
          ? {
              ...z,
              xp: Math.min(1, z.xp + 0.07),
              mood: Math.min(1, z.mood + 0.1),
            }
          : z
      )
    );
  }
  function restPet(petId) {
    setZaplits((prev) =>
      prev.map((z) =>
        z.id === petId
          ? {
              ...z,
              hp: Math.min(1, z.hp + 0.15),
              energy: Math.min(1, z.energy + 0.25),
            }
          : z
      )
    );
  }

  function trainPet(petId) {
    setZaplits((prev) =>
      prev.map((z) =>
        z.id === petId ? { ...z, xp: Math.min(1, z.xp + 0.2) } : z
      )
    );
  }

  function hatchEgg() {
    if (inventory.eggs <= 0) return;
    const newPet = {
      id: Date.now(),
      name: "Newbie",
      level: 1,
      type: "Unknown",
      mood: 0.6,
      hp: 0.6,
      energy: 0.6,
      xp: 0.05,
      svg: CatSVG,
      ability: "None",
    };
    setZaplits((prev) => [...prev, newPet]);
    setInventory((prev) => ({ ...prev, eggs: prev.eggs - 1 }));
  }

  function evolvePet(petId) {
    setZaplits((prev) =>
      prev.map((z) => {
        if (z.id !== petId) return z;
        if (z.xp < 0.9) return z;
        return {
          ...z,
          level: z.level + 1,
          xp: 0.12,
          ability: z.ability + " +",
        };
      })
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 font-sans">
      <main className="grid grid-cols-12 gap-6">
        <aside className="col-span-5 space-y-6">
          <div className="rounded-lg bg-gradient-to-br from-blue-200 to-blue-400 p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Pet Viewer</h2>
          </div>
          <div className="rounded-lg bg-background p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">
              Pet Shop / Egg System
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-400 rounded-lg flex items-center justify-center">
                <div className="text-2xl">🥚</div>
              </div>
              <div>
                <div className="font-semibold">Eggs: {inventory.eggs}</div>
                <div className="text-sm">Hatch random Zaplits</div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={hatchEgg}
                    className="px-3 py-2 rounded bg-blue-400 text-white"
                  >
                    Hatch
                  </button>
                  <button
                    onClick={() =>
                      setInventory((i) => ({ ...i, eggs: i.eggs + 1 }))
                    }
                    className="px-3 py-2 rounded border"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-background p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Zaplits Journal</h2>
            <div className="space-y-3">
              {zaplits.map((z) => (
                <div key={z.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cream-100 rounded flex items-center justify-center">
                    <z.svg />
                  </div>
                  <div>
                    <div className="font-semibold">{z.name}</div>
                    <div className="text-sm">
                      Lv. {z.level} • {z.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="col-span-3 space-y-6">
          <div className="rounded-lg bg-background p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Pet Stats Panel</h2>
            <StatRow label="HP" value={selected.hp} />
            <StatRow label="Energy" value={selected.energy} />
            <StatRow label="Mood" value={selected.mood} />
            <StatRow label="XP" value={selected.xp} />
            <div className="mt-4 text-sm">
              Power: <strong>{selected.type}</strong>
            </div>
          </div>

          <div className="rounded-lg bg-background p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Mini-care System</h2>
            <div className="flex gap-3">
              <ActionButton
                onClick={() => {
                  feedPet(selected.id);
                  setInventory((i) => ({
                    ...i,
                    food: Math.max(0, i.food - 1),
                  }));
                }}
              >
                Feed
              </ActionButton>
              <ActionButton onClick={() => playPet(selected.id)}>
                Play
              </ActionButton>
              <ActionButton onClick={() => restPet(selected.id)}>
                Rest
              </ActionButton>
            </div>
            <div className="mt-3 text-sm">
              Inventory: Food {inventory.food} • Toys {inventory.toys} • Eggs{" "}
              {inventory.eggs}
            </div>
          </div>

          <div className="rounded-lg bg-background p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Adventure / Training</h2>
            <div className="flex gap-3">
              <ActionButton onClick={() => trainPet(selected.id)}>
                Train
              </ActionButton>
              <ActionButton
                onClick={() => alert("Battle mini-game (placeholder)")}
              >
                Battle
              </ActionButton>
              <ActionButton
                onClick={() => alert("Explore mini-game (placeholder)")}
              >
                Explore
              </ActionButton>
            </div>
          </div>
        </section>

        <section className="col-span-4 space-y-6">
          <div className="rounded-lg bg-background p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Pet Display Area</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {zaplits.map((z) => (
                <motion.button
                  key={z.id}
                  onClick={() => setSelected(z)}
                  whileHover={{ scale: 1.03 }}
                  className={`rounded-lg p-4 bg-cream-100 border ${selected.id === z.id ? "ring-4 ring-yellow-200" : ""}`}
                >
                  <div className="flex justify-center mb-2">
                    <z.svg />
                  </div>
                  <div className="text-center font-semibold">{z.name}</div>
                  <div className="text-center text-sm">Lv. {z.level}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-background p-6 shadow-sm border grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Evolution System</h3>
              <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                <div
                  style={{ width: `${Math.round(selected.xp * 100)}%` }}
                  className="h-full bg-gradient-to-r from-green-400 to-yellow-400"
                />
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => evolvePet(selected.id)}
                  className="px-4 py-2 rounded bg-yellow-400 text-white font-semibold"
                >
                  Evolve
                </button>
                <button
                  onClick={() =>
                    setZaplits((prev) =>
                      prev.map((p) =>
                        p.id === selected.id
                          ? { ...p, xp: Math.min(1, p.xp + 0.12) }
                          : p
                      )
                    )
                  }
                  className="px-4 py-2 rounded border"
                >
                  Add XP
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Abilities / Game Effects</h3>
              <div className="flex items-center gap-4">
                <selected.svg />
                <div>
                  <div className="text-lg font-semibold">
                    {selected.ability}
                  </div>
                  <div className="text-sm">Passive effect in minigames</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="col-span-12 mt-4">
          <div className="rounded-lg bg-background p-4 shadow-sm border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm">Quick Actions:</div>
              <button
                onClick={() => {
                  setZaplits((prev) =>
                    prev.map((p) => ({
                      ...p,
                      mood: Math.min(1, p.mood + 0.05),
                    }))
                  );
                }}
                className="px-3 py-2 border rounded"
              >
                Cheer
              </button>
              <button
                onClick={() => {
                  setZaplits((prev) =>
                    prev.map((p) => ({
                      ...p,
                      energy: Math.min(1, p.energy + 0.1),
                    }))
                  );
                }}
                className="px-3 py-2 border rounded"
              >
                Energy Boost
              </button>
            </div>
            <div className="text-sm">
              Designed for Rive animations — replace SVGs with Rive components
              where needed.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatRow({ label, value = 0 }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{Math.round(value * 100)}%</span>
      </div>
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-yellow-400"
          style={{ width: `${Math.round(value * 100)}%` }}
        />
      </div>
    </div>
  );
}

function ActionButton({ children, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="px-4 py-2 rounded bg-cream-100 border flex-1 text-sm font-medium"
    >
      {children}
    </motion.button>
  );
}
