import { FormEvent, useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';

interface Message {
  user: string;
  content: string;
  type: 'user' | 'system';
  timestamp?: string;
}

interface User {
  id: string;
  username: string;
}

const socket: Socket = io(`${import.meta.env.VITE_PUBLIC_SOCKET_URL}`);

export function ComunityPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isJoined, setIsJoined] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setLoading(false);
    socket.on('message', (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    socket.on('loadMessages', (loadedMessages: Message[]) => {
      setMessages(loadedMessages);
    });

    socket.on('userList', (userList: User[]) => {
      setUsers(userList);
    });

    return () => {
      socket.off('message');
      socket.off('userList');
      socket.off('loadMessages');
      setLoading(true);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleJoin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim()) {
      socket.emit('join', username);
      setIsJoined(true);
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', message);
      setMessage(''); // Clear input field
    }
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <form
          onSubmit={handleJoin}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl mb-4">Join the Chat</h2>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Join
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Welcome, {username}!</h2>
        </div>

        <div className="grid grid-cols-4 h-[600px]">
          {/* Users list */}
          <div className="col-span-1 border-r p-4">
            <h3 className="text-lg font-semibold mb-4">
              Users ({users.length})
            </h3>
            <ul>
              {users.map(user => (
                <li key={user.id} className="mb-2">
                  {user.username} {user.username === username ? '(You)' : ''}
                </li>
              ))}
            </ul>
          </div>

          {/* Chat area */}
          <div className="col-span-3 flex flex-col overflow-auto">
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className="mb-4">
                  {msg.type === 'system' ? (
                    <p className="text-gray-500 italic">
                      {loading ? 'Loading...' : msg.content}
                    </p>
                  ) : (
                    <div
                      className={`flex flex-col ${
                        msg.user === username ? 'items-end' : 'items-start'
                      }`}
                    >
                      <span className="font-semibold">
                        {msg.user === username ? 'You' : msg.user}
                      </span>
                      <p
                        className={`p-2 rounded-lg inline-block ${
                          msg.user === username
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        {loading ? 'Loading...' : msg.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input field for sending messages */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
