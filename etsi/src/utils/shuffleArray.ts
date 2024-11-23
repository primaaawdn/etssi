// export const dynamic = 'force-dynamic'

export function shuffleArray<T>(array: T[]): T[] {
    if (array == null) {
        throw new Error("Input is null or undefined");
    }
    if (!Array.isArray(array)) {
        throw new Error("Input is not an array");
    }

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
