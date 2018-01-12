const compliments = [
    "Your smile is contagious.",
    "You look great today.",
    "You're a smart cookie.",
    "I bet you make babies smile.",
    "You have impeccable manners.",
    "I like your style.",
    "You have the best laugh.",
    "I appreciate you.",
    "You are the most perfect you there is.",
    "You are enough.",
    "You're strong.",
    "Your perspective is refreshing.",
    "You're an awesome friend.",
    "You light up the room.",
    "You deserve a hug right now.",
    "You should be proud of yourself.",
    "You're more helpful than you realize.",
    "You have a great sense of humor.",
    "You've got all the right moves!",
    "Is that your picture next to 'charming' in the dictionary?",
    "Your kindness is a balm to all who encounter it.",
    "You're all that and a super-size bag of chips.",
    "On a scale from 1 to 10, you're an 11.",
    "You are brave.",
    "You're even more beautiful on the inside than you are on the outside.",
    "You have the courage of your convictions.",
    "Your eyes are breathtaking.",
    "If cartoon bluebirds were real, a bunch of them would be sitting on your shoulders singing right now.",
    "You are making a difference.",
    "You're like sunshine on a rainy day.",
    "You bring out the best in other people.",
    "Your ability to recall random factoids at just the right time is impressive.",
    "You're a great listener.",
    "How is it that you always look great, even in sweatpants?",
    "Everything would be better if more people were like you!",
    "I bet you sweat glitter.",
    "You were cool way before hipsters were cool.",
    "That color is perfect on you.",
    "Hanging out with you is always a blast.",
    "You always know -- and say -- exactly what I need to hear when I need to hear it.",
    "You smell really good.",
    "You may dance like no one's watching, but everyone's watching because you're an amazing dancer!",
    "Being around you makes everything better!",
    "When you say, 'I meant to do that,' I totally believe you.",
    "When you're not afraid to be yourself is when you're most incredible.",
    "Colors seem brighter when you're around.",
    "You're more fun than a ball pit filled with candy. (And seriously, what could be more fun than that?)",
    "That thing you don't like about yourself is what makes you so interesting.",
    "You're wonderful.",
    "You have cute elbows. For reals! (You're halfway through the list. Don't stop now! You should be giving at least one awesome compliment every day!)",
    "Jokes are funnier when you tell them.",
    "You're better than a triple-scoop ice cream cone. With sprinkles.",
    "Your bellybutton is kind of adorable.",
    "Your hair looks stunning.",
    "You're one of a kind!",
    "You're inspiring.",
    "If you were a box of crayons, you'd be the giant name-brand one with the built-in sharpener.",
    "You should be thanked more often. So thank you!!",
    "Our community is better because you're in it.",
    "Someone is getting through something hard right now because you've got their back. ",
    "You have the best ideas.",
    "You always know how to find that silver lining.",
    "Everyone gets knocked down sometimes, but you always get back up and keep going.",
    "You're a candle in the darkness.",
    "You're a great example to others.",
    "Being around you is like being on a happy little vacation.",
    "You always know just what to say.",
    "You're always learning new things and trying to better yourself, which is awesome.",
    "If someone based an Internet meme on you, it would have impeccable grammar.",
    "You could survive a Zombie apocalypse.",
    "You're more fun than bubble wrap.",
    "When you make a mistake, you fix it.",
    "Who raised you? They deserve a medal for a job well done.",
    "You're great at figuring stuff out.",
    "Your voice is magnificent.",
    "The people you love are lucky to have you in their lives.",
    "You're like a breath of fresh air.",
    "You're gorgeous -- and that's the least interesting thing about you, too.",
    "You're so thoughtful.",
    "Your creative potential seems limitless.",
    "Your name suits you to a T.",
    "You're irresistible when you blush.",
    "Actions speak louder than words, and yours tell an incredible story.",
    "Somehow you make time stop and fly at the same time.",
    "When you make up your mind about something, nothing stands in your way.",
    "You seem to really know who you are.",
    "Any team would be lucky to have you on it.",
    "In high school I bet you were voted 'most likely to keep being awesome.'",
    "I bet you do the crossword puzzle in ink.",
    "Babies and small animals probably love you.",
    "If you were a scented candle they'd call it Perfectly Imperfect (and it would smell like summer).",
    "There's ordinary, and then there's you.",
    "You're someone's reason to smile.",
    "You're even better than a unicorn, because you're real.",
    "How do you keep being so funny and making everyone laugh?",
    "You have a good head on your shoulders.",
    "Has anyone ever told you that you have great posture?",
    "The way you treasure your loved ones is incredible.",
    "You're really something special.",
    "You're a gift to those around you."
];

const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library

