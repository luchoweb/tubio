const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const linksService = require('./link.service.js');

// routes
router.get('/@:business', getByBusiness);

// prive routes
router.get('/', getAll);
// router.get('/:id', getById);
// router.post('/', createSchema, create);
// router.put('/:id', updateSchema, update);
// router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  linksService.getAll()
    .then(users => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  linksService.getById(req.params.id)
    .then(user => res.json(user))
    .catch(next);
}

function getByBusiness(req, res, next) {
  linksService.getAllByBusiness(req.params.business)
    .then(link => res.json(link))
    .catch(next);
}

function create(req, res, next) {
  linksService.create(req.body)
    .then(() => res.json({ message: 'link created' }))
    .catch(next);
}

function update(req, res, next) {
  linksService.update(req.params.id, req.body)
    .then(() => res.json({ message: 'link updated' }))
    .catch(next);
}

function _delete(req, res, next) {
  linksService.delete(req.params.id)
    .then(() => res.json({ message: 'link deleted' }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}