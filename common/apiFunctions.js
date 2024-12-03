// @ts-check

import { loginAccount, eventInfo } from './testdata.js';
import { URL, fileName } from './constants.js';
const { expect } = require('@playwright/test');

//Using API to log in and store Cookie
export async function authenticateAndStoreCookie(request) {
    const headerObject = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    };
    
    const userObject = {
        "user": {
            "email": loginAccount.email,
            "password": loginAccount.password
        }
    };

    const emailVerification = {
        "user": {
            "code": "000000",
            "email": loginAccount.email,
        }
    };

    await request.post(URL.legacyBaseUrl + "/api/session", {
        headers: headerObject,
        data: userObject
    });

    await request.post(URL.legacyBaseUrl + "/api/session/verify_email", {
        headers: headerObject,
        data: emailVerification
    });
    request.storageState({ path: fileName.cookieFile });
};

// Using API to create a new Event
export async function createNewEventAndStoreEventId(request) {
    const responseEvent = await request.post(URL.legacyBaseUrl + "/api/events", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },

        data: {
            "event": {
                "name": eventInfo.eventName,
                "title": eventInfo.eventTitle
            }
        }
    });

    const responseBody = await responseEvent.json();
    //console.log(responseBody);
    return responseBody.data.attributes.uuid
};

// Using API to Delete an event
export async function deleteEvent(request, eventUUID) {
    await request.delete(URL.legacyBaseUrl + "/api/events/" + eventUUID, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }
    })
};

// Using API to delete test failed event
export async function deleteAllTestEvent(request) {
    const responseEvent = await request.get(URL.legacyBaseUrl + "/api/events?sort=recent", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }
    });

    const responseBody = await responseEvent.json();

    for (let i = 0; i < responseBody.data.length; i++) {
        if (await responseBody.data[i].attributes.name.includes("Event automated testing")) {
            await deleteEvent(request, await responseBody.data[i].attributes.uuid);
        }
    }
};

// Using API to get scene UUID
export async function getSceneId(request, eventUUID) {
    const responseEvent = await request.get(URL.legacyBaseUrl + "/api/events/" + eventUUID + "/scenes", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }
    });
    expect(responseEvent.ok()).toBeTruthy();
    expect(responseEvent.status()).toEqual(200);
    const responseBody = await responseEvent.json();
    return responseBody.data[0].attributes.uuid;
};

//Using API to add new scene
export async function addNewSceneByApi(request, eventUUID, sceneName) {
    const responseEvent = await request.post(URL.legacyBaseUrl + "/api/events/" + eventUUID + "/scenes", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: {
            "name": sceneName
        }
    });
 
    expect(responseEvent.status()).toEqual(201);
    const responseBody = await responseEvent.json();
    return responseBody.data.attributes.uuid;
};

// Using API to upload image to media library
// export async function directUpload(request, imageObject, eventUUID) {
//     const responseEvent = await request.post(URL.legacyBaseUrl + "/api/direct_upload", {
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//             "X-Requested-With": "XMLHttpRequest"
//         },
//         data: {
//             "blob": imageObject
//         }
//     });
    
//     expect(responseEvent.status()).toEqual(201);
//     console.log("status code: " + responseEvent.status());
//     const responseBody = await responseEvent.json();
//     console.log(responseBody);
//     console.log(responseBody.direct_upload.url);
//     const imageName = responseBody.filename;
//     const byteSize = responseBody.byte_size;
//     const headersData = responseBody.direct_upload.headers;
//     const bodyData = responseBody.signed_id;

//     const response2API = await request.put(responseBody.direct_upload.url, {
//         headers: headersData,
//         data: {
//             "name": imageName,
//             "size": byteSize,
//             "type": "image/jpeg",
//             "webkitRelativePath": ""
//         }
//     });

//     expect(response2API.status()).toEqual(200);
//     const responseBody2 = await response2API.json();
//     console.log(responseBody2);

