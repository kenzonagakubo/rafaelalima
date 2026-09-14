/**
 * RAFAELA — PERSONAL TRAINER | INTERACTIVE BIO LINK SCRIPT
 * Configurações fáceis e integrações dinâmicas
 */

// ==========================================================================
// 1. Configurações Principais (Edite aqui o número e redes sociais)
// ==========================================================================
const CONFIG = {
  // Número oficial da Rafaela
  whatsappNumber: "5519999331012", 
  instagramUsername: "personalrafaelalima",
  defaultGreeting: "Olá Rafaela! Vi seu link da bio e gostaria de saber mais sobre sua consultoria e treinos personalizados."
};

// ==========================================================================
// 2. Utilitários para WhatsApp e Links
// ==========================================================================
function getWhatsappUrl(message) {
  const encodedText = encodeURIComponent(message || CONFIG.defaultGreeting);
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedText}`;
}

// ==========================================================================
// 3. Inicialização e Handlers de Eventos
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Atualiza links de CTAs principais com as configurações
  setupMainCtas();

  // Interatividade nos Cards de Serviços / Objetivos
  setupServiceCards();

  // Compartilhamento nativo ou cópia para área de transferência
  setupShareButton();

  // Animação de entrada suave dos elementos
  setupScrollAnimations();
});

/**
 * Configura os botões de ação principal (Hero, Rodapé e Flutuante)
 */
function setupMainCtas() {
  const heroCta = document.getElementById("heroCtaBtn");
  const finalCta = document.getElementById("finalCtaBtn");
  const floatingWhatsapp = document.getElementById("floatingWhatsapp");
  const whatsLink = document.getElementById("whatsLink");
  const instaLink = document.getElementById("instaLink");

  if (heroCta) {
    heroCta.href = getWhatsappUrl("Olá Rafaela! Vim pelo seu link da bio e quero começar meus treinos com você.");
  }

  if (finalCta) {
    finalCta.href = getWhatsappUrl("Olá Rafaela! Quero agendar minha consultoria / aula experimental e conhecer os planos.");
  }

  if (floatingWhatsapp) {
    floatingWhatsapp.href = getWhatsappUrl("Olá Rafaela! Estou no seu site e gostaria de tirar uma dúvida sobre treinos.");
  }

  if (whatsLink) {
    whatsLink.href = getWhatsappUrl("Olá Rafaela! Gostaria de falar com você diretamente.");
  }

  if (instaLink) {
    instaLink.href = `https://instagram.com/${CONFIG.instagramUsername}`;
  }
}

/**
 * Configura o clique nos cards de objetivos para abrir o WhatsApp com mensagem temática
 */
function setupServiceCards() {
  const cards = document.querySelectorAll(".service-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const serviceName = card.getAttribute("data-service") || "Treino Personalizado";
      
      // Efeito de feedback visual no card clicado
      card.style.transform = "scale(0.97)";
      setTimeout(() => {
        card.style.transform = "";
      }, 150);

      // Mensagem personalizada específica do card
      const customMessage = `Olá Rafaela! Vi seu site e tenho muito interesse em iniciar um acompanhamento focado em: *${serviceName}*. Poderia me passar mais detalhes?`;
      
      const targetUrl = getWhatsappUrl(customMessage);
      
      // Abre o WhatsApp em nova aba
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    });
  });
}

/**
 * Configuração do botão de compartilhar (Web Share API ou Clipboard)
 */
function setupShareButton() {
  const shareBtn = document.getElementById("shareBtn");

  if (!shareBtn) return;

  shareBtn.addEventListener("click", async () => {
    const shareData = {
      title: "Rafaela — Personal Trainer",
      text: "Confira o link da bio e consultoria personalizada da Rafaela (CREF 215702-G/SP):",
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== "AbortError") {
          fallbackCopyToClipboard(window.location.href);
        }
      }
    } else {
      fallbackCopyToClipboard(window.location.href);
    }
  });
}

/**
 * Fallback de cópia de link
 */
function fallbackCopyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showToast("Link copiado para a área de transferência!"))
      .catch(() => showToast("Link: " + text));
  } else {
    // Fallback legado
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      showToast("Link copiado com sucesso!");
    } catch (e) {
      showToast("Não foi possível copiar automaticamente.");
    }
    document.body.removeChild(textArea);
  }
}

/**
 * Exibe Toast de notificação
 */
function showToast(message) {
  const toast = document.getElementById("toastAlert");
  const toastMessage = document.getElementById("toastMessage");

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

/**
 * Animação simples de revelação ao rolar a página
 */
function setupScrollAnimations() {
  const cards = document.querySelectorAll(".about-card, .service-card, .journey-card, .step-card, .final-cta-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  cards.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
    observer.observe(el);
  });
}
