const PersonSchema = require('../models/person-model');

class PersonService {
    async createPerson(name, surname, pCode, phone, group, parish, address, date, month, birthDay, birthDayMonth) {
        console.log(birthDay, '  ', birthDayMonth)
        const person = await PersonSchema.create({
            name,
            surname,
            pCode,
            phone,
            group,
            parish,
            address,
            date,
            month,
            birthDay,
            birthDayMonth
        })
        // const userDto = new UserDto(user); // id, email, isActivated
        return person;
    }

    async deletePerson(pCode) {
        console.log(pCode)
        const person = await PersonSchema.findOneAndDelete({pCode})
        return person;
    }

    async editPerson(name, surname,  newPersCode, persCode, phone, group, parish, address, date, month, birthDay, birthDayMonth) {
        console.log(birthDayMonth)
        let pCode = persCode;
        const person = await PersonSchema.findOneAndUpdate({pCode},
            {
                    name: name,
                    surname:surname,
                    phone: phone,
                    group:group,
                    parish:parish,
                    address: address,
                    date: date,
                    pCode: newPersCode,
                    month: month,
                    birthDay: birthDay,
                    birthDayMonth: birthDayMonth
            },
            (err)=> {
            if(err){
                console.log(err);
            }
        } )
        return person;
    }

    async getPersonBySelect(selected) {
        const person = await PersonSchema.find( selected )
        return person;
    }

    async  getPersonSearch(search) {
        const person = await PersonSchema.find({name: new RegExp('^'+search,'i')});  //{name: { '$regex': search  , $options:'i'}}, {}
        return person;
    }

    async addItem(pCode, inventory) {
        const person = await PersonSchema.findOneAndUpdate(
            {pCode},
            {
                $addToSet:{
                    inventory: inventory

                }
            })
        return person;
    }

    async deleteItem(pCode, inventory) {
        const person = await PersonSchema.findOneAndUpdate(
            {pCode},
            {
                $pull:{
                    inventory: inventory
                }
            })
        return person;
    }

}


module.exports = new PersonService();