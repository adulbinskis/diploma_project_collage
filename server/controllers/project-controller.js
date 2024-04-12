const projectService = require('../service/project-service');
const fs = require('fs');
const UserModel = require("../models/user-model");
const UserDto = require("../user-dto/user-dto");
const ApiError = require("../exceptions/api-error");


class ProjectController {
    async createProject(req, res, next) {
        try {
            const {year, title,author,text, isActual} = req.body;
            const email = req.user.email

            const currentUser = await UserModel.findOne({email})
            const userDto = new UserDto(currentUser);

            if(!userDto.isActivated){
                return next(ApiError.NotActivated());
            }
            const projectData = await projectService.createProject(year, title,author,text, isActual);
            return res.json(projectData);
        } catch (e) {
            next(e);
        }
    }

    async addPictureToProject(req, res, next) {
        try {

            const year = req.query.year
            const title = req.query.title
            const email = req.user.email

            const currentUser = await UserModel.findOne({email})
            const userDto = new UserDto(currentUser);

            if(!userDto.isActivated){
                return next(ApiError.NotActivated());
            }

            const pathYearTitle =  '/projectImages/'+ year + '/' + title + '/'
            const files = fs.readdirSync('./public/projectImages/' + year+ '/' + title);
            let path = []
            for(let index = 0; index < files.length; index++){
                path.push(pathYearTitle + files[index])
            }
            const project = await projectService.addPicture(year, title, path)
            return res.json(project);
        } catch (e) {
            next(e);
        }
    }

    async deleteProject(req, res, next) {
        try {
            const {id , year, title} = req.body;
            const email = req.user.email

            const currentUser = await UserModel.findOne({email})
            const userDto = new UserDto(currentUser);

            if(!userDto.isActivated){
                return next(ApiError.NotActivated());
            }
            fs.rmSync('./public/projectImages/'+year+'/'+ title, { recursive: true, force: true });
            const projectData = await projectService.deletePrioject(id);
            return res.json(projectData);
        } catch (e) {
            next(e);
        }
    }

    async deletePriojectPicture(req, res, next) {
        try {
            const {picture, archiveId} = req.body;
            const email = req.user.email

            const currentUser = await UserModel.findOne({email})
            const userDto = new UserDto(currentUser);

            if(!userDto.isActivated){
                return next(ApiError.NotActivated());
            }

            fs.rmSync('./public'+ picture, { recursive: true, force: true });
           

            const projectData = await projectService.deletePriojectPicture(archiveId, picture);
            return res.json(projectData);
        } catch (e) {
            next(e);
        }
    }

    async editPriojectText(req, res, next) {
        try {
            const {id, text} = req.body
            const email = req.user.email

            const currentUser = await UserModel.findOne({email})
            const userDto = new UserDto(currentUser);

            if(!userDto.isActivated){
                return next(ApiError.NotActivated());
            }

            const projectData = await projectService.editPriojectText(id, text);
            return res.json(projectData);
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

            const project = await projectService.changeActuality(id , isActual);
            return res.json(project);

        } catch (e) {
            next(e);
        }
    }

    async getProjectText(req, res, next) {
        try {
            const project = await projectService.getText();
            return res.json(project);

        } catch (e) {
            next(e);
        }
    }

}

module.exports = new ProjectController();