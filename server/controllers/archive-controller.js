const archiveService = require('../service/archive-service');
const fs = require('fs');
const UserModel = require("../models/user-model");
const UserDto = require("../user-dto/user-dto");
const ApiError = require("../exceptions/api-error");


class ArchiveController {
    async createArchive(req, res, next) {
        try {
            const {year, title,author,text, isActual} = req.body;
            const email = req.user.email

            const currentUser = await UserModel.findOne({email})
            const userDto = new UserDto(currentUser);

            if(!userDto.isActivated){
                return next(ApiError.NotActivated());
            }
            const archiveData = await archiveService.createArchive(year, title,author,text, isActual);
            return res.json(archiveData);
        } catch (e) {
            next(e);
        }
    }

    async deleteArchive(req, res, next) {
        try {
            const {id , year, title} = req.body;
            const email = req.user.email

            const currentUser = await UserModel.findOne({email})
            const userDto = new UserDto(currentUser);

            if(!userDto.isActivated){
                return next(ApiError.NotActivated());
            }
            fs.rmSync('./public/images/'+year+'/'+ title, { recursive: true, force: true });
            const archiveData = await archiveService.deleteArchive(id);
            return res.json(archiveData);
        } catch (e) {
            next(e);
        }
    }

    async deleteArchivePicture(req, res, next) {
        try {
            const {picture, archiveId} = req.body;
            const email = req.user.email

            const currentUser = await UserModel.findOne({email})
            const userDto = new UserDto(currentUser);

            if(!userDto.isActivated){
                return next(ApiError.NotActivated());
            }

            fs.rmSync('./public'+ picture, { recursive: true, force: true });
           

            const archiveData = await archiveService.deleteArchivePicture(archiveId, picture);
            return res.json(archiveData);
        } catch (e) {
            next(e);
        }
    }

    async editArchiveText(req, res, next) {
        try {
            const {id, text} = req.body
            const email = req.user.email

            const currentUser = await UserModel.findOne({email})
            const userDto = new UserDto(currentUser);

            if(!userDto.isActivated){
                return next(ApiError.NotActivated());
            }

            const archiveData = await archiveService.editArchiveText(id, text);
            return res.json(archiveData);
        } catch (e) {
            next(e);
        }
    }

    async addPictureToArchive(req, res, next) {
        try {

            const year = req.query.year
            const title = req.query.title
            const email = req.user.email

            const currentUser = await UserModel.findOne({email})
            const userDto = new UserDto(currentUser);

            if(!userDto.isActivated){
                return next(ApiError.NotActivated());
            }

            const pathYearTitle =  '/images/'+ year + '/' + title + '/'
            const files = fs.readdirSync('./public/images/' + year+ '/' + title);
            let path = []
            for(let index = 0; index < files.length; index++){
                path.push(pathYearTitle + files[index])
            }
            const archive = await archiveService.addPicture(year, title, path)
            return res.json(archive);
        } catch (e) {
            next(e);
        }
    }

    async changeActuality(req, res, next) {
        try {
            const {id, isActual} = req.body
            const email = req.user.email

            const currentUser = await UserModel.findOne({email})
            const userDto = new UserDto(currentUser);

            if(!userDto.isActivated){
                return next(ApiError.NotActivated());
            }

            const archive = await archiveService.changeActuality(id , isActual);
            return res.json(archive);

        } catch (e) {
            next(e);
        }
    }

    async getArchiveText(req, res, next) {
        try {
            const archive = await archiveService.getText();
            return res.json(archive);

        } catch (e) {
            next(e);
        }
    }

}

module.exports = new ArchiveController();