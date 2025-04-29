"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, LogOut, Menu, Search, Send, Settings, Shield, User, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-mobile"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

type Message = {
  id: string
  content: string
  sender: string
  timestamp: Date
  isCurrentUser: boolean
}

type Conversation = {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: Date
  unread: number
}

// Sample data
const sampleConversations: Conversation[] = [
  {
    id: "1",
    name: "Alice Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "When are we meeting tomorrow?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    unread: 2,
  },
  {
    id: "2",
    name: "Bob Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The documents are encrypted and ready",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    unread: 0,
  },
  {
    id: "3",
    name: "Secure Team Alpha",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "New security protocol implemented",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unread: 5,
  },
  {
    id: "4",
    name: "Carol Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Check your secure notes",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unread: 0,
  },
  {
    id: "5",
    name: "David Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The keys have been rotated",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    unread: 0,
  },
]

const sampleMessages: Message[] = [
  {
    id: "1",
    content: "Hey there! How's everything going with the secure project?",
    sender: "Alice Smith",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    isCurrentUser: false,
  },
  {
    id: "2",
    content: "All good! We've implemented the new encryption protocol.",
    sender: "You",
    timestamp: new Date(Date.now() - 1000 * 60 * 55),
    isCurrentUser: true,
  },
  {
    id: "3",
    content: "That's great news! When can we schedule the security audit?",
    sender: "Alice Smith",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isCurrentUser: false,
  },
  {
    id: "4",
    content: "I'm thinking next week would be ideal. Our team is ready.",
    sender: "You",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    isCurrentUser: true,
  },
  {
    id: "5",
    content: "Perfect! I'll send you the secure calendar invite.",
    sender: "Alice Smith",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    isCurrentUser: false,
  },
  {
    id: "6",
    content: "Don't forget to use the new verification codes when you send it.",
    sender: "You",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    isCurrentUser: true,
  },
]

export default function ChatPage() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeConversation, setActiveConversation] = useState<Conversation>(sampleConversations[0])
  const [messages, setMessages] = useState<Message[]>(sampleMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in")
    }
  }, [isLoaded, isSignedIn, router])

  // Auto-close sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [isMobile])

  if (!isLoaded || !isSignedIn) {
    return null
  }

  const filteredConversations = sampleConversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: "You",
        timestamp: new Date(),
        isCurrentUser: true,
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return formatTime(date)
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950">
      {/* Header */}
      <header className="h-16 border-b border-white/10 backdrop-blur-md bg-white/5 flex items-center px-4 justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-purple-200 hover:bg-purple-800/50 mr-2"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-purple-300 mr-2" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
              SecureChat
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-purple-200 hover:bg-purple-800/50">
                  <Bell className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-purple-200 hover:bg-purple-800/50">
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-purple-700 text-purple-100">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">User</p>
                  <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={cn(
            "w-80 border-r border-white/10 backdrop-blur-md bg-white/5 flex flex-col transition-all duration-300 ease-in-out",
            isMobile && !sidebarOpen && "w-0 -ml-80",
          )}
        >
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
              <Input
                placeholder="Search secure conversations..."
                className="pl-9 bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300/50 focus:border-purple-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-2">
            <h2 className="text-sm font-semibold text-purple-200">Secure Conversations</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-purple-300 hover:bg-purple-800/50">
                    <Users className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>New Group Chat</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <ScrollArea className="flex-1">
            <div className="px-2">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => {
                    setActiveConversation(conversation)
                    if (isMobile) setSidebarOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center p-3 rounded-lg mb-1 transition-colors",
                    activeConversation.id === conversation.id
                      ? "bg-purple-700/30 text-white"
                      : "hover:bg-purple-800/20 text-purple-200",
                  )}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                      <AvatarFallback className="bg-purple-700 text-purple-100">
                        {conversation.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate">{conversation.name}</h3>
                      <span className="text-xs text-purple-300">{formatDate(conversation.timestamp)}</span>
                    </div>
                    <p className="text-sm truncate opacity-80">{conversation.lastMessage}</p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Chat header */}
          <div className="h-16 border-b border-white/10 backdrop-blur-md bg-white/5 flex items-center px-4 justify-between">
            <div className="flex items-center">
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-md text-purple-200 hover:bg-purple-800/50 mr-2"
                >
                  <Menu className="h-5 w-5" />
                </button>
              )}
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={activeConversation?.avatar || "/placeholder.svg"} alt={activeConversation?.name} />
                <AvatarFallback className="bg-purple-700 text-purple-100">
                  {activeConversation?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-white">{activeConversation?.name}</h2>
                <p className="text-xs text-purple-300">End-to-end encrypted • Last active: Just now</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-purple-200 hover:bg-purple-800/50">
                      <Search className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Search in conversation</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-purple-200 hover:bg-purple-800/50">
                      <User className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View profile</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 mb-4">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.isCurrentUser ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2 shadow-sm",
                      message.isCurrentUser
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-white/10 backdrop-blur-sm text-white rounded-bl-none",
                    )}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm">{message.content}</span>
                      <span className="text-xs mt-1 opacity-70 text-right">{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message input */}
          <div className="p-4 border-t border-white/10 backdrop-blur-md bg-white/5">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a secure message..."
                className="flex-1 bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300/50 focus:border-purple-400"
              />
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
            <div className="flex justify-center mt-2">
              <span className="text-xs text-purple-300 flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                End-to-end encrypted • Only you and {activeConversation?.name} can see these messages
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
