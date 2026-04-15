export default function FloatingChat() {
  return (
    <a
      href="sms://1234567890" // Standard SMS link
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Send SMS"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-blue-600 px-6 py-3 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-transform hover:scale-105 hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        <path d="M8 12h.01" />
        <path d="M12 12h.01" />
        <path d="M16 12h.01" />
      </svg>
      <span className="text-sm font-bold text-white">Chat with Us</span>
    </a>
  );
}
