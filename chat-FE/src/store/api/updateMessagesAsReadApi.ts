import axiosInstance from "../../utils/server";

export const updateMessagesAsReadApi = async (roomId: number, userId: number) => {
  const response = await axiosInstance.patch(`/message/read/${roomId}/${userId}`);
  return response.data;
};
