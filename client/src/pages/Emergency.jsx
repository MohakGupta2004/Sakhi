import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import '../styles/Emergency.css';

function Emergency() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  const handleMicrophoneClick = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
        setIsRecording(true);
        
        // Simulate sending emergency message after 3 seconds
        setTimeout(() => {
          stream.getTracks().forEach(track => track.stop());
          setIsRecording(false);
          alert('Emergency message has been sent to the police!');
        }, 3000);
      } catch (err) {
        setHasPermission(false);
        alert('Please allow microphone access to use this feature');
      }
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="emergency-container">
      <div className="emergency-card">
        <h1 className="title text-2xl font-bold mb-8">Emergency Voice Alert</h1>
        
        <button 
          onClick={handleMicrophoneClick}
          className="mic-button"
          aria-label="Toggle microphone"
        >
          {isRecording ? (
            <MicOff size={48} className="red" />
          ) : (
            <Mic size={48} className="grey" />
          )}
        </button>

        <p className={`status-text ${isRecording ? 'recording' : ''}`}>
          {isRecording 
            ? 'Recording emergency message...' 
            : 'Click the microphone to send an emergency alert'}
        </p>

        {hasPermission === false && (
          <p className="text-red-500 mt-4">
            Microphone access is required for this feature
          </p>
        )}
      </div>
    </div>
  );
}

export default Emergency;