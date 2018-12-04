import RNFS from 'react-native-fs'

const downloadFile = (url, name, progressCb) => {
    // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)

    // 文件
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${name}`
    const formUrl = url

    const options = {
        fromUrl: formUrl,
        toFile: downloadDest,
        progressDivider: 5,
        background: true,
        begin: (res) => {
            console.log('begin', res)
            console.log('contentLength:', res.contentLength / 1024 / 1024, 'M')
        },
        progress: (res) => {
            let pro = res.bytesWritten / res.contentLength
            progressCb && progressCb(pro)
        }
    };
    try {
        const ret = RNFS.downloadFile(options)
        ret.promise.then(res => {
            console.log('success', res)

            console.log('file://' + downloadDest)

        }).catch(err => {
            console.log('err', err)
        });
    }
    catch (e) {
        console.log(error)
    }
}

export default downloadFile