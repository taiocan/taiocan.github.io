export function start_nfc(callback) {
    if ('NDEFReader' in window) {
        const reader = new NDEFReader();
        reader.scan().then(() => {
            reader.onreading = (event) => {
                for (const record of event.message.records) {
                    if (record.recordType === "text") {
                        record.data = record.data || record.data || new TextDecoder().decode(record.data);
                        callback(record.data || "");
                    }
                }
            };
        }).catch(error => {
            console.error("NFC scan failed to start:", error);
        });
    } else {
        console.warn("Web NFC not supported on this device or browser.");
    }
}

