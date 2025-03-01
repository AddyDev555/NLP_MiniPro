import numpy as np
import pickle
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Load the trained model
model = load_model("essay_scoring_model2.h5")

# Load the tokenizer
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Define max sequence length (same as used during training)
MAX_SEQUENCE_LENGTH = 300  # Modify if needed

# Function to preprocess input text
def preprocess_text(text):
    sequences = tokenizer.texts_to_sequences([text])
    padded_sequence = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH, padding='post', truncating='post')
    return padded_sequence

# Function to make a prediction
def predict_score(text):
    processed_text = preprocess_text(text)
    prediction = model.predict(processed_text)
    
    # Round to nearest integer for score prediction
    predicted_score = np.round(prediction).flatten()[0]
    return predicted_score

# Take input from user
input_text='it was one of those days where i just sat around all day doing nothing but play  text and laugh at myself it was one of those days where no one bothered me no one even really talked to me no one told me to do chores by dinner time someone decided to call me up stairs to eat but let me tell you it was not anything like pizza although id rather eat it than get a lecture on not being thankful my brother came home for the first time in ever ate with us then decided to leave again but this time i asked to come with im so tired of beating  he said no of coarse i made my daddy change his mind for him of coarse i do not see why he would not let me come in the first place he was going to hang out with the guys i grew up with my friends not his anyways i got ready then we hit the road there him and i were laughing about dinner and what kind of music my mom listens to on our way to pick up my friends these guys are great all we do is crack jokes about each other and crack up but let us get down to business i did not tell you this but it is time around the of  fireworks are for sale and we are creating bombs out of them or they are since im a girl i guess im not allowed or something lame like that but there is this girl my brother likes and i guess he wants to impress excuse me impress her by showing up at her house so she can see these master pieces they have made that just makes me feel bad for him but honestly just made me laugh maybe she will be impressed key word maybe although no it will not because to this day they are still only friends so about these bombs complete duds we tried well i just watched over and over again to make em work but they would not do a thing eventually my friend put a whole bunch of s into my favorite stuffed animal it just made a bunch of sparkly colors and loud noises but it was pretty fun to watch we got in on video too it was a total good laugh for everyone after my brother said goodbye to his girl we decided to head home the thing is we had so many fireworks left we know this kid who lives somewhere on the way home so we decided to go by his house have get out of the truck light the firework on his porch have him jump in the tail of the trunk then drive off as fast as we could the first time we did it we could not stop laughing they did not come out of their house so we did it again they still did not come out we did it about one more time by then all the neighbors were out they were all so confused that just made us laugh even more it was so great we wanted to keep doing it but to someone else this time we know this girl who lives near all of us we thought why not it is not gonna hurt to stop there real quick and have some fun with her too apparently she thought different way different actually she thought it was the rudest thing ever we were just joking around gettin a laugh out of all our fun we were not being rude she is our friend long story short her mom got mad too and chased us down in her car she never caught us but she got our license plate number the next day on the of  she called the police they did not think it was a big deal but they still showed up at my house and talked to my parents about what went down i was at my boyfriends so lucky me i only had to talk to my mom on the phone about it she realized we were just having fun and actually laughed about it too that of was great it was one of those nights where you laughed the whole time and would not change a thing even if you got in trouble with the law for it something i will definitely never do again but im so glad i have this hilarious memory to reminisce on for the rest of my life'

# Predict and display the score
predicted_score = predict_score(input_text)
print(f"Predicted Score: {predicted_score}")