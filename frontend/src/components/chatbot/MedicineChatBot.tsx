import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import './MedicineChatBot.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface VerificationResult {
  status: string;
  confidence: string;
  medicine?: any;
  message: string;
  warnings?: string[];
  checks?: any;
}

interface Position {
  x: number;
  y: number;
}

interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  initialX: number;
  initialY: number;
}

const MedicineChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I can help you verify medicines and answer questions about pharmaceutical safety. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Drag functionality state
  const [position, setPosition] = useState<Position>({ x: 30, y: 30 }); // Initial bottom-right position
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = async (duration: number = 1000) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsTyping(false);
  };

  const verifyMedicine = async (productId: string): Promise<VerificationResult | null> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: productId.toUpperCase() })
      });
      return await response.json();
    } catch (error) {
      console.error('Verification error:', error);
      return null;
    }
  };

  const formatVerificationResult = (result: VerificationResult): string => {
    const statusEmojis = {
      'AUTHENTIC': '✅',
      'COUNTERFEIT': '🚨',
      'NOT_FOUND': '🚨',
      'EXPIRED': '⏰',
      'SUSPICIOUS': '⚠️'
    };

    const emoji = statusEmojis[result.status as keyof typeof statusEmojis] || '❓';
    
    let response = `${emoji} ${result.status.toUpperCase()}\n\n`;
    
    if (result.medicine) {
      response += `Product: ${result.medicine.name}\n`;
      response += `Manufacturer: ${result.medicine.manufacturer}\n`;
      response += `Batch: ${result.medicine.batch_number}\n`;
      if (result.medicine.expiry_date) {
        response += `Expires: ${new Date(result.medicine.expiry_date).toLocaleDateString()}\n`;
      }
      response += `\n`;
    }
    
    response += `Confidence: ${result.confidence}\n`;
    response += `Status: ${result.message}\n`;
    
    if (result.warnings && result.warnings.length > 0) {
      response += `\nWarnings:\n`;
      result.warnings.forEach(warning => {
        response += `• ${warning}\n`;
      });
    }
    
    if (result.checks) {
      response += `\nVerification Checks:\n`;
      response += `• Database: ${result.checks.databaseFound ? '✅' : '❌'}\n`;
      response += `• Blockchain: ${result.checks.blockchainVerified ? '✅' : '❌'}\n`;
      response += `• Not Expired: ${result.checks.notExpired ? '✅' : '❌'}\n`;
    }

    // Add safety recommendations
    if (result.status === 'COUNTERFEIT' || result.status === 'NOT_FOUND') {
      response += `\n🚨 SAFETY ALERT:\n`;
      response += `• Do NOT consume this medicine\n`;
      response += `• Report to authorities immediately\n`;
      response += `• Contact the pharmacy where purchased\n`;
    } else if (result.status === 'EXPIRED') {
      response += `\n⚠️ ACTION REQUIRED:\n`;
      response += `• Do NOT consume expired medicine\n`;
      response += `• Dispose of safely at pharmacy\n`;
    } else if (result.status === 'AUTHENTIC') {
      response += `\n✅ Safe to Use:\n`;
      response += `• This medicine is verified authentic\n`;
      response += `• Follow prescribed dosage instructions\n`;
    }
    
    return response;
  };

  const getBotResponse = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase();
    
    // Extract product ID patterns
    const productIdMatch = message.match(/med-[a-z0-9]+/i) || 
                          message.match(/[a-z]+-[a-z0-9]+/i) ||
                          message.match(/[a-z0-9]{6,}/i);
    
    // Medicine verification
    if (message.includes('verify') || message.includes('check') || productIdMatch) {
      if (productIdMatch) {
        const productId = productIdMatch[0].toUpperCase();
        const result = await verifyMedicine(productId);
        
        if (result) {
          return formatVerificationResult(result);
        } else {
          return `❌ Verification Error\n\nI couldn't verify "${productId}" right now. Please try again later or use our main verification page.`;
        }
      } else {
        return `🔍 Medicine Verification\n\nTo verify a medicine, please provide the product ID (e.g., MED-AUTH001) or scan the QR code.\n\nExample: "Verify MED-AUTH001"`;
      }
    }

    // How it works
    if (message.includes('how') && (message.includes('work') || message.includes('system'))) {
      return `🔧 How MediChain Works\n\n1. Medicine Registration: Manufacturers register products on blockchain\n2. QR Generation: Each medicine gets unique digital fingerprint\n3. Verification Process: Scan QR or enter product ID\n4. Multi-layer Check: Database → Blockchain → Expiry validation\n5. Real-time Results: Instant authenticity confirmation\n\nOur system uses blockchain technology to ensure medicine authenticity.`;
    }

    // Security features
    if (message.includes('security') || message.includes('safe') || message.includes('blockchain')) {
      return `🛡️ Security Features\n\n• Blockchain Technology: Immutable medicine records\n• QR Code Security: One-time use, tamper-proof\n• Multi-layer Verification: Database + Blockchain + Expiry\n• Real-time Validation: Instant authenticity checks\n• Privacy Protection: No personal data on blockchain\n\nYour safety is our priority!`;
    }

    // Report counterfeit
    if (message.includes('report') || message.includes('counterfeit') || message.includes('fake')) {
      return `🚨 Report Counterfeit Medicine\n\nIf you found a counterfeit medicine:\n\n1. STOP using it immediately\n2. Take photos of packaging and product\n3. Note purchase location and date\n4. Report to local drug authority\n5. Contact the manufacturer\n\nEmergency: If consumed, seek medical attention immediately!`;
    }

    // General help
    if (message.includes('help') || message.includes('support')) {
      return `💡 How I Can Help\n\n• Verify medicines by product ID\n• Explain how our system works\n• Provide security information\n• Guide you through reporting counterfeit products\n• Answer questions about medicine safety\n\nTry: "Verify MED-AUTH001" or "How does it work?"`;
    }

    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return `👋 Hello! I'm your MediChain assistant. I can help you verify medicines and ensure your safety.\n\nWhat can I help you with today?\n\n• Type a product ID to verify\n• Ask "How does it work?"\n• Say "Help" for more options`;
    }

    // Default response
    return `🤔 I'm here to help with medicine verification and safety!\n\nI can help you with:\n• Medicine verification - "Verify MED-AUTH001"\n• System information - "How does it work?"\n• Security details - "Is it secure?"\n• Report issues - "Report counterfeit"\n\nWhat would you like to know?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Add user message
    addMessage(userMessage, 'user');
    
    // Simulate bot typing
    await simulateTyping(800);
    
    // Get and add bot response
    const botResponse = await getBotResponse(userMessage);
    addMessage(botResponse, 'bot');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  // ===============================
  // DRAG FUNCTIONALITY
  // ===============================
  
  /**
   * Get viewport boundaries for right/bottom positioning
   * Since we use right/bottom CSS properties, bounds are calculated differently
   */
  const getViewportBounds = () => {
    const chatBoxWidth = 350;
    const chatBoxHeight = 500;
    
    return {
      minX: 0,                                    // Minimum distance from right edge
      minY: 0,                                    // Minimum distance from bottom edge  
      maxX: window.innerWidth - chatBoxWidth,    // Maximum distance from right edge
      maxY: window.innerHeight - chatBoxHeight   // Maximum distance from bottom edge
    };
  };

  /**
   * Constrain position within viewport boundaries for right/bottom positioning
   */
  const constrainPosition = (x: number, y: number): Position => {
    const bounds = getViewportBounds();
    return {
      x: Math.max(bounds.minX, Math.min(bounds.maxX, x)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, y))
    };
  };

  /**
   * Handle drag start (mouse and touch) - CORRECTED FOR RIGHT/BOTTOM
   */
  const handleDragStart = (clientX: number, clientY: number) => {
    if (!chatBoxRef.current) return;

    const rect = chatBoxRef.current.getBoundingClientRect();
    
    // Convert current position to right/bottom values
    // right = window.innerWidth - rect.right
    // bottom = window.innerHeight - rect.bottom
    const currentRightDistance = window.innerWidth - rect.right;
    const currentBottomDistance = window.innerHeight - rect.bottom;
    
    setDragState({
      isDragging: true,
      startX: clientX,
      startY: clientY,
      initialX: currentRightDistance,  // Distance from right edge
      initialY: currentBottomDistance  // Distance from bottom edge
    });

    // Add dragging class for visual feedback
    chatBoxRef.current.classList.add('dragging');
    
    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
  };

  /**
   * Handle drag move (mouse and touch) - CORRECTED FOR RIGHT/BOTTOM POSITIONING
   * Since we use right/bottom CSS properties:
   * - right: distance from right edge (higher value = more left)
   * - bottom: distance from bottom edge (higher value = more up)
   * To achieve normal drag behavior, we need to invert the delta calculations
   */
  const handleDragMove = (clientX: number, clientY: number) => {
    if (!dragState.isDragging || !chatBoxRef.current) return;

    // Calculate movement delta from initial drag position
    const deltaX = clientX - dragState.startX;
    const deltaY = clientY - dragState.startY;
    
    // CORRECTED LOGIC for right/bottom positioning:
    // When cursor moves RIGHT (+deltaX), we want chatbox to move RIGHT
    // Since right property moves element LEFT when increased, we SUBTRACT deltaX
    // When cursor moves DOWN (+deltaY), we want chatbox to move DOWN  
    // Since bottom property moves element UP when increased, we SUBTRACT deltaY
    const newX = dragState.initialX - deltaX;  // Inverted for 'right' property
    const newY = dragState.initialY - deltaY;  // Inverted for 'bottom' property
    
    // Constrain position within viewport boundaries
    const constrainedPosition = constrainPosition(newX, newY);
    setPosition(constrainedPosition);
  };

  /**
   * Handle drag end
   */
  const handleDragEnd = () => {
    if (!dragState.isDragging || !chatBoxRef.current) return;

    setDragState(prev => ({ ...prev, isDragging: false }));
    
    // Remove dragging class
    chatBoxRef.current.classList.remove('dragging');
    
    // Restore text selection
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging from header area
    const target = e.target as HTMLElement;
    if (target.closest('#chat-header') && !target.closest('#close-btn')) {
      e.preventDefault();
      handleDragStart(e.clientX, e.clientY);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleDragMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only allow dragging from header area
    const target = e.target as HTMLElement;
    if (target.closest('#chat-header') && !target.closest('#close-btn')) {
      e.preventDefault();
      const touch = e.touches[0];
      handleDragStart(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (dragState.isDragging) {
      e.preventDefault();
      const touch = e.touches[0];
      handleDragMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Effect to handle global mouse/touch events during drag
  useEffect(() => {
    if (dragState.isDragging) {
      // Mouse events
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      // Touch events
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [dragState.isDragging, dragState.startX, dragState.startY, dragState.initialX, dragState.initialY]);

  // Effect to handle window resize - reposition if outside bounds
  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => constrainPosition(prev.x, prev.y));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Floating Chat Button */}
      <div id="chatbot-btn" onClick={toggleChat}>
        <img src="/icon.svg" alt="Medicine Chatbot" />
      </div>

      {/* Chatbot Box */}
      {isOpen && (
        <div 
          id="chatbot-box"
          ref={chatBoxRef}
          style={{
            right: `${position.x}px`,
            bottom: `${position.y}px`,
            cursor: dragState.isDragging ? 'grabbing' : 'default'
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div 
            id="chat-header"
            style={{ cursor: 'grab' }}
          >
            <span id="close-btn" onClick={closeChat}>✖</span>
          </div>

          <div id="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={message.sender === 'user' ? 'user-msg' : 'bot-msg'}
              >
                {message.text.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < message.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            ))}

            {isTyping && (
              <div className="bot-msg">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div id="chat-input">
            <input
              type="text"
              id="user-input"
              placeholder="Ask about medicine..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSendMessage())}
            />
            <button id="send-btn" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MedicineChatBot;