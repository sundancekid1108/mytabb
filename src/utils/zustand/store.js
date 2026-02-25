import { create } from 'zustand';
import { getWindowsInfo} from '../../chromeapi/chromeapi.js'



const useTabStore = create((set, get) => ({
    openTabs: [],
    selectedTabs: [],
    isModalOpen: false,

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

    onSwitchTab: async (tabId, windowId) => {
        if (typeof chrome !== 'undefined' && chrome.tabs) {
            await chrome.windows.update(windowId, { focused: true });
            await chrome.tabs.update(tabId, { active: true });
        }
    },

    toggleSelectTab: (tab) => {

        set((state) => {

            const isSelected = state.selectedTabs.some(t => t.id === tab.id);

            const nextSelected = isSelected
                ? state.selectedTabs.filter(t => t.id !== tab.id)
                : [...state.selectedTabs, tab];

            return {
                selectedTabs: nextSelected,
                isModalOpen: nextSelected.length > 0
            };

        });
    },

    clearSelectedTabs: () => set({selectedTabs: []}),

    closeTab: (tabId) => {
        if (typeof chrome !== 'undefined' && chrome.tabs) {
            chrome.tabs.remove(tabId);
   
            set((state) => ({
                selectedTabs: state.selectedTabs.filter(id => id !== tabId)
            }));
        }
    },

    setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),




}))

export default useTabStore;