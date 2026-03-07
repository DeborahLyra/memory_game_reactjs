import { useEffect, useState } from "react";

const VOVO_PIN = "1421";

type SizeOption = "small" | "medium" | "large";
type CategoryOption =
    | "animals"
    | "plants"
    | "objects"
    | "foods"
    | "travel"
    | "music"
    | "shapes"
    | "gaming"
    | "flags"
    | "emotions"
    | "sports"
    | "weather"
    | "people"
    | "symbols"
    | "vovo";

type CardType = {
    id: number;
    value: string;
    flipped: boolean;
    matched: boolean;
};

const vovoImages = [
    "/vovo/vovo_bebendo.jpeg",
    "/vovo/vovo_bolo.jpeg",
    "/vovo/vovo_cacatua.jpeg",
    "/vovo/vovo_cartola.jpeg",
    "/vovo/vovo_cinema.jpeg",
    "/vovo/vovo_comendo.jpeg",
    "/vovo/vovo_coracao_coreano.jpeg",
    "/vovo/vovo_dando_lingua.jpeg",
    "/vovo/vovo_espantada.jpeg",
    "/vovo/vovo_flores.jpeg",
    "/vovo/vovo_joinha.jpeg",
    "/vovo/vovo_julgando.jpg",
];

const categories: Record<CategoryOption, string[]> = {
    animals: [
    "🐶","🐱","🐼","🦊","🐸","🦁","🐵","🐮","🐰","🐯","🦓","🦒",
    "🐘","🐨","🐔","🦆","🦉","🦄","🐙","🦀","🐬","🐳","🦈","🐢",
    "🐍","🦎","🐝","🦋",
    "🦔","🦭"
    ],
    
    plants: [
    "🌵","🌴","🌸","🌻","🍀","🌺","🌼","🍁","🌿","🌲","🌳","🍃",
    "🍄","🌹","🥀","🌾","🎋","🪴","🌷","🌱","🌰","🍂","🌽","🍅",
    "🥕","🌶️","🥬","🥦",
    "🥔","🧄"
    ],
    
    objects: [
    "🚗","📱","⌚","🎧","💡","📷","🖊️","🎒","💻","🖥️","🕹️","📚",
    "📦","🔑","🧸","🎁","📺","☎️","🪑","🛋️","🚲","✈️","🚀","🧯",
    "🔋","🧃","🕯️","🪟",
    "🧯","🧲"
    ],
    
    foods: [
    "🍎","🍌","🍓","🍇","🍉","🍍","🥭","🍑",
    "🍔","🍕","🌭","🍟","🥪","🌮","🍣","🍤",
    "🍩","🍪","🎂","🍰","🍫","🍬","🍿","🍯",
    "🥞","🧇","🍳","🥗",
    "🍜","🥟"
    ],
    
    travel: [
    "🗺️","🧭","🏝️","⛰️","🏜️","🌋","🏕️","🏖️",
    "🗽","🗼","🗿","🏰","🏯","⛩️","🕌","🛕",
    "✈️","🚆","🚢","🚗","🚲","🛵","🚌","🚀",
    "🌍","🌎","🌏","📸",
    "🧳","🏔️"
    ],
    
    music: [
    "🎵","🎶","🎼","🎧","🎤","🎸","🎹","🥁",
    "🎻","🎺","🎷","🪗","📻","💿","📀","🎚️",
    "🎛️","📣","🔊","🔉","🔈","🎙️","🎪",
    "⭐","🔥","❤️","💥",
    "🪘","🎹"
    ],
    
    shapes: [
    "🔴","🟠","🟡","🟢","🔵","🟣","⚫","⚪",
    "⬛","⬜","🔺","🔻","🔷","🔶","🟦","🟩",
    "🟥","🟧","🟨","🟪","⭐","❤️","💙","💚",
    "💛","🖤","🤍","🤎",
    "🔘","🔳"
    ],
    
    gaming: [
    "🎮","🕹️","👾","🎯","🧩","♟️","🎲","🃏",
    "🏆","⚔️","🛡️","🏹","💣","🧨","🔮","🪄",
    "💎","🧙","🧝","🧟","🧛","🧞","🐉","👑",
    "⭐","🔥","🗝️","📜",
    "🎰","🧿"
    ],
    
    flags: [
    "🇧🇷","🇺🇸","🇨🇦","🇫🇷","🇩🇪","🇮🇹","🇪🇸","🇵🇹",
    "🇯🇵","🇰🇷","🇨🇳","🇦🇷","🇲🇽","🇨🇱","🇨🇴","🇵🇪",
    "🇬🇧","🇮🇪","🇦🇺","🇳🇿","🇿🇦","🇪🇬","🇮🇳","🇷🇺",
    "🇸🇪","🇳🇴","🇩🇰","🇫🇮",
    "🇺🇦","🇹🇭"
    ],
    
    emotions: [
    "😀","😃","😄","😁","😆","😅","😂","🤣",
    "😊","😍","😘","😎","🤩","🥳","😭","😡",
    "😱","😴","🤯","🤔","😇","🥹","😤","😈",
    "❤️","💔","💖","💘",
    "😜","🤗"
    ],
    
    sports: [
    "⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉",
    "🥊","🥋","🎽","🏋️","🚴","🏊","🤸","⛹️",
    "🤾","🏄","🏂","⛷️","🎿","🛹","🏓","🏸",
    "🏆","🥇","🥈","🥉",
    "🥏","🎳"
    ],
    
    weather: [
    "☀️","🌤️","⛅","🌥️","☁️","🌦️","🌧️","⛈️",
    "🌩️","❄️","🌨️","☃️","⛄","🌬️","💨","🌪️",
    "🌫️","🌈","🔥","💧","🌊","🌀","☔","⚡",
    "🌙","🌞"
    ],
    
    people: [
    "👶","🧒","👦","👧","🧑","👩","👨","🧓",
    "👴","👵","👩‍⚕️","👨‍⚕️","👩‍💻","👨‍💻",
    "👩‍🎓","👨‍🎓","👩‍🚀","👨‍🚀","👩‍🍳","👨‍🍳",
    "👮","🕵️","💂","👷","🧑‍🎨","🧑‍🚒",
    "🦸","🦹",
    "🧑‍🔬","🧑‍🌾"
    ],
    
    symbols: [
    "❤️","💔","❌","⭕","✅","⚠️","❓","❗",
    "💯","🔔","🔕","⭐","🌟","✨","🔥","⚡",
    "💥","☮️","☯️","✝️","☪️","🕉️","♾️","🔒",
    "🔓","🛑","▶️","⏸️",
    "⏺️","⏹️"
    ],
    
    vovo: vovoImages
    };

