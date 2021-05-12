export const problematicNodes = [
    "132615", //Kimi wa Tennenshoku | Kakushigoto != Hibike! Euphonium 2
    "106495", //Nisekoimonogatari | Nisekoi != Bakemonogatari
    "20947", //Nihon Animator Mihonichi | A LOT OF ANIME
    "118940", //Hamefura x Arte | Arte != Hamefura
]

export const avoidNodes=()=>{return problematicNodes.map(id=>{return `#${id}`}).join(", ")}