export const stringHelper = {
    sanitize: (string) => {
        if (string) {
            return string.replace('\n', '').trim()
        }
        return string;
    }
}