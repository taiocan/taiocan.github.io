export function start_nfc(callback) {
    if ("NDEFReader" in window) {
        const reader = new NDEFReader();
        reader.scan().then(() => {
            reader.onreading = (event) => {
                const decoder = new TextDecoder();
                for (const record of event.message.records) {
                    const data = decoder.decode(record.data);
                    callback(data);
                }
            };
        }).catch(error => {
            console.error("NFC Scan failed:", error);
        });
    } else {
        alert("Web NFC is not supported on this device or browser.");
    }
}



// export function start_nfc(callback) {
//     if ('NDEFReader' in window) {
//         const reader = new NDEFReader();
//         reader.scan().then(() => {
//             reader.onreading = (event) => {
//                 for (const record of event.message.records) {
//                     if (record.recordType === "text") {
//                         record.data = record.data || record.data || new TextDecoder().decode(record.data);
//                         callback(record.data || "");
//                     }
//                 }
//             };
//         }).catch(error => {
//             console.error("NFC scan failed to start:", error);
//         });
//     } else {
//         console.warn("Web NFC not supported on this device or browser.");
//     }
// }
//
