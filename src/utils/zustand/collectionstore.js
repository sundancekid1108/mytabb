import { create } from 'zustand';

const useCollectionStore = create((set) => ({
    collections: [ {
        title: "Mar 01 at 15:14",
        cards: [
            { title: "JetBrains Account", description: "JetBrains Account", favicon: "https://account.jetbrains.com/assets/bad/icon.svg" },
            { title: "Github", description: "Source Code Hosting", favicon: "https://github.com/favicon.ico" }
        ]
    },
        {
            title: "PROGRAMMING",
            cards: [
                { title: "React", description: "Frontend Library", favicon: "https://reactjs.org/favicon.ico" },
                { title: "Tailwind CSS", description: "Styling Framework", favicon: "https://tailwindcss.com/favicon-32x32.png" }
            ]
        },
        {
            title: "SHOPPING",
            cards: []
        }],
    addCollection: (title) => set(
        (state) => {
            const newId = self.crypto.randomUUID();
            const newCollection = {
                id: newId,
                title: title.trim(),
                tags: [],
                createdAt: new Date().toISOString(),
                cards: []
            }
            return {

                collections: [newCollection, ...state.collections]
            };
        }
    ),
    removeCollection: () => {}


}))

export default useCollectionStore