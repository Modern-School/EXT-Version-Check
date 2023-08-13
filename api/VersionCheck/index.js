const lastVersion = {
    'Modern-School': '1.1.0',
    'Modern-School.Prologue': '1.1.0',
};
/**
 * @description 判断版本是否为最新
 * @param {string} version 当前版本
 * @param {string} lastVersion 最新版本
 * @return {boolean} 是否为最新
 */
function isVersionNew(version, lastVersion) {
    let versionSplit = version.split('.');
    let lastVersionSplit = lastVersion.split('.');
    for (let i = 0; i <= 3; i++) {
        if (versionSplit[i] < lastVersionSplit[i]) {
            return false;
        }
    }
    return true;
}
export default function handler(request, response) {
    const { version, name } = request.query;
    const extensionLastVersion = lastVersion[name];
    let output;
    if (version && extensionLastVersion) {
        output = `<meta charset="UTF-8"><title>VersionCheck</title>
<body style="background-color: black;color: white;">
    <div style="text-align: center;">
        <h1>The Extension Version is ${
            isVersionNew(version, extensionLastVersion) ? 'the lastest version' : 'outdated'
        } </h1><br />
        Your version: ${version}<br />
        The lastest version: ${extensionLastVersion}
    </div>
</body>`;
        response.status(200).send(output);
    } else {
        output = `<meta charset="UTF-8"><title>404 Not Found</title>
<body style="background-color: black;color: white;">
    <div style="text-align: center;">
        <h1>404 Not Found</h1>
    </div>
</body>`;
        response.status(404).send(output);
    }
}
