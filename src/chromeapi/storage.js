// 크롬 스토리지용 어댑터 설정
const chromeStorageAdapter = {
    getItem: (name) => {
        return new Promise((resolve) => {
            chrome.storage.local.get([name], (result) => {
                resolve(result[name] || null);
            });
        });
    },
    setItem: (name, value) => {
        chrome.storage.local.set({ [name]: value });
    },
    removeItem: (name) => {
        chrome.storage.local.remove([name]);
    },
};

export default chromeStorageAdapter