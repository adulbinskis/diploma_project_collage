const ArchiveSchema = require('../models/archive-model');

class ArchiveService {
    async createArchive(year, title, author, text, isActual) {
        return await ArchiveSchema.create({
            year,
            title,
            author,
            text,
            isActual
        });
    }

    async deleteArchive(id) {
        return ArchiveSchema.findByIdAndDelete({
            _id: id
        });
    }
    async deleteArchivePicture(id, picture) {
        return ArchiveSchema.findOneAndUpdate({
            _id: id
        },{
            $pull:{
                pictures: picture
            }
        });
    }

    async changeActuality(id, isActual) {
        return ArchiveSchema.findOneAndUpdate({
            _id: id
        },{
            isActual: isActual
        });
    }


    async editArchiveText(id, text) {
        return ArchiveSchema.findByIdAndUpdate({
            _id: id
        }, {
            text: text
        });
    }

    async addPicture(year, title, path) {
        // console.log(path)
        return ArchiveSchema.findOneAndUpdate({$and:[{year: year},{title: title}]}, {
            $addToSet:{
                pictures: path

            }
        });
    }
    async getText() {
        return ArchiveSchema.find( );
    }

}


module.exports = new ArchiveService();