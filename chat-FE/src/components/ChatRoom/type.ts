import { Channel } from "../../types/room";

export interface ChatRoomsProps {
    rooms: Array<Channel>;
    onSelectRoom: (roomId: number) => void;
    handleCreateOrSelect: (userId: number) => void;
    selectedRoomId: number | null;
}