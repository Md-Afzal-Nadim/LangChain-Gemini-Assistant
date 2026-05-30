import { initializeSoketConnection } from "../service/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api";
import { setChats, setCurrentChatId, setLoading, setError, createNewChat, addNewMessage, addMessage, removeChat } from "../chat.slice"
import { useDispatch, useSelector } from "react-redux";

export const useChat = () => {


  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    dispatch(setLoading(true));
    const data = await sendMessage({ message, chatId });
    try {

      const { chat, aiMessage } = data
      if (!chatId)
        dispatch(createNewChat({
          chatId: chat._id,
          title: chat.title
        }));

      // Add user message
      dispatch(addNewMessage({
        chatId: chatId || chat._id,
        content: message,
        role: 'user'
      }));

      // Add AI message
      dispatch(addNewMessage({
        chatId: chatId || chat._id,
        content: aiMessage.content,
        role: aiMessage.role
      }));

      dispatch(setCurrentChatId(chatId || chat._id));
      dispatch(setLoading(false));

    } catch (error) {
      console.error("Send Message Error:", error);
      dispatch(setError(error.message || "Failed to send message"));
      dispatch(setLoading(false));
    }
  }


  async function handleGetChats() {
    dispatch(setLoading(true));
    const data = await getChats();
    const { chats } = data;
    dispatch(setChats(chats.reduce((acc, chat) => {
      acc[chat._id] = {
        id: chat._id,
        title: chat.title,
        messages: [],
        lastUpdated: chat.updatedAt,

      }
      return acc;
    }, {})));
    dispatch(setLoading(false));
  }


  async function handleOpenChat(chatId, chats) {
    if (chats[chatId]?.messages.length === 0) {


      const data = await getMessages(chatId);

      const { messages } = data;

      const formattedMessages = messages.map((message) => ({
        content: message.content,
        role: message.role
      }));
      dispatch(addMessage({ chatId, messages: formattedMessages }));
    }
    dispatch(setCurrentChatId(chatId));

  }


  async function handleDeleteChat(chatId) {
    try {
      await deleteChat(chatId);
      dispatch(removeChat(chatId));
    } catch (error) {
      console.error("Delete Chat Error:", error);
      dispatch(setError(error.message || "Failed to delete chat"));
    }
  }

  function handleNewChat() {
    dispatch(setCurrentChatId(null));
    dispatch(setLoading(false));
  }


  return {
    initializeSoketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleDeleteChat,
    handleNewChat
  }
}