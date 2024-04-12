const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const personController = require('../controllers/person-controller');
const archiveController = require('../controllers/archive-controller');
const projectController = require('../controllers/project-controller')
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');
const imageMiddleware = require('../middlewares/archive-middleware')
const projectImgMiddleware = require('../middlewares/project-img-middleware')



router.post('/registration',
    authMiddleware, // (only authorized)
    // body('email'), //.isEmail()
    // body('password').isLength({min: 4, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);//get for account activation
router.get('/refresh', userController.refresh); //rewrite access token

router.post('/create-person',authMiddleware, personController.createPerson); // create person
router.post('/delete-person', authMiddleware, personController.deletePerson); // delete person
router.post('/edit-person', authMiddleware, personController.editPerson); // edit person
router.post('/add-iem-to-person', authMiddleware, personController.addItem); // edit person
router.post('/delete-iem-from-person', authMiddleware, personController.deleteItem); // delete tool from inventory
router.get('/fetch-person-by-select', authMiddleware, personController.getPersonBySelect); // get database by select
router.get('/fetch-person-search', authMiddleware, personController.getPersonSearch); // get db by search


router.post('/create-archive', authMiddleware, archiveController.createArchive); // create archive in db
router.post('/create-archive-image', authMiddleware, imageMiddleware.array('images', 30), archiveController.addPictureToArchive); // save image path to server an add path to db
router.post('/delete-archive', authMiddleware, archiveController.deleteArchive); // delete archive from server and db
router.post('/edit-archive-text', authMiddleware, archiveController.editArchiveText); // edit archive text
router.post('/delete-archive-picture', authMiddleware, archiveController.deleteArchivePicture); // delete picture from archive and db
router.post('/change-archive-actuality', authMiddleware, archiveController.changeActuality)// change archive actualuity
router.get('/get-archive-text', archiveController.getArchiveText)


router.post('/create-project', authMiddleware, projectController.createProject); // create project in db
router.post('/create-project-image', authMiddleware, projectImgMiddleware.array('images', 30), projectController.addPictureToProject); // save image path to server an add path to db
router.post('/delete-project', authMiddleware, projectController.deleteProject); // delete project from server and db
router.post('/edit-project-text', authMiddleware, projectController.editPriojectText); // edit archive text
router.post('/delete-project-picture', authMiddleware, projectController.deletePriojectPicture); // delete picture from archive and db
router.post('/change-project-actuality', authMiddleware, projectController.changeActuality)// change archive actualuity
router.get('/get-project-text', projectController.getProjectText)


module.exports = router