exports.complimentSomeone = functions.https.onRequest((request, response) => {
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
    if (request.body.result) {
        giveCompliment(request, response);
    } else {
        console.log('Invalid Request');
        return response.status(400).end('Invalid Webhook Request (expecting v1 or v2 webhook request)');
    }
});
/*
* Function to handle v1 webhook requests from Dialogflow
*/
function giveCompliment(request, response) {
    let action = request.body.result.action; // https://dialogflow.com/docs/actions-and-parameters
    let parameters = request.body.result.parameters; // https://dialogflow.com/docs/actions-and-parameters
    let inputContexts = request.body.result.contexts; // https://dialogflow.com/docs/contexts
    let requestSource = (request.body.originalRequest) ? request.body.originalRequest.source : undefined;
    const googleAssistantRequest = 'google'; // Constant to identify Google Assistant requests
    const app = new DialogflowApp({ request: request, response: response });
    // Create handlers for Dialogflow actions as well as a 'default' handler
    const actionHandlers = {
        // The default welcome intent has been matched, welcome the user (https://dialogflow.com/docs/events#default_welcome_intent)
        'input.welcome': () => {
            // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
            if (requestSource === googleAssistantRequest) {
                sendGoogleResponse('Hello, Welcome to my Dialogflow agent!'); // Send simple response to user
            } else {
                sendResponse('Hello, Welcome to my Dialogflow agent!'); // Send simple response to user
            }
        },
        // The default fallback intent has been matched, try to recover (https://dialogflow.com/docs/intents#fallback_intents)
        'input.unknown': () => {
            // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
            if (requestSource === googleAssistantRequest) {
                sendGoogleResponse('I\'m having trouble, can you try threat again?'); // Send simple response to user
            } else {
                sendResponse('I\'m having trouble, can you try that again?'); // Send simple response to user
            }
        },
        // Default handler for unknown or undefined actions
        'default': () => {
            // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
            if (requestSource === googleAssistantRequest) {
                let responseToUser = {
                    //googleRichResponse: googleRichResponse, // Optional, uncomment to enable
                    //googleOutputContexts: ['weather', 2, { ['city']: 'rome' }], // Optional, uncomment to enable
                    speech: 'This message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
                    text: 'This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
                };
                sendGoogleResponse(responseToUser);
            } else {
                let responseToUser = {
                    //data: richResponsesV1, // Optional, uncomment to enable
                    //outputContexts: [{'name': 'weather', 'lifespan': 2, 'parameters': {'city': 'Rome'}}], // Optional, uncomment to enable
                    speech: 'This message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
                    text: 'This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
                };
                sendResponse(responseToUser);
            }
        },
        'respondWithCompliment': () => {
            var name = parameters['given-name'];
            var numberOfCompliments = compliments.length;
            var index = Math.floor(Math.random() * (numberOfCompliments));
            index = index >= numberOfCompliments ? numberOfCompliments - 1 : index;
            var compliment = compliments[index] + ' Would you like another compliment?';
            var response = name ? name + ',  ' + compliment : compliment;
            if (requestSource === googleAssistantRequest) {
                sendGoogleResponse(response); // Send simple response to user
            } else {
                sendResponse(response); // Send simple response to user
            }
        }
    };
    // If undefined or unknown action use the default handler
    if (!actionHandlers[action]) {
        action = 'default';
    }
    // Run the proper handler function to handle the request from Dialogflow
    actionHandlers[action]();
    // Function to send correctly formatted Google Assistant responses to Dialogflow which are then sent to the user
    function sendGoogleResponse(responseToUser) {
        if (typeof responseToUser === 'string') {
            app.ask(responseToUser); // Google Assistant response
        } else {
            // If speech or displayText is defined use it to respond
            let googleResponse = app.buildRichResponse().addSimpleResponse({
                speech: responseToUser.speech || responseToUser.displayText,
                displayText: responseToUser.displayText || responseToUser.speech
            });
            // Optional: Overwrite previous response with rich response
            if (responseToUser.googleRichResponse) {
                googleResponse = responseToUser.googleRichResponse;
            }
            // Optional: add contexts (https://dialogflow.com/docs/contexts)
            if (responseToUser.googleOutputContexts) {
                app.setContext(...responseToUser.googleOutputContexts);
            }
            console.log('Response to Dialogflow (AoG): ' + JSON.stringify(googleResponse));
            app.ask(googleResponse); // Send response to Dialogflow and Google Assistant
        }
    }
    // Function to send correctly formatted responses to Dialogflow which are then sent to the user
    function sendResponse(responseToUser) {
        // if the response is a string send it as a response to the user
        if (typeof responseToUser === 'string') {
            let responseJson = {};
            responseJson.speech = responseToUser; // spoken response
            responseJson.displayText = responseToUser; // displayed response
            response.json(responseJson); // Send response to Dialogflow
        } else {
            // If the response to the user includes rich responses or contexts send them to Dialogflow
            let responseJson = {};
            // If speech or displayText is defined, use it to respond (if one isn't defined use the other's value)
            responseJson.speech = responseToUser.speech || responseToUser.displayText;
            responseJson.displayText = responseToUser.displayText || responseToUser.speech;
            // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
            responseJson.data = responseToUser.data;
            // Optional: add contexts (https://dialogflow.com/docs/contexts)
            responseJson.contextOut = responseToUser.outputContexts;
            console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
            response.json(responseJson); // Send response to Dialogflow
        }
    }
}
// Construct rich response for Google Assistant (v1 requests only)
const app = new DialogflowApp();
const googleRichResponse = app.buildRichResponse()
    .addSimpleResponse('This is the first simple response for Google Assistant')
    .addSuggestions(
    ['Suggestion Chip', 'Another Suggestion Chip'])
    // Create a basic card and add it to the rich response
    .addBasicCard(app.buildBasicCard(`This is a basic card.  Text in a
 basic card can include "quotes" and most other unicode characters
 including emoji 📱.  Basic cards also support some markdown
 formatting like *emphasis* or _italics_, **strong** or __bold__,
 and ***bold itallic*** or ___strong emphasis___ as well as other things
 like line  \nbreaks`) // Note the two spaces before '\n' required for a
        // line break to be rendered in the card
        .setSubtitle('This is a subtitle')
        .setTitle('Title: this is a title')
        .addButton('This is a button', 'https://assistant.google.com/')
        .setImage('https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
        'Image alternate text'))
    .addSimpleResponse({
        speech: 'This is another simple response',
        displayText: 'This is the another simple response 💁'
    });

