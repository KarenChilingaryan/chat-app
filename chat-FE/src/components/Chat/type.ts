import { Channel } from "../../types/room";

export interface ChatProps {
    selectedRoomData: Channel | undefined; // Assuming Room is the interface we defined earlier for a room structure
    selectedRoomId: number;
  }