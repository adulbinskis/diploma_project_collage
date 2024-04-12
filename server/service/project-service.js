const ProjectSchema = require('../models/project-model');

class ProjectService {
    async createProject(year, title, author, text, isActual) {
        return await ProjectSchema.create({
            year,
            title,
            author,
            text,
            isActual
        });
    }

    async deletePrioject(id) {
        return ProjectSchema.findByIdAndDelete({
            _id: id
        });
    }
    async deletePriojectPicture(id, picture) {
        return ProjectSchema.findOneAndUpdate({
            _id: id
        },{
            $pull:{
                pictures: picture
            }
        });
    }

    async changeActuality(id, isActual) {
        return ProjectSchema.findOneAndUpdate({
            _id: id
        },{
            isActual: isActual
        });
    }


    async editPriojectText(id, text) {
        return ProjectSchema.findByIdAndUpdate({
            _id: id
        }, {
            text: text
        });
    }

    async addPicture(year, title, path) {
        return ProjectSchema.findOneAndUpdate({$and:[{year: year},{title: title}]}, {
            $addToSet:{
                pictures: path

            }
        });
    }
    async getText() {
        return ProjectSchema.find( );
    }

}


module.exports = new ProjectService();