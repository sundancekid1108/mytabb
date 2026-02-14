const getWindowsInfo =  async () => {

    try {

        // chrome.permissions.getAll((result) => {
        //     console.log("현재 적용된 권한 목록:", result.permissions);
        //     if (result.permissions.includes('tabs')) {
        //         console.log("✅ 'tabs' 권한이 정상적으로 있습니다.");
        //
        //
        //     } else {
        //         console.log("❌ 'tabs' 권한이 없습니다! manifest.json을 확인하세요.");
        //     }
        // });

        const windows = await chrome.windows.getAll({ populate: true });
        // populate: true를 해야 창 안에 있는 탭 정보까지 가져옵니다.

        console.log("windows", windows);


        // 결과 확인
        // await windows.forEach((window) => {
        //     console.log(`Window ID: ${window.id}`);
        //     console.log(`- 현재 상태: ${window.state}`); // normal, minimized, maximized, fullscreen
        //     console.log(`- 포함된 탭 개수: ${window.tabs.length}`);
        //
        //     // 각 창에 포함된 탭 정보 출력
        //     window.tabs.forEach((tab) => {
        //         console.log("tab", tab)
        //     });
        //
        //     console.log('-----------------------------');
        // });

        return windows || [];

    } catch (error) {
        console.error("창 정보를 가져오는 중 오류 발생:", error);
        return []
    }
}

export { getWindowsInfo }