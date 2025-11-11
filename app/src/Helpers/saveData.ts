export const saveData = async (name: string, value: any) => {
    try {
        const data =
            typeof value === "string"
                ? value
                : JSON.stringify(value);

        localStorage.setItem(name, data);
    } catch (e) {
        throw e;
    }
};