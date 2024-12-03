import { faker } from '@faker-js/faker';

export const loginAccount = {
  "email": "e2eautomatedtesting@effi.xyz",
  "password": "password",
  "passCode": "000000"
};

export const eventInfo = {
  "eventName": "Event automated testing " + Math.floor(Math.random() * 10000),
  "eventTitle": "Event automated testing"
};

export const sceneInfo = {
  "sceneBackgroundColor": "#B8BA0F",
  "firstSceneName": "Scene 1",
  "secondSceneName": "Scene 2",
  "sceneEditedName": "Scene A",
  "sceneDuplicatedName": "Copy of Scene 1"
};

export const guestInfo = {
  "guestName": faker.person.fullName(),
  "guestEmail": faker.internet.email(),
  "guestTitle": "Supervisor", 
  "guestLocation": "NewYork",
  "guestLabel": "Host"
};

export const pollTestData = {
  "question": "How are you?",
  "instruction": "Type your answer in the chat",
  "firstChoiceNumber": "100",
  "firstChoiceAnswer": "I am good",
  "secondChoiceNumber": "200",
  "secondChoiceAnswer": "Not bad",
  "thirdChoiceNumber": "300",
  "thirdChoiceAnswer": "Fantastic",
  "backgroundHexColor" : "#A38E3E",
  "resultBgHexColor": "#3645CF",
  "borderThickness": "10",
  "borderHexColor": "#3645CF",
  "font": "Oxygen",
  "fontStyle": "Regular",
  "fontSize": "30",
  "fontColor": "#580D0D"
};

export const meterTestData = {
  "font": "Oswald",
  "fontStyle": "Bold",
  "fontSize": "40",
  "fontColor": "#FFFFFF"
}

export const meterWidgetTestData = {
  "question": "How are you?",
  "leftOption" : "#Good",
  "leftOptionAnswer": "good",
  "rightOption" : "#Bad",
  "rightOptionAnswer": "bad",
  "backgroundHexColor": "#1FBABA",
  "borderThickness": "5",
  "borderHexColor": "#E507ED",
  "leftOptionHexColor": "#0518E7",
  "rightOptionHexColor": "#B3620C",
  "pointerHexColor": "#C3E30A",
  "font": "Roboto",
  "fontStyle": "Regular",
  "fontSize": "30",
  "fontHexColor": "#0F0EB0",
};

export const shapeWidgetTestData = {
  "hexColor": "#C961B2",
  "lineStyle": "Dash"
};

export const QRCodeTestData = {
  "destinationUrl": "https://www.effi.xyz/",
  "QRHexColor": "#C6C961",
  "backgroundHexColor": "#3E0C93"
};

export const textWidgetTestData = {
  "textContent": "How are you?",
  "font": "Roboto",
  "fontStyle": "Regular",
  "fontSize": "40",
  "fontHexColor": "#C452E3",
  "backgroundHexColor": "#73EB86"
};

export const wordWatchTestData = {
  "firstChoiceWord": "Anna",
  "firstChoiceHexColor": "#D73CE8", 
  "seconChoicedWord": "Ben",
  "secondChoiceHexColor": "#19BD60",
  "newChoicetWord": "Cindy",
  "newChoiceHexColor": "#D7E511",
  "fontFamily": "Roboto",
  "fontStyle": "Regular",
  "fontSize": "30",
  "fontHexColor": "#BF4E15",
  "backgroundHexColor": "#9CAB17"
};

export const bannerTestData = {
  "tickerText": "Hello from Effi",
  "tickerTextMultiLines": "Hello from Effi\nHave a good day!",
  "breakSymbolShapeValue": "heart-closed",
  "breakSymbolHexColor": "#BA11D9",
  "fontHexColor": "#09853B",
  "fontFamily": "Poppins",
  "fontStyle": "Regular",
  "fontSize": "40",
  "backgroundHexColor": "#E6D481",
  "borderThickness": "8",
  "borderHexColor": "#1B1DE3"
};

export const sponsorTestData = {
  "sponsorText": "Testing Effi sponsor",
  "fontFamily": "Poppins",
  "fontStyle": "Bold",
  "fontSize": "30",
  "fontHexColor": "#32C7C7",
  "backgroundHexColor": "#075F0D",
  "borderHexColor": "#ED1C46"
};