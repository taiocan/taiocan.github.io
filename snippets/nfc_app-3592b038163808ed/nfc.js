export function start_nfc(callback) {
    if (!("NDEFReader" in window)) {
        console.warn("Web NFC is not supported.");
        return;
    }

    const reader = new NDEFReader();
    reader.scan().then(() => {
        reader.onreading = event => {
            for (const record of event.message.records) {
                if (record.recordType === "url" || record.recordType === "text") {
                    const decoder = new TextDecoder();
                    const text = decoder.decode(record.data);
                    callback(text);
                }
            }
        };
    }).catch(err => {
        console.error("NFC error:", err);
    });
}

