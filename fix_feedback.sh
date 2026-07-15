#!/bin/bash
FILE="src/components/FeedbackBoard.tsx"

sed -i 's|<MessageSquare className="w-6 h-6" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849034/comunidadeefeedback.gif" className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Comunidade" />|g' $FILE

