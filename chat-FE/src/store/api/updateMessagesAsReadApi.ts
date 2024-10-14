import axiosInstance from "../../utils/server";

export const updateMessagesAsReadApi = async (roomId: string, userId: string) => {
  const response = await axiosInstance.patch(`/message/read/${roomId}/${userId}`);
  return response.data;
};
