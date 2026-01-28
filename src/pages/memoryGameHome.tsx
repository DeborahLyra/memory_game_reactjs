import { useEffect, useState } from "react";

type SizeOption = "small" | "medium" | "large";
type CategoryOption = "animals" | "plants" | "objects" |"foods" |"travel" |"music" | "shapes" |"gaming";

type CardType = {
    id: number;
    value: string;
    flipped: boolean;
    matched: boolean;
};

const categories: Record<CategoryOption, string[]> = {
    animals: [
        "🐶", "🐱", "🐼", "🦊", "🐸", "🦁", "🐵", "🐮", "🐰", "🐯", "🦓", "🦒",
        "🐘", "🐨", "🐔", "🦆", "🦉", "🦄", "🐙", "🦀", "🐬", "🐳", "🦈", "🐢",
        "🐍", "🦎", "🐝", "🦋"
    ],
    plants: [
        "🌵", "🌴", "🌸", "🌻", "🍀", "🌺", "🌼", "🍁", "🌿", "🌲", "🌳", "🍃",
        "🍄", "🌹", "🥀", "🌾", "🎋", "🪴", "🌷", "🌱", "🌰", "🍂", "🌽", "🍅",
        "🥕", "🌶️", "🥬", "🥦"
    ],
    objects: [
        "🚗", "📱", "⌚", "🎧", "💡", "📷", "🖊️", "🎒", "💻", "🖥️", "🕹️", "📚",
        "📦", "🔑", "🧸", "🎁", "📺", "☎️", "🪑", "🛋️", "🚲", "✈️", "🚀", "🧯",
        "🔋", "🧃", "🕯️", "🪟"
    ],
    foods: [
        "🍎", "🍌", "🍓", "🍇", "🍉", "🍍", "🥭", "🍑",
        "🍔", "🍕", "🌭", "🍟", "🥪", "🌮", "🍣", "🍤",
        "🍩", "🍪", "🎂", "🍰", "🍫", "🍬", "🍿", "🍯",
        "🥞", "🧇", "🍳", "🥗"
    ],
    travel: [
        "🗺️", "🧭", "🏝️", "⛰️", "🏜️", "🌋", "🏕️", "🏖️",
        "🗽", "🗼", "🗿", "🏰", "🏯", "⛩️", "🕌", "🛕",
        "✈️", "🚆", "🚢", "🚗", "🚲", "🛵", "🚌", "🚀",
        "🌍", "🌎", "🌏", "📸"
    ],
    music: [
        "🎵", "🎶", "🎼", "🎧", "🎤", "🎸", "🎹", "🥁",
        "🎻", "🎺", "🎷", "🪗", "📻", "💿", "📀", "📱",
        "🎚️", "🎛️", "📣", "🔊", "🔉", "🔈", "🎙️", "🎪",
        "❤️", "💥", "⭐", "🔥"
    ],
    shapes: [
        "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪",
        "⬛", "⬜", "🔺", "🔻", "🔷", "🔶", "🟦", "🟩",
        "🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "⭐", "❤️",
        "💙", "💚", "💛", "🖤"
    ],
    gaming: [
        "🎮", "🕹️", "👾", "🎯", "🧩", "♟️", "🎲", "🃏",
        "🏆", "⚔️", "🛡️", "🏹", "💣", "🧨", "🔮", "🪄",
        "💎", "🧙", "🧝", "🧟", "🧛", "🧞", "🐉", "👑",
        "⭐", "🔥", "🗝️", "📜"
    ]
};

const sizeMap: Record<SizeOption, { pairs: number; cols: number }> = {
    small: { pairs: 10, cols: 5 }, 
    medium: { pairs: 15, cols: 6 }, 
    large: { pairs: 28, cols: 8 }, 
};

function shuffle<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
}

export default function MemoryGame() {
    const [size, setSize] = useState<SizeOption>("small");
    const [category, setCategory] = useState<CategoryOption>("animals");
    const [cards, setCards] = useState<CardType[]>([]);
    const [selected, setSelected] = useState<CardType[]>([]);

    function startGame() {
        const { pairs } = sizeMap[size];
        const baseItems = categories[category].slice(0, pairs);
        const duplicated = [...baseItems, ...baseItems];

        const newCards: CardType[] = shuffle(duplicated).map((value, index) => ({
            id: index,
            value,
            flipped: false,
            matched: false,
        }));

        setCards(newCards);
        setSelected([]);
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

    return (
        <div className="min-h-screen w-full bg-slate-800 flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold mb-4">🧠 Jogo da Memória</h1>

            <div className="flex gap-4 mb-4">
                <select
                    className="p-2 rounded border-2 border-emerald-600"
                    value={size}
                    onChange={(e) => setSize(e.target.value as SizeOption)}
                >
                    <option value="small">Pequeno</option>
                    <option value="medium">Médio</option>
                    <option value="large">Grande</option>
                </select>

                <select
                    className="p-2 rounded border-2 border-emerald-600"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryOption)}
                >
                    <option value="animals">Animais</option>
                    <option value="plants">Plantas</option>
                    <option value="objects">Objetos</option>
                    <option value="foods">Comidas</option>
                    <option value="travel">Viagens</option>
                    <option value="music">Música</option>
                    <option value="shapes">Formas</option>
                    <option value="gaming">Jogos</option>
                </select>

                <button
                    onClick={startGame}
                    className="px-4 py-2 bg-emerald-600 text-white rounded"
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
                        className={`w-16 h-18 text-4xl rounded flex items-center justify-center
              ${card.flipped || card.matched
                                ? "bg-white"
                                : "bg-emerald-600"
                            }`}
                    >
                        {card.flipped || card.matched ? card.value : ""}
                    </button>
                ))}
            </div>
        </div>
    );
}
