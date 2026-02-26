// Contact information constants
export const WHATSAPP_CONTACT = {
  // Phone number should be in international format without + sign
  PHONE_NUMBER: '6281805886000',

  // Pre-filled message for WhatsApp
  DEFAULT_MESSAGE: '[WEB] Halo tim marketing Laksana, saya ingin bertanya lebih lanjut tentang unit Laksana Business Park',

  // WhatsApp direct URL with pre-filled message
  // Using the format: https://api.whatsapp.com/send?phone=PHONE&text=MESSAGE
  get WHATSAPP_URL() {
    return `https://api.whatsapp.com/send?phone=${this.PHONE_NUMBER}&text=${encodeURIComponent(this.DEFAULT_MESSAGE)}`;
  },

  // Alternative URL using wa.me format (more concise)
  get WHATSAPP_SHORT_URL() {
    return `https://wa.me/${this.PHONE_NUMBER}?text=${encodeURIComponent(this.DEFAULT_MESSAGE)}`;
  },

  // Function to generate WhatsApp URL with custom message
  generateWhatsAppUrl: function(message?: string) {
    const encodedMessage = encodeURIComponent(message || this.DEFAULT_MESSAGE);
    return `https://api.whatsapp.com/send?phone=${this.PHONE_NUMBER}&text=${encodedMessage}`;
  }
};

// Company contact information
export const COMPANY_CONTACT = {
  EMAIL: 'info@luxima.com',
  PHONE: '+62 8180 588 6000',
  ADDRESS: 'Kramat, Pakuhaji, Tangerang Regency, Banten'
};
