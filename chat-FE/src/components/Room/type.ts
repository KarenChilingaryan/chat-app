import { Channel } from "../../types/room";

export interface RoomsProps {
    room: Channel;
    onSelectRoom: (roomId: number) => void;
    selectedRoomId: number | null;
}