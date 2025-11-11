export const readData = async (name: string) => {
    try {
        return localStorage.getItem(name);
    } catch (e) {
        return null;
    }
};
