export const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

export const getInitials = (fullName: string) => {
    const nameParts = fullName.trim().split(' ');

    if (nameParts.length >= 2) {
        const firstInitial = nameParts[0].charAt(0).toUpperCase();
        const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
        return firstInitial + lastInitial;
    } else if (nameParts.length === 1) {
        return nameParts[0].substring(0, 2).toUpperCase();
    }

    return '';
}


export const formatChatDate = (value: string) => {
    const inputDate = new Date(value);
    const today = new Date();

    const timeDiff = today.getTime() - inputDate.getTime();

    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (daysDiff === 1) {
        return 'Yesterday';
    }

    if (daysDiff === 0) {
        const hours = inputDate.getHours().toString().padStart(2, '0');
        const minutes = inputDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear().toString().slice(-2);

    return `${day}.${month}.${year}`;
}
