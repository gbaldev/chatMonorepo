import ChatProvider from './provider';
import ChatApiInstance from '../chatInstance';
import User from '../../models/User';

class ChatService {
  static registerUser = async (user: Partial<User>): Promise<User> =>
    ChatProvider.post(ChatApiInstance.register(user));
}

export default ChatService;
