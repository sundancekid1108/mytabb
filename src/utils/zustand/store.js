import { create } from 'zustand';
import { getWindowsInfo} from '../../chromeapi/chromeapi.js'



const useTabStore = create((set, get) => ({
    openTabs: [],
    selectedTabs: [],

    fetchTabs: async () => {
        if (typeof chrome !== 'undefined' && chrome.windows) {
            const windows = await getWindowsInfo();
            const allTabs = windows.flatMap(window => window.tabs || []);
            const filteredTabs = allTabs.filter(tab =>
                tab.url && !tab.url.startsWith('chrome://newtab')
            );
            set({ openTabs: filteredTabs });
        }
    },

    toggleSelectTab: (tabId) => {
        const  selectedTabs  = get().selectedTabs;
        const nextSelected = selectedTabs.includes(tabId)
            ? selectedTabs.filter(id => id !== tabId)
            : [...selectedTabs, tabId];
        set({ selectedTabs: nextSelected });
    },

    clearSelectedTabs: () => set({selectedTabs: []}),

    closeTab: (tabId) => {
        if (typeof chrome !== 'undefined' && chrome.tabs) {
            chrome.tabs.remove(tabId);
            // 상태 업데이트는 chrome.tabs.onRemoved 리스너가 호출하는 fetchTabs에서 처리됨
            set((state) => ({
                selectedTabs: state.selectedTabs.filter(id => id !== tabId)
            }));
        }
    },




}))

export default useTabStore;