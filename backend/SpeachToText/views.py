from rest_framework.decorators import api_view
from rest_framework.response import Response
from pydub import AudioSegment
import speech_recognition as spr

@api_view(['POST'])
def speech_to_text(request):
    audio_file = request.FILES.get('audio_file')

    # Save the uploaded audio file temporarily
    with open('audio_in.ogg', 'wb') as destination:
        for chunk in audio_file.chunks():
            destination.write(chunk)

    # Convert the audio to WAV format
    audio = AudioSegment.from_file('audio_in.ogg')
    audio.export('audio_in.wav', format='wav')

    # Perform speech-to-text
    recognizer = spr.Recognizer()
    with spr.AudioFile('audio_in.wav') as source:
        audio_data = recognizer.record(source)

    transcribed_text = recognizer.recognize_google(audio_data, language="he")
    return Response({'transcribed_text': transcribed_text})