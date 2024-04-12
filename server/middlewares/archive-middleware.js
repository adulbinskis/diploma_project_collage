const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination(req, file, cb){
        let params = req.query
        let pathYear = 'public/images/'+ params.year;
        let pathYearTitle ='public/images/'+ params.year + '/' + params.title + '/'
        file.path = pathYear;

        try {
            if (!fs.existsSync(pathYear)) {
                fs.mkdirSync(pathYear);
            }
            if(!fs.existsSync(pathYearTitle)){
                fs.mkdirSync(pathYearTitle);
            }
        } catch(err) {
            console.error(err)
        }

        cb(null, pathYearTitle)
    },
    filename(req, file, cb){

        cb(null, 'filename' + Date.now() + file.originalname)
    }
})

const types = ['image/png','image/jpeg','image/jpg']

const fileFilter = (req, file, cb) =>{
    if(types.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

module.exports = multer({storage, fileFilter})