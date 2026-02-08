export const getOpenedTabsList = async () => {
    const result = await chrome.tabs.query({})
    return result
}

