export default class DeviceInfoCollector {
    static async getInfo() {
        return {
            platform: "web",
            isTV: false,
            brand: navigator.vendor || "Unknown",
            model: navigator.userAgent,
            systemName: navigator.platform,
            systemVersion: navigator.userAgent,
            appVersion: "-1",
            buildNumber: "-1",
            bundleId: window.location.hostname || "",
            deviceId: "-1",

            manufacturer: "",
            isEmulator: false,
            uniqueId: "",

            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
        };
    }
}