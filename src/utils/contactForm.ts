interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export const submitContactForm = async (formData: ContactFormData) => {
  try {
    // Validate form data
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      throw new Error('Please fill in all fields')
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      throw new Error('Please enter a valid email address')
    }

    // Create mailto link as fallback
    const subject = encodeURIComponent(formData.subject || `Portfolio Contact: Message from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from Caleb Kyere Boateng's Portfolio Website`)

    const mailtoLink = `mailto:kyereboatengcaleb@gmail.com?subject=${subject}&body=${body}`
    
    // Try to open email client
    window.open(mailtoLink, '_blank')
    
    // Show success notification
    showNotification('success', 'Email client opened! Your message is ready to send.')
    
    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred'
    showNotification('error', errorMessage)
    return { success: false, error: errorMessage }
  }
}

const showNotification = (type: 'success' | 'error', message: string) => {
  // Remove any existing notifications
  const existingNotifications = document.querySelectorAll('.contact-notification')
  existingNotifications.forEach(notification => notification.remove())

  const notification = document.createElement('div')
  notification.className = 'contact-notification'
  
  const isSuccess = type === 'success'
  const bgColor = isSuccess ? 'linear-gradient(135deg, #059669, #10b981)' : 'linear-gradient(135deg, #dc2626, #ef4444)'
  const icon = isSuccess ? '✅' : '❌'
  
  notification.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${bgColor};
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      z-index: 9999;
      max-width: 350px;
      animation: slideInNotification 0.3s ease-out;
      border: 1px solid rgba(255, 255, 255, 0.2);
    ">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        ">${icon}</div>
        <div>
          <div style="font-weight: 600; margin-bottom: 4px;">
            ${isSuccess ? 'Message Ready!' : 'Error'}
          </div>
          <div style="font-size: 14px; opacity: 0.9;">
            ${message}
          </div>
        </div>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" style="
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
        font-size: 18px;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: background-color 0.2s;
      " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'" onmouseout="this.style.backgroundColor='transparent'">×</button>
    </div>
  `
  
  // Add animation styles if not already present
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style')
    style.id = 'notification-styles'
    style.textContent = `
      @keyframes slideInNotification {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `
    document.head.appendChild(style)
  }
  
  document.body.appendChild(notification)
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideInNotification 0.3s ease-out reverse'
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove()
        }
      }, 300)
    }
  }, 5000)
}

// Alternative function for direct WhatsApp contact
export const contactViaWhatsApp = (message?: string) => {
  const phoneNumber = '+233204185163' // Your phone number
  const defaultMessage = message || 'Hello Caleb! I found your portfolio and would like to get in touch.'
  const encodedMessage = encodeURIComponent(defaultMessage)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  
  window.open(whatsappUrl, '_blank')
}

// Function to copy email to clipboard
export const copyEmailToClipboard = () => {
  const email = 'kyereboatengcaleb@gmail.com'
  
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(() => {
      showNotification('success', 'Email address copied to clipboard!')
    }).catch(() => {
      fallbackCopyTextToClipboard(email)
    })
  } else {
    fallbackCopyTextToClipboard(email)
  }
}

const fallbackCopyTextToClipboard = (text: string) => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'
  
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  
  try {
    document.execCommand('copy')
    showNotification('success', 'Email address copied to clipboard!')
  } catch (err) {
    showNotification('error', 'Failed to copy email address')
  }
  
  document.body.removeChild(textArea)
}