//     const response3API = await request.post(URL.legacyBaseUrl + "/api/events/" + eventUUID + "/event_assets", {
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//             "X-Requested-With": "XMLHttpRequest"
//         },
//         data: {
//             file_signed_id: bodyData
//         }
//     });
//     //expect(response3API.status()).toEqual(201);
//     console.log(response3API.json());
//     console.log(response3API.json().data.attributes.file.url);

// };



// Using API to add new guest to greenroom
export async function addNewGuest(request, eventUUID, guestObject) {
    await request.post(URL.legacyBaseUrl + "/api/events/" + eventUUID + "/guests", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: {
            "guest":
            {
                "name": guestObject.guestName,
                "email": guestObject.guestEmail,
                "title": guestObject.guestLabel,
                "location": guestObject.guestLocation,
                "guest_title": guestObject.guestTitle
            }
        }
    })
};


// Using API to create a new Poll style A
export async function createNewPoll(request, eventUUID, sceneUUID) {
    await request.post(URL.legacyBaseUrl + "/api/events/" + eventUUID + "/scenes/" + sceneUUID + "/elements", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: {
            "element":
            {
                "type": "Element::Poll",
                "poll_attributes":
                    { "style_type": "Style A" }
            }
        }
    })
};

// Using API to create a new Meter style Classic
export async function createNewMeter(request, eventUUID, sceneUUID) {
    await request.post(URL.legacyBaseUrl + "/api/events/" + eventUUID + "/scenes/" + sceneUUID + "/elements", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: {
            "element":
            {
                "type": "Element::Meter",
                "meter_attributes":
                    { "style_type": "Classic" }
            }
        }
    })
};

//Using API to create a new shape widget style Line
export async function createNewShape(request, eventUUID, sceneUUID) {
    await request.post(URL.legacyBaseUrl + "/api/events/" + eventUUID + "/scenes/" + sceneUUID + "/elements", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: {
            "element":
            {
                "type": "Element::Shape",
                "shape_attributes":
                    {"name": "Line"}
            }
        }
    })
};

// Using API to create a QRCode style A
export async function createNewQRCode(request, eventUUID, sceneUUID) {
    await request.post(URL.legacyBaseUrl + "/api/events/" + eventUUID + "/scenes/" + sceneUUID + "/elements", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: {
            "element":
            {
                "type": "Element::QrCode",
                "qr_code_attributes":
                {
                    "style_type": "Style A",
                    "qr_color_1": "#000000"
                }
            }
        }
    })
};

// Using API to create a Text widget
export async function createNewTextWidget(request, eventUUID, sceneUUID) {
    await request.post(URL.legacyBaseUrl + "/api/events/" + eventUUID + "/scenes/" + sceneUUID + "/elements", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: {
            "element":
                { "type": "Element::Text" }
        }
    })
};

// Using API to create a WordWatch
export async function createNewWordWatch(request, eventUUID, sceneUUID) {
    await request.post(URL.legacyBaseUrl + "/api/events/" + eventUUID + "/scenes/" + sceneUUID + "/elements", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: {
            "element":
            {
                "type": "Element::Tracker",
                "tracker_attributes":
                    { "style_type": "Classic" }
            }
        }
    })
};


// Using API to create a Banner Ticker without text
export async function createNewBanner(request, eventUUID, sceneUUID) {
    await request.post(URL.legacyBaseUrl + "/api/events/" + eventUUID + "/scenes/" + sceneUUID + "/elements", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: {
            "element":
                { "type": "Element::Ticker" }
        }
    })
};

// Create a Banner Ticker with text
export async function createNewTickerWithText(request, eventUUID, sceneUUID, tickerText) {
    await request.post(URL.legacyBaseUrl + "/api/events/" + eventUUID + "/scenes/" + sceneUUID + "/elements", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        data: {
            "element":
                { "type": "Element::Ticker", 
                "ticker_attributes": {"text": tickerText}
                }
        }
    })
};