const bgByCategory: Record<CategoryOption, string> = {
    animals: "/bg-animals.jpg",
    plants: "/bg-plants.jpg",
    objects: "/bg-objects.jpg",
    foods: "/bg-foods.jpg",
    travel: "/bg-travel.jpg",
    music: "/bg-music.jpg",
    shapes: "/bg-shapes.jpg",
    gaming: "/bg-gaming.jpg",

    flags: "/bg-flags.jpg",
    emotions: "/bg-emotions.jpg",
    sports: "/bg-sports.jpg",
    weather: "/bg-weather.jpg",
    people: "/bg-people.jpg",
    symbols: "/bg-symbols.jpg",
    vovo: "/bg-vovo.jpeg",
};

const cardSize = {
    small: "w-16 h-20 text-3xl md:w-30 md:h-30 md:text-4xl",
    medium: "w-20 h-28 text-4xl md:w-28 md:h-36 md:text-5xl",
    large: "w-24 h-32 text-5xl md:w-30 md:h-28 md:text-6xl",
};

const sizeMap: Record<SizeOption, { pairs: number; cols: number }> = {
    small: { pairs: 8, cols: 4 }, // 16 cartas
    medium: { pairs: 12, cols: 6 }, // 24 cartas
    large: { pairs: 18, cols: 5 }, // 36 cartas
};

function shuffle<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
}

function getRandomCategory(): CategoryOption {
    const availableCategories = Object.keys(categories).filter(
        (cat) => cat !== "vovo"
    ) as CategoryOption[];

    const randomIndex = Math.floor(Math.random() * availableCategories.length);
    return availableCategories[randomIndex];
}

