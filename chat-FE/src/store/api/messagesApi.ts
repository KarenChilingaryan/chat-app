import axiosInstance from "../../utils/server";

export const fetchMessagesByRoomIdApi = async (roomId: string, offset: number, limit: number) => {
  try {
    const response = await axiosInstance.get(`/message/channel/${roomId}`, {
      params: {
        offset,
        pageSize: limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};


export const sendMessageApi = async (channelId: string, content: string, userId: string) => {
  try {
    const response = await axiosInstance.post(`/message`, {
      channelId,
      content,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};