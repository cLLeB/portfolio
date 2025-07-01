export const downloadResume = () => {
  // Create a temporary link element
  const link = document.createElement('a')
  
  // For now, we'll create a placeholder resume
  // In a real scenario, you would host your actual resume PDF
  const resumeUrl = '/resume/Caleb_Kyere_Boateng_Resume.pdf'
  
  // Check if the resume file exists, if not, show a message
  fetch(resumeUrl, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        // File exists, proceed with download
        link.href = resumeUrl
        link.download = 'Caleb_Kyere_Boateng_Resume.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        // File doesn't exist, show notification
        showResumeNotification()
      }
    })
    .catch(() => {
      // Error occurred, show notification
      showResumeNotification()
    })
}

const showResumeNotification = () => {
  // Create a notification element
  const notification = document.createElement('div')
  notification.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #1e293b, #334155);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      border: 1px solid rgba(59, 130, 246, 0.3);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      z-index: 9999;
      max-width: 300px;
      animation: slideIn 0.3s ease-out;
    ">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        ">📄</div>
        <div>
          <div style="font-weight: 600; margin-bottom: 4px;">Resume Available Soon</div>
          <div style="font-size: 14px; color: #cbd5e1;">
            Please contact me directly for my latest resume.
          </div>
        </div>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" style="
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        color: #94a3b8;
        cursor: pointer;
        font-size: 18px;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
      ">×</button>
    </div>
  `
  
  // Add animation styles
  const style = document.createElement('style')
  style.textContent = `
    @keyframes slideIn {
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
  
  document.body.appendChild(notification)
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Alternative function to open email client
export const contactForResume = () => {
  const subject = encodeURIComponent('Resume Request - Caleb Kyere Boateng')
  const body = encodeURIComponent(`Hello Caleb,

I would like to request your latest resume for review.

Best regards`)
  
  const mailtoLink = `mailto:kyereboatengcaleb@gmail.com?subject=${subject}&body=${body}`
  window.open(mailtoLink, '_blank')
}