export default function MemoryGame() {
    const [size, setSize] = useState<SizeOption>("small");
    const [category, setCategory] = useState<CategoryOption>("animals");
    const [cards, setCards] = useState<CardType[]>([]);
    const [selected, setSelected] = useState<CardType[]>([]);
    const [gameFinished, setGameFinished] = useState(false);
    const [showVovoModal, setShowVovoModal] = useState(false);
    const [vovoUnlocked, setVovoUnlocked] = useState(
        localStorage.getItem("vovoUnlocked") === "true"
    );
    const [vovoPin, setVovoPin] = useState("");

    function startGame() {
        const { pairs } = sizeMap[size];

        const shuffledItems = shuffle(categories[category]);
        const selectedItems = shuffledItems.slice(0, pairs);

        const duplicated = [...selectedItems, ...selectedItems];

        const newCards: CardType[] = shuffle(duplicated).map((value, index) => ({
            id: index,
            value,
            flipped: false,
            matched: false,
        }));

        setCards(newCards);
        setSelected([]);
        setGameFinished(false);
    }

    function handleFlip(card: CardType) {
        if (card.flipped || card.matched || selected.length === 2) return;

        const newCards = cards.map((c) =>
            c.id === card.id ? { ...c, flipped: true } : c
        );

        const newSelected = [...selected, { ...card, flipped: true }];

        setCards(newCards);
        setSelected(newSelected);

        if (newSelected.length === 2) {
            checkMatch(newSelected, newCards);
        }
    }

    function checkMatch(selectedCards: CardType[], currentCards: CardType[]) {
        const [first, second] = selectedCards;

        if (first.value === second.value) {
            setCards(
                currentCards.map((c) =>
                    c.value === first.value ? { ...c, matched: true } : c
                )
            );
            setSelected([]);
        } else {
            setTimeout(() => {
                setCards(
                    currentCards.map((c) =>
                        c.id === first.id || c.id === second.id
                            ? { ...c, flipped: false }
                            : c
                    )
                );
                setSelected([]);
            }, 900);
        }
    }

    useEffect(() => {
        startGame();
    }, []);

    useEffect(() => {
        if (cards.length > 0 && cards.every(card => card.matched)) {
            setGameFinished(true);
        }
    }, [cards]);

    function handleCategoryChange(value: CategoryOption) {
        if (value === "vovo" && !vovoUnlocked) {
            setShowVovoModal(true);
            return;
        }

        setCategory(value);
    }

    function unlockVovo(pin: string) {
        if (pin === VOVO_PIN) {
            localStorage.setItem("vovoUnlocked", "true");
            setVovoUnlocked(true);
            setCategory("vovo");
            setShowVovoModal(false);
        } else {
            alert("PIN incorreto 👵");
        }
    }


    return (
        <div
            className="relative min-h-screen bg-cover bg-center transition-all duration-500 flex flex-col items-center p-6"
            style={{
                backgroundImage: `url(${bgByCategory[category]})`,
            }}
        >
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 flex flex-col items-center w-full">
                <h1 className="text-4xl font-bold mb-4 text-white">
                    🧠 Jogo da Memória
                </h1>

                <div className="flex gap-4 mb-4">
                    <select
                        className="p-2 rounded border-2 bg-emerald-600 border-emerald-600"
                        value={size}
                        onChange={(e) => setSize(e.target.value as SizeOption)}
                    >
                        <option value="small">Pequeno</option>
                        <option value="medium">Médio</option>
                        <option value="large">Grande</option>
                    </select>

                    <select
                        className="p-2 rounded border-2 border-emerald-600 bg-emerald-600"
                        value={category}
                        onChange={(e) =>
                            handleCategoryChange(e.target.value as CategoryOption)
                        }
                    >
                        <option value="animals">Animais</option>
                        <option value="plants">Plantas</option>
                        <option value="objects">Objetos</option>
                        <option value="foods">Comidas</option>
                        <option value="travel">Viagens</option>
                        <option value="music">Música</option>
                        <option value="shapes">Formas</option>
                        <option value="gaming">Jogos</option>
                        <option value="flags">Bandeiras</option>
                        <option value="emotions">Emoções</option>
                        <option value="sports">Esportes</option>
                        <option value="weather">Clima</option>
                        <option value="people">Pessoas</option>
                        <option value="symbols">Símbolos</option>
                        <option value="vovo">Vovó 👵</option>
                    </select>

                    <button
                        onClick={startGame}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Iniciar
                    </button>
                </div>

                <div
                    className="grid gap-4"
                    style={{
                        gridTemplateColumns: `repeat(${sizeMap[size].cols}, minmax(0, 1fr))`,
                    }}
                >
                    {cards.map((card) => (
                        <button
                            key={card.id}
                            onClick={() => handleFlip(card)}
                            className={`${cardSize[size]} rounded flex items-center justify-center overflow-hidden
      ${card.flipped || card.matched ? "bg-white" : "bg-emerald-600"}`}
                        >
                            {card.flipped || card.matched ? (
                                card.value.startsWith("/") ? (
                                    <img
                                        src={card.value}
                                        alt="card"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="select-none">{card.value}</span>
                                )
                            ) : null}
                        </button>
                    ))}

                </div>
            </div>

            {gameFinished && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    <div className="absolute inset-0 bg-black/60" />

                    <div className="relative z-10  bg-white rounded-xl p-8 flex flex-col items-center gap-4 shadow-xl">
                        <h2 className="text-3xl font-bold text-emerald-600">🎉 Parabéns!</h2>
                        <p className="text-gray-700">
                            Você ganhou!
                        </p>

                        <button
                            onClick={() => {
                                const randomCategory = getRandomCategory();
                                setCategory(randomCategory);
                                setGameFinished(false);

                                setTimeout(() => {
                                    startGame();
                                }, 0);
                            }}
                            className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                        >
                            Jogar novamente
                        </button>
                    </div>
                </div>
            )}

            {showVovoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/60" />

                    <div className="relative bg-white rounded-xl p-6 w-80 flex flex-col gap-4">
                        <h2 className="text-2xl font-bold text-center text-black">👵 Área da Voinha</h2>

                        <input
                            type="password"
                            maxLength={4}
                            className="border p-2 rounded text-center text-xl tracking-widest"
                            onChange={(e) => setVovoPin(e.target.value)}
                        />

                        <button
                            onClick={() => unlockVovo(vovoPin)}
                            className="bg-emerald-600 text-white py-2 rounded"
                        >
                            Entrar
                        </button>
                    </div>
                </div>
            )}

        </div>

    );
}
