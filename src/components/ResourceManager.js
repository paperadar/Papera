const fs = require('fs');
const path = require('path');

exports.listDir = (rootpath, with_root = false) => {
    var files = Array();
    var dirs = Array();
    ret = fs.readdirSync(rootpath);
    for (let each in ret) {
        stat = fs.statSync(path.join(rootpath, ret[each]));
        if(path.extname(ret[each]) == '.pdf') {
            if(with_root) files.push(path.join(rootpath, ret[each]));
            else files.push(ret[each]);
        }
        else if(stat.isDirectory()) {
            if(with_root) dirs.push(path.join(rootpath, ret[each]));
            else dirs.push(ret[each]);
            
        }
    }
    return {files:files, dirs:dirs};
}