export async function readAsync(file, readAs) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function () {
            reject(new Error('Unable to read..'));
        };
        if (readAs === 'string') {
            reader.readAsText(file);
        }
        else {
            reader.readAsArrayBuffer(file);
        }
    });
}
