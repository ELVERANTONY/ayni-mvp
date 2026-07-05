import { useRef, useCallback } from 'react';
import { useChat } from '@/hooks/useChat';
import chatService, { WASTE_TYPES, getScenario } from '@/services/chatService';
import PhoneFrame from '@/components/citizen/PhoneFrame';
import ChatPanel from '@/components/citizen/ChatPanel';

export default function ChatSimulator() {
  const lockRef = useRef(false);
  const chat = useChat();

  const handleOption = useCallback(async (optionId) => {
    if (lockRef.current || chat.isSimulating) return;
    lockRef.current = true;

    try {
      switch (optionId) {
        case 'report':
          await chat.addUserMessage('📸 Reportar reciclaje');
          await chat.addBotMessages(['📸 Perfecto. Envíame una foto del material que quieres reciclar y yo lo clasificaré por ti.']);
          chat.setOptions(chatService.REPORT_OPTIONS);
          break;

        case 'pet':
        case 'carton':
        case 'aluminum':
          await handlePhotoSubmit(optionId);
          break;

        case 'profile':
          await chat.addUserMessage('👤 Mi perfil');
          await chat.addBotMessages(['👤 *Perfil Demo*\n\nTickets: 25\nAhorro: S/ 15.00']);
          chat.setOptions(chatService.MENU_OPTIONS);
          break;

        case 'stats':
          await chat.addUserMessage('📊 Mis tickets y ahorros');
          await chat.addBotMessages(['📊 *Estadísticas Demo*\n\nHas reciclado 10 kg de material este mes.']);
          chat.setOptions(chatService.MENU_OPTIONS);
          break;

        case 'benefits':
          await chat.addUserMessage('🎁 Beneficios');
          await chat.addBotMessages(chatService.buildBenefitsMessages().map(m => m.text));
          chat.setOptions(chatService.MENU_OPTIONS);
          break;

        case 'menu':
          chat.setOptions(chatService.MENU_OPTIONS);
          break;
      }
    } finally {
      lockRef.current = false;
    }
  }, [chat]);

  const handlePhotoSubmit = useCallback(async (material) => {
    const waste = WASTE_TYPES[material];
    if (!waste) return;

    chat.setOptions([]);
    await chat.addUserPhoto(waste);
    await chat.addBotMessages(['⏳ Estoy procesando tu imagen...']);

    const scenario = getScenario();

    if (scenario === 'approved') {
      await chat.runApproved(waste);
      await new Promise((r) => setTimeout(r, 400));
      chat.setOptions(chatService.RESULT_OPTIONS);
    } else if (scenario === 'rejected') {
      await chat.runRejected(waste);
      chat.setOptions(chatService.REJECT_OPTIONS);
    } else {
      await chat.runDuplicate(waste);
      chat.setOptions([{ id: 'menu', label: '🏠 Volver al menú principal' }]);
    }
  }, [chat]);

  const isLocked = lockRef.current;

  return (
    <div className="flex justify-center w-full">
      <div className="scale-90 sm:scale-100 transform origin-top">
        <PhoneFrame>
          <div className="flex-1 flex flex-col overflow-hidden h-full">
            <ChatPanel
              messages={chat.messages}
              isTyping={chat.isTyping}
              activeStep={chat.activeStep}
              completedSteps={chat.completedSteps}
              options={chat.options}
              onOption={handleOption}
              isSimulating={chat.isSimulating}
              isLocked={isLocked}
            />
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
