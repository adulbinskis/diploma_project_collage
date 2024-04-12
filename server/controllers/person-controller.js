const personService = require('../service/person-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
const UserModel = require('../models/user-model');
const UserDto = require("../user-dto/user-dto");

class PersonController {
    async createPerson(req, res, next) {
        try {
            const {name, surname, pCode, phone, group, parish, address, date, month, birthDay, birthDayMonth} = req.body;
            const email = req.user.email
           

            const currentUser = await UserModel.findOne({email})
            const userDto = new UserDto(currentUser);

            if(!userDto.isActivated){
                return next(ApiError.NotActivated());
            }
            const userData = await personService.createPerson(name, surname, pCode, phone, group, parish, address, date, month, birthDay, birthDayMonth);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async deletePerson(req, res, next) {
        try {
            const pCode = req.body.pCode;
            const email = req.user.email

            const currentUser = await UserModel.findOne({email})
            const userDto = new UserDto(currentUser);

            if(!userDto.isActivated){
                return next(ApiError.NotActivated());
            }
            const users = await personService.deletePerson(pCode);
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async editPerson(req, res, next) {
        try {
            const {name, surname, newPersCode, persCode, phone, group, parish, address, date, birthDay} = req.body;
            const email = req.user.email
            const month = new Date(date).getUTCMonth()+1;
            const birthDayMonth = new Date(birthDay).getUTCMonth()+1;
            const currentUser = await UserModel.findOne({email})
            const userDto = new UserDto(currentUser);

            if(!userDto.isActivated){
                return next(ApiError.NotActivated());
            }
            
        
            const users = await personService.editPerson(name, surname, newPersCode, persCode, phone, group, parish, address, date, month, birthDay, birthDayMonth);
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async getPersonBySelect(req, res, next) {
        try {

            const selectedParams = req.query.selectedParams;

            const groupSelect = JSON.parse(selectedParams[0])
            const parishSelect = JSON.parse(selectedParams[1])
            const monthSelect = JSON.parse(selectedParams[2])
            const toolSelect = JSON.parse(selectedParams[3])
            const birthDayMonthSelect = JSON.parse(selectedParams[4])

            let selected = {}

            if(groupSelect.active){
                selected.group = groupSelect.value
            }
            if(parishSelect.active){
                selected.parish = parishSelect.value
            }
            if(monthSelect.active){
                selected.month = monthSelect.value
            }
            if(toolSelect.active){
                selected.inventory = toolSelect.value
            }
            if(birthDayMonthSelect.active){
                selected.birthDayMonth = birthDayMonthSelect.value
            }
            console.log(selected)

            const users = await personService.getPersonBySelect(selected);
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async getPersonSearch(req, res, next) {
        try {
            const search = req.query.search;
            const users = await personService.getPersonSearch(search);
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async addItem(req, res, next) {
        try {
            const {pCode, inventory} = req.body;
            const email = req.user.email

            const currentUser = await UserModel.findOne({email})
            const userDto = new UserDto(currentUser);

            if(!userDto.isActivated){
                return next(ApiError.NotActivated());
            }
            const users = await personService.addItem(pCode, inventory);
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async deleteItem(req, res, next) {
        try {
            const {pCode, inventory} = req.body;
            const email = req.user.email

            const currentUser = await UserModel.findOne({email})
            const userDto = new UserDto(currentUser);

            if(!userDto.isActivated){
                return next(ApiError.NotActivated());
            }
            const users = await personService.deleteItem(pCode, inventory);
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new PersonController();