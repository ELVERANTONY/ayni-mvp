import { useState, useEffect, useCallback, useRef } from 'react';
import chatService, { WASTE_TYPES } from '@/services/chatService';

const TYPING_DELAY = 1200;
const RESPONSE_GAP = 700;
const START_DELAY = 500;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function useChat({ onApprovedWaste } = {}) {
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const lockRef = useRef(false);



  const addAndPersist = useCallback(async (msg) => {
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('DB Timeout')), 1000)
      );
      const saved = await Promise.race([chatService.addMessage(msg), timeoutPromise]);
      setMessages((prev) => [...prev, saved]);
      return saved;
    } catch (err) {
      console.warn('DB save failed, using in-memory message:', err);
      const fallbackMsg = { ...msg, id: Date.now() + Math.random(), timestamp: Date.now() };
      setMessages((prev) => [...prev, fallbackMsg]);
      return fallbackMsg;
    }
  }, []);

  const addUserMessage = useCallback(async (text) => {
    return addAndPersist({ role: 'user', type: 'text', text });
  }, [addAndPersist]);

  const addUserPhoto = useCallback(async (waste) => {
    return addAndPersist(chatService.buildPhotoMessage(waste));
  }, [addAndPersist]);

  const addBotText = useCallback(async (text) => {
    setIsTyping(true);
    await sleep(TYPING_DELAY);
    setIsTyping(false);
    return addAndPersist({ role: 'bot', type: 'text', text });
  }, [addAndPersist]);

  const addBotMessages = useCallback(async (texts) => {
    for (let i = 0; i < texts.length; i++) {
      setIsTyping(true);
      await sleep(i === 0 ? START_DELAY : TYPING_DELAY * 0.7);
      setIsTyping(false);
      await addAndPersist({ role: 'bot', type: 'text', text: texts[i] });
      if (i < texts.length - 1) await sleep(RESPONSE_GAP);
    }
  }, [addAndPersist]);

  const step = useCallback((key) => {
    setActiveStep(key);
    return sleep(TYPING_DELAY);
  }, []);

  const complete = useCallback((key) => {
    setCompletedSteps((prev) => new Set(prev).add(key));
    setActiveStep(null);
  }, []);

  const startConversation = useCallback(async () => {
    await addAndPersist({ role: 'system', text: 'Nueva sesión iniciada — AYNI Bot v2.0' });
    await sleep(RESPONSE_GAP * 0.3);

    const welcomeMsgs = chatService.buildWelcomeMessages();
    for (let i = 0; i < welcomeMsgs.length; i++) {
      setIsTyping(true);
      await sleep(i === 0 ? START_DELAY : TYPING_DELAY);
      setIsTyping(false);
      await addAndPersist(welcomeMsgs[i]);
      if (i < welcomeMsgs.length - 1) await sleep(RESPONSE_GAP);
    }
    setOptions(chatService.MENU_OPTIONS);
  }, [addAndPersist]);

  const runApproved = useCallback(async (waste) => {
    setIsSimulating(true);
    setCompletedSteps(new Set());

    try {
      await step('clasificador');
      setIsTyping(true);
      await sleep(TYPING_DELAY * 0.4);
      setIsTyping(false);
      await addAndPersist(chatService.buildClasificadorResponse(waste));
      complete('clasificador');
      await sleep(RESPONSE_GAP * 0.5);

      await step('impacto');
      setIsTyping(true);
      await sleep(TYPING_DELAY * 0.6);
      setIsTyping(false);
      await addAndPersist(chatService.buildImpactoResponse(waste));
      complete('impacto');
      await sleep(RESPONSE_GAP * 0.5);

      await step('ayni');
      setIsTyping(true);
      await sleep(TYPING_DELAY * 0.5);
      setIsTyping(false);
      await addAndPersist(chatService.buildAyniResponse(waste));
      complete('ayni');

      await sleep(RESPONSE_GAP * 0.3);
      await addAndPersist(chatService.buildResultMessage(waste));

      if (onApprovedWaste) {
        await onApprovedWaste(waste);
      }
    } finally {
      setIsSimulating(false);
      setActiveStep(null);
    }
  }, [addAndPersist, step, complete, onApprovedWaste]);

  const runRejected = useCallback(async (waste) => {
    setIsSimulating(true);
    setCompletedSteps(new Set());

    try {
      await step('clasificador');
      setIsTyping(true);
      await sleep(TYPING_DELAY * 0.3);
      setIsTyping(false);
      await addAndPersist({
        role: 'clasificador', type: 'text',
        text: '⚠️ La imagen no cumple con los criterios de calidad necesarios para identificación automática.',
      });
      complete('clasificador');
      await sleep(RESPONSE_GAP * 0.3);
      await addAndPersist(chatService.buildRejectedMessage(waste));
    } finally {
      setIsSimulating(false);
      setActiveStep(null);
      setCompletedSteps(new Set());
    }
  }, [addAndPersist, step, complete]);

  const runDuplicate = useCallback(async (waste) => {
    setIsSimulating(true);
    setCompletedSteps(new Set());

    try {
      await step('clasificador');
      setIsTyping(true);
      await sleep(TYPING_DELAY * 0.3);
      setIsTyping(false);
      await addAndPersist({
        role: 'clasificador', type: 'text',
        text: `🔄 Registro previo encontrado en base de datos para: ${waste.label}.`,
      });
      complete('clasificador');
      await sleep(RESPONSE_GAP * 0.3);
      await addAndPersist(chatService.buildDuplicateMessage(waste));
    } finally {
      setIsSimulating(false);
      setActiveStep(null);
      setCompletedSteps(new Set());
    }
  }, [addAndPersist, step, complete]);

  useEffect(() => {
    let fallbackMode = false;
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('DB Timeout')), 1000)
    );

    Promise.race([chatService.getMessages(), timeoutPromise])
      .then(async (msgs) => {
        setMessages(msgs);
        if (msgs.length === 0) {
          await startConversation();
        } else {
          setOptions(chatService.MENU_OPTIONS);
        }
      })
      .catch(async (err) => {
        console.warn('Failed to load chat messages from DB, using fallback:', err);
        fallbackMode = true;
        setMessages([]);
        await startConversation(true); // Pass flag to indicate fallback
      });
  }, [startConversation]);

  return {
    messages,
    options,
    isTyping,
    isSimulating,
    activeStep,
    completedSteps,
    addUserMessage,
    addUserPhoto,
    addBotText,
    addBotMessages,
    runApproved,
    runRejected,
    runDuplicate,
    setOptions,
    startConversation,
  };
}
